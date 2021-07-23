import { Dimensions, StyleSheet } from 'react-native';

const screenWidth: number = Dimensions.get('screen').width;

export const GeneralCardStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 15,
        width: screenWidth * 0.95,
    },
    content: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: screenWidth * 0.85,
    },
    topRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: screenWidth * 0.8,
    },
    titlePadding: {
        paddingLeft: 30,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
