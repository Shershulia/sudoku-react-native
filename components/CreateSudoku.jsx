import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from "react-native";
import { COLORS } from '../const';
import createEmptyMatix from "../utils/createEmptyMatrix";
import Square from "./Square";
import deepCopyFun from "../utils/deepCopy";
import axios from "axios";
import { useTranslation } from 'react-i18next';

const CreateSudoku = ({navigation}) =>{
    const {t} = useTranslation();
    const [solution, setSolution] = useState([[]])
    const [name, setName] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        setSolution(createEmptyMatix());
    },[]);
    
    const postSudoku = (data) =>{
        axios.post("https://65274693917d673fd76d8a87.mockapi.io/sudoku",data)
        .then(()=>{
            Alert.alert("Result",t("sudokuIsPosted"),[
                {text:t("clear"),onPress: ()=>{clear()}},
                {text:t("toMainPage"),onPress: ()=>{ navigation.navigate("Main")}},
            ],{cancelable:true})
        }).catch((err)=>{
            console.log(err)
            Alert.alert("Error",t("somethingWentWrong"),[
                {text:"Back"},
                {text:t("toMainPage"),onPress: ()=>{ navigation.navigate("Main")}},
            ],{cancelable:true})
        })
    }
    const setInMatrix = (value, row, col) => {
        const updatedSolution = deepCopyFun(solution);
        updatedSolution[row][col] = value;
        setSolution(updatedSolution);
    }
    const create = ()=>{
        
        const newSudoku = {
            name,
            difficulty: "CUSTOM",
            puzzle:solution,
          };
          postSudoku(newSudoku)
    }
    const clear = ()=>{
        setIsLoading(true)
        setTimeout(() => {  
            setSolution(createEmptyMatix());
            setName("")
            setIsLoading(false) }, 
            5);
    }

    return (
        
        <View style={{padding:"10%",justifyContent:"center",alignItems:"center"}}>
             {isLoading ?
                (<Text>{t("refreshing")}</Text>)
                :(
            <View>
                {solution.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                        {row.map((value, colIndex) => (
                            <Square initialValue={value} rowInd={rowIndex}  colInd={colIndex} changeValue={setInMatrix} key={`${rowIndex} + ${colIndex}`}/>
                            ))}
            </View>
          ))}       
                    <Text style={{textAlign:"center", fontSize:18}}>{t("theNameOfCustomSudoku")}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setName(text)}
                        value={name}
                    />
                    
                    
                    <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {
                        create()
                    }}
                    >
                    <Text style={styles.buttonText}>{t("createSudokuButton")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {
                        clear()
                    }}
                    >
                    <Text style={styles.buttonClear}>{t("clear")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {
                        navigation.navigate("Main");
                    }}
                    >
                    <Text style={styles.buttonToGo}>{t("cancelButton")}</Text>
                    </TouchableOpacity>
            </View>)}
        </View>
    );
}
export default CreateSudoku;
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
        marginTop:"5%",
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
        backgroundColor:COLORS.red,
        borderRadius:10,
      },
      buttonClear:{
        width:"50%",
        textAlign:"center",
        fontSize:18,
        padding:10,
        borderWidth:1,
        backgroundColor:COLORS.yellow,
        borderRadius:10,
      },
      input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    
      },
    
  });