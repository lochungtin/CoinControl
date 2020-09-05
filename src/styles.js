import { Dimensions, StyleSheet } from 'react-native';

export const accent = '#F2D996';
export const bgColor = '#1C1C1A';
export const white = '#FFFEFA';

export const bubbleStyles = StyleSheet.create({
    bubble: {
        alignItems: 'center',
        borderRadius: 20,
        justifyContent: 'center',
    },
    text: {
        color: '#E0E0E0'
    }
});

export const styles = StyleSheet.create({
    centerText: {
        color: white,
        textAlign: 'center',
    },
    columns: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    rows: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
    },
    screen: {
        alignItems: 'center',
        backgroundColor: bgColor,
        flex: 1,
        justifyContent: 'flex-start',
    },
    text: {
        color: white,
    },
});