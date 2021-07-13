import { Dimensions, StyleSheet } from 'react-native';

const screenHeight: number = Dimensions.get('screen').height;

export const GeneralPickerStyles = StyleSheet.create({
    basePositioning: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        height: screenHeight,
    },
});

export const ColorPickerStyles = StyleSheet.create({
    stack: {
        height: 380,
        position: 'absolute',
        width: 380,
    },
    bgSquares: {
        borderRadius: 20,
        height: 235,
        position: 'absolute',
        width: 380,
        zIndex: 1,
    },
    bubble: {
        borderRadius: 20,
        height: 40,
        position: 'absolute',
        width: 40,
        zIndex: 2,
    },
});
