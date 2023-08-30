import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import { GlobalStyles } from "./constants/style";
import IconButton from "./UI/IconButton";
import ExpensesContextProvider from "./store/context/expense-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

// 注意，這個function開頭要大寫(因為是元件)，不然會噴錯
const ExpenseOverView = () => {
    return (
        <BottomTabs.Navigator
            // 這裡也可以回傳function，好處是可以拿到參數，比如有綁定在Screen時，又可以透過這種方式解構取得route、navigation
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: "#fff",
                tabBarStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                tabBarActiveTintColor: GlobalStyles.colors.accent500,
                headerRight: ({ tintColor }) => {
                    return (
                        <IconButton
                            icon="add"
                            size={24}
                            color={tintColor}
                            onPress={() => {
                                navigation.navigate("ManageExpense");
                            }}
                        />
                    );
                },
            })}
        >
            <BottomTabs.Screen
                name="RecentExpenses"
                component={RecentExpenses}
                options={{
                    title: "Recent Expenses",
                    tabBarLabel: "Recent",
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Ionicons
                                name="hourglass"
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
            <BottomTabs.Screen
                name="AllExpenses"
                component={AllExpenses}
                options={{
                    title: "All Expenses",
                    tabBarLabel: "All Expenses",
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Ionicons
                                name="calendar"
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
        </BottomTabs.Navigator>
    );
};
export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <ExpensesContextProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: GlobalStyles.colors.primary500,
                            },
                            headerTintColor: "#fff",
                            tabBarStyle: {
                                backgroundColor: GlobalStyles.colors.primary500,
                            },
                            tabBarActiveTintColor:
                                GlobalStyles.colors.accent500,
                        }}
                    >
                        <Stack.Screen
                            name="ExpenseOverView"
                            component={ExpenseOverView}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="ManageExpense"
                            component={ManageExpense}
                            options={{
                                presentation: "modal",
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </ExpensesContextProvider>
        </>
    );
}

const styles = StyleSheet.create({});

// 作者是先把結構畫面都寫好再考慮到邏輯的部份
