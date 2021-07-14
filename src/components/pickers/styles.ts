import { Dimensions, StyleSheet } from 'react-native';
import { screenWidth } from '../bullet/styles';

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

export const DatePickerStyles = StyleSheet.create({
    root: {
        borderRadius: 20,
        height: 380,
        width: 380,
    },
    row: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-evenly',
        width: 380,
    },
    cell: {
        alignItems: 'center',
        display: 'flex',
        height: 40,
        justifyContent: 'center',
        width: 40,
    }
});

export const TimePickerStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        height: 360,
        justifyContent: 'space-between',
        paddingVertical: 30,
        width: 360,
    },
    displayRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 90,
        justifyContent: 'space-between',
        width: screenWidth * 0.7,
    },
    displayRoot: {
        alignItems: 'center',
        display: 'flex',
        borderRadius: 20,
        justifyContent: 'center',
        height: 80,
        width: 80,
    },
    displayText: {
        fontWeight: 'bold',
    },
    colon: {
        fontSize: 48, 
        fontWeight: 'bold',
    },
    sliderRoot: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        height: 60,
        justifyContent: 'space-between',
    },
    sliderLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    slider: {
        width: screenWidth * 0.7,
    },
    bullet: {
        marginTop: 10,
    },
});
