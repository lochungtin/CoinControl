import { Dimensions, StyleSheet } from "react-native";

const screenHeight: number = Dimensions.get('window').height;
const screenWidth: number = Dimensions.get('screen').width;

export const DrawerStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        height: screenHeight,
        justifyContent: 'space-between',
        paddingVertical: 20,
        width: screenWidth * 0.7,
    },
    item: {
        width: screenWidth * 0.6,
    },
    labelStyle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
