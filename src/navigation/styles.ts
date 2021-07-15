import { Dimensions, StyleSheet } from "react-native";

const screenHeight: number = Dimensions.get('window').height;
const screenWidth: number = Dimensions.get('screen').width;

export const DrawerStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: screenHeight,
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    itemContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        width: screenWidth * 0.65,
    },
    item: {
        width: screenWidth * 0.50,
    },
    labelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});
