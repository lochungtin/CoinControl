import { StyleSheet } from 'react-native';

export const CategoryStyles = StyleSheet.create({
    category: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
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
        marginLeft: 10,
    },
});
