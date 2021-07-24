import { Dimensions, StyleSheet } from "react-native";

export const screenWidth: number = Dimensions.get('screen').width;

export const PGBarStyles = StyleSheet.create({
    root: {
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }
});
