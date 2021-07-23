import { Dimensions, StyleSheet } from 'react-native';

const screenWidth: number = Dimensions.get('screen').width;

export const RowStyles = StyleSheet.create({
    textRow: {
        alignItems: 'center',
        borderBottomWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        paddingRight: 5,
        marginBottom: 15,
        width: screenWidth * 0.85,
    },
    textBox: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
    },
});
