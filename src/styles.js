import { Dimensions, StyleSheet } from 'react-native';

// dimensions

export const maxHeight = Dimensions.get('screen').height;
export const maxWidth = Dimensions.get('screen').width;

// colors

export const accent = '#F2D996';
export const bgColor = '#1C1C1A';
export const black = '#0C0C0C';
export const darkGrey = '#2C2C2A';
export const darkWhite = '#ACACAA';
export const lightGrey = '#3C3C3A'
export const lightWhite = '#E0E0E0'
export const white = '#FFFEFA';

// general styles

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


// component styles

export const bubbleStyles = StyleSheet.create({
    bubble: {
        alignItems: 'center',
        borderRadius: 20,
        justifyContent: 'center',
    },
    text: {
        color: lightWhite,
    }
});

export const calendarStyles = StyleSheet.create({
    container: {
        borderRadius: 30,
        paddingTop: 15,
        paddingHorizontal: 15,
    },
    dot: {
        borderRadius: 5,
        height: 5,
        margin: 1,
        width: 5,
    },
    scrollable: {
        flex: 1,
    },
    selectionContainer: {
        borderRadius: 40,
        height: 40,
        paddingTop: 8,
        width: 40,
    },
    title: {
        color: white,
        fontSize: 16
    }
});

export const datePickerStyles = StyleSheet.create({
    calendar: {
        width: 350,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    editBtn: {
        borderRadius: 20,
        elevation: 5,
        height: 40,
        padding: 10,
        width: '47%',
    },
    modalView: {
        alignItems: 'center',
        backgroundColor: bgColor,
        borderRadius: 30,
        height: 375,
        margin: 20,
        padding: 5,
    }
});


// screen styles

export const homeScreenStyles = StyleSheet.create({
    balance: {
        color: white,
        fontSize: 35,
    },
    balanceSmall: {
        color: white,
        fontSize: 25,
    }
})

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