import { Dimensions, StyleSheet } from 'react-native';

export const maxHeight = Dimensions.get('screen').height;
export const maxWidth = Dimensions.get('screen').width;

export const accent = '#F2D996';
export const bgColor = '#1C1C1A';
export const black = '#0C0C0C';
export const darkGrey = '#2C2C2A';
export const lightGrey = '#3C3C3A'
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
    roundView: {
        borderRadius: 40,
        paddingHorizontal: 40,
        paddingVertical: 10,
        margin: 10,
        width: '85%',
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

export const updateRecordScreenStyles = StyleSheet.create({
    modalViewContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalView: {
        backgroundColor: lightGrey,
        borderTopLeftRadius: 40, 
        borderTopRightRadius: 40,
        height: maxHeight * 3 / 4 - 10,
        opacity: 0.9,
        width: maxWidth,
    },
})