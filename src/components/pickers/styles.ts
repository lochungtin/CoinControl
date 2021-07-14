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
        alignItems: 'center',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        height: 400,
        justifyContent: 'center',
        width: 380,
    },
    controllerRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-evenly',
        marginBottom: 10,
        width: 380,
    },
    label: {
        fontSize: 18,
        width: 200,
    },
    dateRow: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        width: 380,
    },
    grid: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: 240,
        justifyContent: 'flex-start',
    },
    row: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 45,
        justifyContent: 'space-evenly',
        width: 350,
    },
    cell: {
        alignItems: 'center',
        borderRadius: 10,
        display: 'flex',
        height: 40,
        justifyContent: 'center',
        width: 40,
    },
    text: {
        fontSize: 16,
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
