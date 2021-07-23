import { Dimensions, StyleSheet } from 'react-native';

const screenWidth: number = Dimensions.get('screen').width;

export const CategoryStyles = StyleSheet.create({
    category: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        width: screenWidth * 0.4,
    },
    icon: {
        alignItems: 'center',
        borderRadius: 10,
        display: 'flex',
        height: 30,
        justifyContent: 'center',
        width: 30,
    },
    text: {
        width: screenWidth * 0.4 - 45,
    },
});