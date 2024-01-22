
import SelectDropdown from 'react-native-select-dropdown'
import {View , StyleSheet} from "react-native";
import i18next from '../../utils/i18next';



const languages = ["NO", "EN"]
const LanguageChoice = () => {
    return(
        <View style={styles.container}>
            <SelectDropdown
                data={languages}
                defaultValueByIndex={1}

                defaultValue={i18next.language}
                onSelect={(selectedItem, index) => {
                    i18next.changeLanguage(selectedItem.toLowerCase())
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                dropdownIconPosition={'right'}
            />
        </View>
    )
}
export default LanguageChoice;

const styles = StyleSheet.create({
    container :{
        position:"absolute",
        width:"100%",
        alignItems:'center',
        bottom:0
    }
});