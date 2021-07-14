import { Dimensions, StyleSheet } from "react-native";

const screenWidth: number = Dimensions.get('screen').width;

export const NumpadStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    display: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 100,
        justifyContent: 'space-between',
        width: screenWidth * 0.85,
    },
    text: {
        textAlign: 'right',
        fontWeight: 'bold',
        width: screenWidth * 0.75,
    },
    row: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btn: {
        alignItems: 'center',
        display: 'flex',
        height: 80,
        justifyContent: 'center',
        width: screenWidth  / 4,
    }
});
