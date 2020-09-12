import { Dimensions, StyleSheet } from 'react-native';

// dimensions

export const maxHeight = Dimensions.get('screen').height;
export const maxWidth = Dimensions.get('screen').width;

// colors

export const colors = ['#ff3064', '#F2D996', '#34e0a4', '#63cbf7', '#873beb'];

const bgColor = '#1C1C1C';
const shade1 = '#E0E0E0';
const shade2 = '#ACACAC';
const shade3 = '#3C3C3C';
const shade4 = '#2C2C2C';

export const black = '#0C0C0C';
export const white = '#FCFCFC';

export const bgColorD = '#1C1C1C';
export const bgColorL = white;

export const iconColors = {
    iconD: shade2,
    iconL: shade3,
}

// general styles

export const styles = StyleSheet.create({
    centerTextD: {
        color: white,
        textAlign: 'center',
    },
    centerTextL: {
        color: black,
        textAlign: 'center',
    },
    columns: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    modalView: {
        backgroundColor: shade3,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        opacity: 0.9,
        paddingHorizontal: '5%',
        width: maxWidth,
    },
    modalViewContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
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
    textD: {
        color: white,
    },
    textL: {
        color: black,
    },
});


// component styles

export const headerStyles = StyleSheet.create({
    headerD: {
        alignItems: 'center',
        backgroundColor: bgColorD,
        borderColor: shade1,
        borderBottomWidth: 2,
        flex: 1,
        flexDirection: 'row',
        maxHeight: 50,
        minHeight: 50,
        justifyContent: 'space-between',
        paddingLeft: 10,
        width: maxWidth,
    },
    headerL: {
        alignItems: 'center',
        backgroundColor: bgColorL,
        borderColor: shade4,
        borderBottomWidth: 2,
        flex: 1,
        flexDirection: 'row',
        maxHeight: 50,
        minHeight: 50,
        justifyContent: 'space-between',
        paddingLeft: 10,
        width: maxWidth,
    },
    textContainer: {
        marginLeft: 30,
        width: '85%',
    },
    textD: {
        color: white,
        fontSize: 20,

    },
    textL: {
        color: black,
        fontSize: 20,

    },
})

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

export const chartScreenStyles = StyleSheet.create({
    categoryTextD: {
        color: white,
        width: '50%'
    },
    categoryTextL: {
        color: black,
        width: '50%'
    },
    percentageTextD: {
        color: white,
        width: '15%'
    },
    percentageTextL: {
        color: black,
        width: '15%'
    },
    titleD: {
        color: white,
        fontSize: 35,
    },
    titleL: {
        color: black,
        fontSize: 35,
    },
    type: {
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: 'transparent',
        paddingBottom: 10,
        width: '30%',
    },
    typeSelectedD: {
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: white,
        paddingBottom: 10,
        width: '30%',
    },
    typeSelectedL: {
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: black,
        paddingBottom: 10,
        width: '30%',
    },
})

export const homeScreenStyles = StyleSheet.create({
    balanceD: {
        color: white,
        fontSize: 35,
    },
    balanceL: {
        color: black,
        fontSize: 35,
    },
    balanceSmallD: {
        color: white,
        fontSize: 25,
    },
    balanceSmallL: {
        color: black,
        fontSize: 25,
    },
    borderD: {
        borderColor: shade4,
        borderTopWidth: 2,
        maxHeight: '70%',
        minWidth: maxWidth,
    },
    borderL: {
        borderColor: shade1,
        borderTopWidth: 2,
        maxHeight: '70%',
        minWidth: maxWidth,
    },
    sectionHeadD: {
        backgroundColor: bgColorD,
        paddingBottom: '3%',
        paddingTop: '4%', 
    },
    sectionHeadL: {
        backgroundColor: bgColorL,
        paddingBottom: '3%',
        paddingTop: '4%', 
    },
    sectionItemD: { 
        backgroundColor: shade3,
        borderRadius: 40,
        paddingHorizontal: 40,
        paddingVertical: 10,
        margin: 10,
    }, 
    sectionItemL: { 
        backgroundColor: shade1,
        borderRadius: 40,
        paddingHorizontal: 40,
        paddingVertical: 10,
        margin: 10,
    }, 
    textCatD: { 
        color: white,
        width: '50%' 
    },
    textCatL: { 
        color: black,
        width: '50%' 
    },
    textValD: { 
        color: white,
        textAlign: 'center', 
        width: '20%' 
    },
    textValL: { 
        color: black,
        textAlign: 'center', 
        width: '20%' 
    },
});

export const recordStyles = StyleSheet.create({
    cancelBtnD: {
        backgroundColor: white,
        borderRadius: 40,
        paddingHorizontal: 40,
        paddingVertical: 10,
        margin: 10,
        width: '80%',
    },
    cancelBtnL: {
        backgroundColor: shade1,
        borderRadius: 40,
        paddingHorizontal: 40,
        paddingVertical: 10,
        margin: 10,
        width: '80%'
    },
    input: {
        color: black,
        textAlign: 'center',
        width: '100%',
    },
});

export const settingStyles = StyleSheet.create({
    cancelBtnD: {
        backgroundColor: white,
        borderRadius: 40,
        paddingHorizontal: 40,
        paddingVertical: 10,
        margin: 10,
        width: '47.5%',
    },
    cancelBtnL: {
        backgroundColor: shade1,
        borderRadius: 40,
        paddingHorizontal: 40,
        paddingVertical: 10,
        margin: 10,
        width: '47.5%',
    },
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
    modalTextD: {
        color: white,
        fontSize: 15,
        textAlign: 'center',
    },
    modalTextL: {
        color: black,
        fontSize: 15,
        textAlign: 'center',
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
    textL: {
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