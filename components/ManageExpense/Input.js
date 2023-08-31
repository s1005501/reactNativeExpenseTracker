import { View, Text, StyleSheet, TextInput } from "react-native";
import { GlobalStyles } from "../../constants/style";

const Input = ({ label, textInputConfig,style }) => {
    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiLine);
    }
    return (
        <View style={[styles.inputContainer,style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput {...textInputConfig} style={inputStyles} />
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 12,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiLine: {
        minHeight: 100,
        textAlignVertical: "top",
    },
});