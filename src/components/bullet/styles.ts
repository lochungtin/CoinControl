import { Dimensions, StyleSheet } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const BulletStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        height: 40,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
