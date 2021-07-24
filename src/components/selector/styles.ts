import { Dimensions, StyleSheet } from 'react-native';

export const screenWidth: number = Dimensions.get('screen').width;

export const SelectorStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-between',
    },
    highlight: {
        alignItems: 'center',
        borderRadius: 20,
        display: 'flex',
        height: 40,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
