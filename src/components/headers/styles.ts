import { Dimensions, StyleSheet } from "react-native";

export const screenWidth: number = Dimensions.get('screen').width;

export const AuthHeaderStyles = StyleSheet.create({
    stack: {
        width: screenWidth,
    },
    navBtn: {
        left: 40,
        position: 'absolute',
        top: 60,
    },
});
