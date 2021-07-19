import { Dimensions, StyleSheet } from 'react-native';

export const screenWidth: number = Dimensions.get('screen').width;

export const ListItemStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        width: screenWidth,
        marginBottom: 15,
    },
    contentPositioner: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: screenWidth * 0.9,
    },
    icon: {
        alignItems: 'center',
        borderRadius: 10,
        display: 'flex',
        height: 50,
        justifyContent: 'center',
        width: 50,
    },
    label: {
        fontSize: 14,
        width: screenWidth * 0.5,
    },
});