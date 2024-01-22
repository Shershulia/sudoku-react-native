import { StyleSheet } from "react-native";
import {COLORS} from "../../const/index"

const styles = StyleSheet.create({
    container: {
      width: "100%",
      paddingBottom:20
    },
    mainText:{
        fontSize:32,
        fontWeight:"bold",
        color:COLORS.black,
        textAlign:"center"
        
    }
})
export default styles;