import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../const";
const Square = ({ initialValue, rowInd, colInd, changeValue }) => {
  const [value, setValue] = useState(initialValue);
  const [active, setActive] = useState(false);

  const handlePress = () => {
    setActive(!active); // Toggle the active state
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.squareBox}>
        {initialValue !== 0 ? (
          <Text style={[styles.text, active ? styles.chosenText : styles.normalText]}>{initialValue}</Text>
        ) : (
            <TouchableOpacity onPress={handlePress}>

          <TextInput
            editable
            numberOfLines={1}
            maxLength={1}
            onChangeText={(text) => {
              setValue(text);
              if (text ==="."){
                handlePress();
              } else{
                  changeValue(parseInt(text), rowInd, colInd);
              }
            }}
            value={value.toString() !== "0" ? value.toString() : ""}
            keyboardType="numeric"
            style={[styles.text, active ? styles.chosenText : styles.normalText]}
          />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Square;

const styles = StyleSheet.create({
  squareBox: {
    
    width: 35,
    height: 35,
    margin: 4,
  },
  text: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 12,
    borderWidth: 1,
    textAlign: "center",
  },
  normalText: {
    backgroundColor: COLORS.yellow,
  },
  chosenText: {
    backgroundColor: COLORS.blue,
  },
});
