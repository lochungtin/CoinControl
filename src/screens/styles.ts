import { Dimensions, StyleSheet } from 'react-native';

export const screenHeight: number = Dimensions.get('window').height;
const screenWidth: number = Dimensions.get('screen').width;

export const ScreenStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: screenWidth,
    },
});

export const AuthScreenStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: screenWidth,
    },
    content: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        width: screenWidth * 0.8,
    },
    subtitle: {
        fontSize: 18,
        width: screenWidth * 0.8,
        marginVertical: 10,
    },
    forgotPswd: {
        alignItems: 'flex-end',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20,
        width: screenWidth * 0.8,
    },
    forgotPswdText: {
        fontSize: 18,
    },
    bullet: {
        marginTop: 40,
    },
});

export const SettingsStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    itemBox: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        width: screenWidth * 0.90
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    colorBox: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        width: screenWidth
    },
    label: {
        fontSize: 16,
        width: screenWidth * 0.6,
    },
});
