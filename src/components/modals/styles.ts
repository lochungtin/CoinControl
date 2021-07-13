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
        justifyContent: 'center',
        width: screenWidth,
    },
    closeBtn: {
        borderRadius: 3,
        height: 5,
        width: 60,
    },
});

export const PromptModalStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: 350,
        justifyContent: 'flex-start',
        width: screenWidth,
    },
    content: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
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
    }
});