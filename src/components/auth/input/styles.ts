import { Dimensions, StyleSheet } from 'react-native';

const screenWidth: number = Dimensions.get('screen').width;

export const InputStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        borderRadius: 10,
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 20,
        width: screenWidth * 0.8,
    },
    textBox: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        height: 55,
        justifyContent: 'space-between',
        width: screenWidth * 0.56,
    },
    label: {
        fontSize: 14,
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        width: screenWidth * 0.55,
    },
});
