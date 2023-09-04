import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../constants/style";
import Button from "./Button";

const ErrorOverLay = ({ message, onConfirm }) => {
    //  ActivityIndicator是react native內建的loading元件
    // size屬性決定loading轉圈圈的icon的大小
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An Error Occurred!</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={onConfirm}>OK</Button>
        </View>
    );
};

export default ErrorOverLay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text: {
        color: "#fff",
        textAlign: "center",
        marginBottom: 8,
    },
    title: { fontSize: 20, fontWeight: "bold" },
});
