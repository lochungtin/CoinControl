import { Dimensions, StyleSheet } from "react-native";

const screenWidth: number = Dimensions.get('screen').width;

export const BottomBarStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        flexDirection: 'row',
        height: 100,
        justifyContent: 'center',
        width: screenWidth,
    },
    text: {
        fontSize: 16,
    },
    pressable: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});
