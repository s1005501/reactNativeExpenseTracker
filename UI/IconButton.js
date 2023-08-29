import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ icon, color, size, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => {
                pressed && styles.pressed;
            }}
        >
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2,
        borderRadius: 24,
    },
    pressed: {
        opacity: 0.75,
    },
});
