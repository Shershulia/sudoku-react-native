import axios from "axios";
import { useEffect, useState } from "react";
import { View , Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import Square from "./Square";
import { COLORS } from '../const';
import deepCopyFun from "../utils/deepCopy";
import isValidSudoku from "../utils/isValidSudoku";
import { useTranslation } from 'react-i18next';

const Game = ({route, navigation}) =>{
    const {t} = useTranslation();

    const [isLoading, setIsLoading] = useState(false)
    const [solution,setSolution] = useState([]);
    const [deepCopy, setDeepCopy] = useState([])
    const { activeDifficulty, id} = route.params;

    function getRandom(min, max) {
        const floatRandom = Math.random()

        const difference = max - min

        // random between 0 and the difference
        const random = Math.round(difference * floatRandom)

        const randomWithinRange = random + min

        return randomWithinRange
    }
    const fetchPuzzle = () =>{
        setIsLoading(true)
        if (id){
            axios.get("https://65274693917d673fd76d8a87.mockapi.io/sudoku?id="+id)
            .then(({data})=>{
                
                setSolution(data[0].puzzle)
                const deepCopy = deepCopyFun(data[0].puzzle)
                setDeepCopy(deepCopy)
                setIsLoading(false)
            }).catch((err)=>{
                console.log(err)
                setIsLoading(false)
            })
        }
        else{
            axios.get("https://65274693917d673fd76d8a87.mockapi.io/sudoku?difficulty="+activeDifficulty)
            .then(({data})=>{
                const index = getRandom(0,data.length-1)
                setSolution(data[index].puzzle)
                const deepCopy = deepCopyFun(data[index].puzzle)
                setDeepCopy(deepCopy)
                setIsLoading(false)
            }).catch((err)=>{
                console.log(err)
                setIsLoading(false)
            })
        }
    }

    const checkIfValid = () =>{
        if (isValidSudoku(solution)){
            Alert.alert("Result",t("solvedRight"),[
                {text:t("toMainPage"),onPress: ()=>{ navigation.navigate("Main")}},
                {text:t("clear"),onPress: ()=>{clear()}},
            ],{cancelable:true})
        }else{
            Alert.alert("Result",t("solvedWrong"),[
                {text:t("toMainPage"),onPress: ()=>{ navigation.navigate("Main")}},
                {text:t("clear"),onPress: ()=>{clear()}},
                {text:"Okay"},

            ],{cancelable:true})
        }
    }
    useEffect(()=>{
        fetchPuzzle();
    },[])

    const setInMatrix = (value, row, col) => {
        const updatedSolution = deepCopyFun(solution);
        updatedSolution[row][col] = value;
        setSolution(updatedSolution);
    }

    const clear =()=>{
        setIsLoading(true)
        setTimeout(() => {  
            setSolution(deepCopy)
            setIsLoading(false) }, 
            5);
    }

    return(
        
        <View style={{alignItems:"center", marginVertical:10, justifyContent:"center", marginTop:"10%"}}>
            <View>
            {(solution.length==0 && !isLoading) && <Text style={{fontSize:16}}>{t("notFound")}</Text>}
            {isLoading ?
                (<Text style={{textAlign:"center", fontSize:18}}>{t("loading")}</Text>)
                :
                (<View>
                {solution.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                    {row.map((value, colIndex) => (
                        <Square initialValue={value} rowInd={rowIndex}  colInd={colIndex} changeValue={setInMatrix} key={`${rowIndex} + ${colIndex}`}/>
                        ))}
            </View>
          ))}
            </View>)
            }
            </View>
            {solution.length!=0 && 
                <View style={{width:"100%", alignItems:"center"}}>

                    <Text style={{fontSize:16, marginVertical:"10%"}}>{t("mark")}</Text>
                    
                        <View style={styles.buttonBox}>
                            
                            <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                checkIfValid();
                            }}
                            >
                            <Text style={styles.buttonText}>{t("check")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                clear();
                            }}
                            >
                            <Text style={styles.buttonToGo}>{t("clear")}</Text>
                            </TouchableOpacity>
                            
                        </View>
                    
                </View>
            
            }

            
            

        </View>
    )
}
export default Game;

const styles = StyleSheet.create({
    buttonBox:{
        width:"100%",
        gap:10,
    },
    row: {
        flexDirection: "row",

    },
    buttonContainer:{
        alignItems:"center",
      },
      buttonText:{
        width:"50%",
        textAlign:"center",
        fontSize:18,
        padding:10,
        borderWidth:1,
        backgroundColor:COLORS.green,
        borderRadius:10,
      },
      buttonToGo:{
        width:"50%",
        textAlign:"center",
        fontSize:18,
        padding:10,
        borderWidth:1,
        backgroundColor:COLORS.blue,
        borderRadius:10,
      },
    
  });