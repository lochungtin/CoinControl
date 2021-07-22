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
        height: 160,
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
        width: screenWidth,
    },
    balance: {
        fontSize: 36,
    },
    decimal: {
        fontSize: 24,
    },
    goal: {
        fontSize: 18,
        textAlign: 'center',
        width: screenWidth,
    },
    pgbar: {
        marginVertical: 15,
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
    right: {
        alignItems: 'flex-end',
        display: 'flex',
        flexDirection: 'column',
        height: 210,
        justifyContent: 'flex-end',
        width: 40,
    },
    controllerBox: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        right: 15,
        top: 200,
        width: screenWidth * 0.20,
        zIndex: 1,
    },
    controller: {
        alignItems: 'center',
        borderRadius: 15,
        display: 'flex',
        height: 35,
        justifyContent: 'center',
        width: 35,
    },
    category: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        width: screenWidth * 0.7,
    },
    icon: {
        alignItems: 'center',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        height: 40,
        width: 40,
    },
    label: {
        fontSize: 16,
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
