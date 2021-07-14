import { Dimensions, StyleSheet } from "react-native";

const screenHeight: number = Dimensions.get('screen').height;
const screenWidth: number = Dimensions.get('screen').width;

export const GeneralModalStyles = StyleSheet.create({
    basePositioning: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: screenHeight,
    },
    topbar: {
        alignItems: 'center',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        display: 'flex',
        height: 30,
        justifyContent: 'flex-end',
        width: screenWidth,
    },
    closeBtn: {
        borderRadius: 3,
        height: 5,
        width: 60,
    },
});

export const CategoryModalStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 20,
        height: 240,
        justifyContent: 'flex-start',
        width: screenWidth,
    },
    rowContainer: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        width: screenWidth,
    },
    row: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80,
        width: screenWidth * 0.85,
    },
    icon: {
        alignItems: 'center',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        height: 50,
        width: 50,
    },
    textInput: {
        fontSize: 24,
        width: screenWidth *  0.5,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    colorBullet: {
        borderRadius: 15,
        height: 30,
        width: screenWidth * 0.6
    },
});

export const PromptModalStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 10,
        height: 350,
        justifyContent: 'flex-start',
        width: screenWidth,
    },
    content: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: screenWidth * 0.8,
    },
    textbox: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: screenWidth * 0.6,
    },
    warningTextBox: {
        alignItems: 'flex-start',
        display: 'flex',
        justifyContent: 'center',
        height: 60,
    },
    warningText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    promptTextBox: {
        alignItems: 'flex-start',
        display: 'flex',
        justifyContent: 'center',
        height: 90,
    },
    promptText: {
        fontSize: 18,
    },
    dnsaTextBox: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        width: screenWidth * 0.5,
    },
    dnsaText: {
        fontSize: 16,
    },
    bullets: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: screenWidth * 0.8,
    },
});
