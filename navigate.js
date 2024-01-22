import React from "react";

import Game from "./components/Game";
import Main from "./components/Main";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CreateSudoku from "./components/CreateSudoku";
import CustomSudoku from "./components/CustomSudoku";

const Stack = createStackNavigator();

export default function Navigate(){
    return (<NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={Main}
                options={{title:"Menu"}}
                ></Stack.Screen>
                <Stack.Screen
                name="CreateSudoku"
                component={CreateSudoku}
                options={{title:"Create Custom Sudoku"}}
                ></Stack.Screen>
                <Stack.Screen
                name="Game"
                component={Game}
                options={{title:"Game"}}
                ></Stack.Screen>
                <Stack.Screen
                name="CustomSudoku"
                component={CustomSudoku}
                options={{title:"Choose sudoku"}}
                ></Stack.Screen>
        </Stack.Navigator>
        </NavigationContainer>);
}