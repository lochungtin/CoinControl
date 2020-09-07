import { Dimensions, StyleSheet } from 'react-native';

// dimensions

export const maxHeight = Dimensions.get('screen').height;
export const maxWidth = Dimensions.get('screen').width;

// colors

export const crimsonPink = '#ff3064';
export const goldenBrown = '#F2D996';
export const tealGreen = '#34e0a4';
export const skyBlue = '#63cbf7';
export const deepViolet = '#873beb';
export const colors = [deepViolet, crimsonPink, goldenBrown, tealGreen, skyBlue]

export const bgColor = '#1C1C1C';
export const shade1 = '#E0E0E0';
export const shade2 = '#ACACAC';
export const shade3 = '#3C3C3C';
export const shade4 = '#2C2C2C';

export const black = '#0C0C0C';
export const white = '#FCFCFC';

const bgColorD = '#1C1C1C';
const bgColorL = white;

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
    },
    rows: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
    },
    screenD: {
        alignItems: 'center',
        backgroundColor: bgColorD,
        flex: 1,
        justifyContent: 'flex-start',
    },
    screenL: {
        alignItems: 'center',
        backgroundColor: bgColorL,
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
        borderColor: black,
        justifyContent: 'center',
    },
    text: {
        color: shade1,
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
});

export const updateRecordScreenStyles = StyleSheet.create({
    modalView: {
        backgroundColor: shade3,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: maxHeight * 3 / 4 - 10,
        opacity: 0.9,
        paddingHorizontal: '5%',
        width: maxWidth,
    },
    modalViewContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
});

export const settingStyles = StyleSheet.create({
    itemContainerD: {
        alignItems: 'center',
        backgroundColor: shade4,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
    },
    itemContainerL: {
        alignItems: 'center',
        backgroundColor: shade1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
    },
    modalViewD: {
        alignItems: 'center',
        backgroundColor: bgColorD,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: maxHeight / 10,
        justifyContent: 'center',
        opacity: 0.9,
        paddingTop: '1%',
        paddingHorizontal: '5%',
        width: maxWidth,
    },
    modalViewL: {
        alignItems: 'center',
        backgroundColor: bgColorL,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: maxHeight / 10,
        justifyContent: 'center',
        opacity: 0.9,
        paddingTop: '1%',
        paddingHorizontal: '5%',
        width: maxWidth,
    },
    modalViewContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    textD: {
        color: white,
        width: '50%',
    },
    textDisabledD: {
        color: shade3,
        width: '50%',
    },
    textDisabledL: {
        color: shade2,
        width: '50%',
    },
    textL : {
        color: black,
        width: '50%',
    },
    titleContainer: {
        marginVertical: '3%',
        paddingHorizontal: '5%',
    },
    titleStyleD: {
        color: shade2,
    },
    titleStyleL: {
        color: shade3,
    },
    scrollView: {
        width: maxWidth
    },
    settingRight: {
        alignItems: 'flex-end',
        width: '30%',
    },
});

export const settingStyleC = {
    iconD: shade2,
    iconL: shade3,
}