import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList,  Button,} from 'react-native';
import Welcome from './welcome/Welcome';
import DifficultyLevels from './difficultyLevel/DifficultyLevels';
import LanguageChoice from './languageChoice/LanguageChoice';
import { COLORS } from '../const';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const difficultyTypes = ["EASY", "NORMAL", "HARD"]

const Main = ({navigation}) =>{
  const {t} = useTranslation();

  const [activeDifficulty,setActiveDifficulty] = useState("EASY")
  const loadScene = () =>{
    navigation.navigate("Game",{activeDifficulty});
  }
    return(
    <SafeAreaView style={styles.container}>
      <View style={{height:"100%"}}>
        <Welcome></Welcome>
        <View style={styles.box}>
              <View>
                <DifficultyLevels activeDifficulty={activeDifficulty} setActiveDifficulty={setActiveDifficulty}></DifficultyLevels>

              </View>
              
              <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    loadScene();
                  }}
                >
                  <Text style={styles.buttonText}>{t("startButton")}</Text>
                </TouchableOpacity>
              
                <Text style={{textAlign:"center",padding:10,fontSize:24, fontWeight:"bold"}}>{t("or")}</Text>

                <View>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {
                      
                      navigation.navigate("CreateSudoku");
                    }}
                  >
                    <Text style={styles.buttonCreate}>{t("createSudokuButton")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    navigation.navigate("CustomSudoku");
                  }}
                >
                  <Text style={styles.buttonGetFromSaved}>{t("getFromSavedSudoku")}</Text>
                </TouchableOpacity>
                </View>                
                </View>

        
        <LanguageChoice></LanguageChoice>
      </View>

    </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 40,
      
    },
    box:{
      height:"70%",
      justifyContent:"center"
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
    buttonCreate:{
      width:"50%",
      fontSize:18,
      padding:10,
      borderWidth:1,
      backgroundColor:COLORS.yellow,
      borderRadius:10,
      textAlign:"center",
      marginVertical:10,
    },
    buttonGetFromSaved:{
      width:"50%",
      fontSize:18,
      padding:10,
      borderWidth:1,
      backgroundColor:COLORS.blue,
      borderRadius:10,
      textAlign:"center",
      marginVertical:10,
    }
  });
  
export default Main