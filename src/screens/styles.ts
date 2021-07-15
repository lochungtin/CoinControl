import { Dimensions, StyleSheet } from "react-native";

const screenHeight: number = Dimensions.get('screen').height;
const screenWidth: number = Dimensions.get('screen').width;

export const ScreenStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        height: screenHeight,
        justifyContent: 'flex-start',
        width: screenWidth,
    },
});
