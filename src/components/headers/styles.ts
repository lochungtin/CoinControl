import { Dimensions, StyleSheet } from 'react-native';

export const screenWidth: number = Dimensions.get('screen').width;

export const GeneralHeaderStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        display: 'flex',
        flexDirection: 'row',
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

export const MinimalHeaderStyles = StyleSheet.create({

});
