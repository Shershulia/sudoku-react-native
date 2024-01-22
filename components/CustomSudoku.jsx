import { View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

const CustomSudoku = ({navigation}) =>{
    const {t} = useTranslation();

    const [solutions, setSolutions] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchPuzzle = () =>{
        setIsLoading(true)
        axios.get("https://65274693917d673fd76d8a87.mockapi.io/sudoku?difficulty=CUSTOM")
        .then(({data})=>{
            setSolutions(data)
            setIsLoading(false)
        }).catch((err)=>{
            console.log(err)
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        fetchPuzzle();
    },[]);

    const chooseSudoku = (id)=>{
        navigation.navigate("Game",{id});
    }

    return (
        <View style={{alignItems:"center"}}>
            {isLoading ? <Text>{t("loading")}</Text> : 
            <View style={{width:"70%"}}>
                <Text style={{textAlign:"center", fontSize:24, marginVertical:10}}>{t("chooseSudoku")}</Text>
                    {solutions.length==0 && <Text style={{textAlign:"center", fontSize:24, marginVertical:10}}>{t("noCustom")}</Text>}
                    {
                        solutions.map((item,index)=>(
                            <TouchableOpacity style={{borderWidth:1, padding:16}} key={index} onPress={()=>{chooseSudoku(item.id)}}>
                                <Text style={{textAlign:"center"}}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                        )
                    }
                </View>}
        </View>
    );
}
export default CustomSudoku;