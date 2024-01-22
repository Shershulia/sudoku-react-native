import { StyleSheet } from "react-native";
import {COLORS} from "../../const/index"

const styles = StyleSheet.create({
    container: {
      width: "100%",
      paddingVertical:10, 
    },
    mainText:{
        fontSize:24,
        fontWeight:"bold",
        color:COLORS.black,
        textAlign:"center"   
    },
    centeredContainer: {
        width:"100%",
        justifyContent:"center",
        
    },

    tab: (activeJobType, item) => ({
    
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginVertical:6,
        marginHorizontal:"10%",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: activeJobType === item ? COLORS.red : COLORS.black,
      }), 
      secondText:(activeJobType, item)=> ({
        fontWeight: activeJobType === item ? "bold" : "normal",
        textAlign:"center"
      }), 
})
export default styles;