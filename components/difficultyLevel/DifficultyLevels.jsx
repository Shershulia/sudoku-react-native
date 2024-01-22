import { View, Text , TouchableOpacity, FlatList} from "react-native";
import styles from './DifficultyLevels.style';
import { useTranslation } from 'react-i18next';

const difficultyTypes = ["EASY", "NORMAL", "HARD"]
const DifficultyLevels = ({activeDifficulty,setActiveDifficulty}) => {
    const {t} = useTranslation();

    return(
        <View style={styles.container}>
            <Text style={styles.mainText}>{t("chooseDifficulty")}</Text>
            <View  style={styles.centeredContainer}>
                <FlatList data={difficultyTypes} renderItem={({item})=>
                    <TouchableOpacity style={styles.tab(activeDifficulty, item)}
                    onPress={() => {
                        setActiveDifficulty(item);
                      }}>
                        <Text style={styles.secondText(activeDifficulty,item)}>{item}</Text>
                    </TouchableOpacity>
                 } >
                </FlatList>
      </View>
        </View>
    );
}
export default DifficultyLevels;