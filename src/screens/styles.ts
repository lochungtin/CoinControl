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
    scrollView: {
        alignItems: 'center',
        display: 'flex',
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
    itemRight: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        width: screenWidth * 0.1,
    },
    currencyItem: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        width: screenWidth * 0.7
    },
    currencyText: {
        fontSize: 16,
    },
});

export const CategoryScreenStyles = StyleSheet.create({
    controller: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: screenWidth * 0.2,
    },
});

export const NewCatScreenStyles = StyleSheet.create({
    row: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-between',
        width: screenWidth * 0.9,
    },
});
