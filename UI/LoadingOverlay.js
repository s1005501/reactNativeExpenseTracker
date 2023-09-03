import { View, ActivityIndicator, StyleSheet } from "react-native";

import { GlobalStyles } from "../constants/style";

const LoadingOverlay = () => {
    //  ActivityIndicator是react native內建的loading元件
    // size屬性決定loading轉圈圈的icon的大小
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
});
