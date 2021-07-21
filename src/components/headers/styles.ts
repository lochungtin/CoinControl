import { Dimensions, StyleSheet } from 'react-native';

export const screenWidth: number = Dimensions.get('screen').width;

export const GeneralHeaderStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 45,
        paddingBottom: 15,
        width: screenWidth,
    },
    contentPositioner: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: screenWidth * 0.8,
    },
    label: {
        fontSize: 20,
    },
});

export const AuthHeaderStyles = StyleSheet.create({
    stack: {
        width: screenWidth,
    },
    navBtnStack: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        paddingTop: 60,
        position: 'absolute',
        top: 0,
        width: screenWidth,
    },
    navBtnPositioner: {
        width: screenWidth * 0.8,
    },
});

export const HomeHeaderStyles = StyleSheet.create({
    contentPositioner: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: screenWidth * 0.8,
    },
    content: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 10,
        width: screenWidth * 0.4,
    },
    balanceRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    balance: {
        fontSize: 36,
    },
    decimal: {
        fontSize: 24,
    },
    goal: {
        fontSize: 18,
    },
    pgbar: {
        marginVertical: 10,
    },
    actionBtnRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: screenWidth * 0.4,
    },
    actionBtn: {
        alignItems: 'center',
        borderRadius: 20,
        display: 'flex',
        height: 40,
        justifyContent: 'center',
        width: 40,
    },
});

export const SelectorHeaderStyles = StyleSheet.create({
    rightPositioner: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        width: 40,
    },
});

export const SubHeaderStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        width: screenWidth * 0.90
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
