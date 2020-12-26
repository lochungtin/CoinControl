import { Dimensions, StyleSheet } from 'react-native';
import { black, bgColorD, bgColorL, shade1, shade2, shade3, shade4, white, } from './data/color';

// dimensions

export const maxHeight = Dimensions.get('screen').height;
export const maxWidth = Dimensions.get('screen').width;

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
    modalViewContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalViewD: {
        backgroundColor: shade3,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        opacity: 0.9,
        paddingHorizontal: '5%',
        width: maxWidth,
    },
    modalViewL: {
        backgroundColor: shade2,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        opacity: 0.9,
        paddingHorizontal: '5%',
        width: maxWidth,
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
        height: 375,
        paddingTop: 15,
        paddingHorizontal: 15,
    },
    centerTextD: {
        color: white,
        textAlign: 'center',
    },
    centerTextL: {
        color: black,
        textAlign: 'center',
    },
    disabledD: {
        color: shade3,
        textAlign: 'center',
    },  
    disabledL: {
        color: shade2,
        textAlign: 'center',
    },  
    dot: {
        borderRadius: 5,
        height: 5,
        margin: 1,
        width: 5,
    },
    label: { 
        textAlign: 'center',
        width: 40
    },
    selectionContainer: {
        borderWidth: 1,
        borderRadius: 15,
        height: 40,
        paddingTop: 8,
        width: 40,
    },
    titleD: {
        color: white,
        fontSize: 16
    },
    titleL: {
        color: black,
        fontSize: 16
    }
});

export const customModalStyles = StyleSheet.create({
    rootD: { 
        alignItems: 'center',
        backgroundColor: bgColorD,
        borderRadius: 20,
        elevation: 10,
        justifyContent: "space-between",
        padding: 10, 
        width: 300,
    },
    rootL: { 
        alignItems: 'center',
        backgroundColor: bgColorL,
        borderRadius: 20,
        elevation: 10,
        justifyContent: "space-between",
        padding: 10, 
        width: 300,
    },
});

export const datePickerStyles = StyleSheet.create({
    calendar: {
        width: 350,
    },
    modalViewD: {
        alignItems: 'center',
        backgroundColor: bgColorD,
        borderRadius: 30,
        height: 425,
        margin: 20,
        padding: 5,
    },
    modalViewL: {
        alignItems: 'center',
        backgroundColor: bgColorL,
        borderRadius: 30,
        height: 425,
        margin: 20,
        padding: 5,
    }
});

export const headerStyles = StyleSheet.create({
    headerD: {
        alignItems: 'center',
        backgroundColor: bgColorD,
        borderColor: shade1,
        borderBottomWidth: 2,
        flex: 1,
        flexDirection: 'row',
        maxHeight: 60,
        minHeight: 60,
        justifyContent: 'space-between',
        paddingLeft: 20,
        width: maxWidth,
    },
    headerL: {
        alignItems: 'center',
        backgroundColor: bgColorL,
        borderColor: shade4,
        borderBottomWidth: 2,
        flex: 1,
        flexDirection: 'row',
        maxHeight: 60,
        minHeight: 60,
        justifyContent: 'space-between',
        paddingLeft: 20,
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
});

export const numpadStyles = StyleSheet.create({
    buttonD: {
        alignItems: 'center',
        display: 'flex',
        backgroundColor: bgColorD,
        borderWidth: 1,
        borderColor: shade3,
        height: '100%',
        justifyContent: 'center',
        width: '25%',
    },
    buttonL: {
        alignItems: 'center',
        display: 'flex',
        backgroundColor: bgColorL,
        borderWidth: 1,
        borderColor: shade2,
        height: '100%',
        justifyContent: 'center',
        width: '25%',
    },
    numpadRoot: {
        height: '40%',
        width: '100%'
    },
    numpadRow: {
        display: 'flex',
        flexDirection: 'row',
        height: '20%',
        width: '100%'
    },
    outputD: {
        alignItems: 'center',
        display: 'flex',
        backgroundColor: bgColorD,
        borderWidth: 1,
        borderColor: shade3,
        flexDirection: 'row',
        height: '20%',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        width: '100%'
    },
    outputL: {
        alignItems: 'center',
        display: 'flex',
        backgroundColor: bgColorL,
        borderWidth: 1,
        borderColor: shade2,
        flexDirection: 'row',
        height: '20%',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        width: '100%'
    },
    outputNumD: {
        color: white,
        fontSize: 20,
        fontWeight: 'bold'
    },
    outputNumL: {
        color: black,
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export const recordModalStyles = StyleSheet.create({
    headerD: {
        alignItems: 'center',
        display: 'flex',
        backgroundColor: shade3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 20,
        justifyContent: 'center',
        width: '100%'
    },
    headerL: {
        alignItems: 'center',
        display: 'flex',
        backgroundColor: shade2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 20,
        justifyContent: 'center',
        width: '100%'
    },
    inputBoxD: {
        alignItems: 'center',
        display: 'flex',
        backgroundColor: bgColorD,
        borderWidth: 1,
        borderColor: shade3,
        flexDirection: 'row',
        minHeight: '8%',
        paddingHorizontal: '5%',
        width: '100%'
    },
    inputBoxL: {
        alignItems: 'center',
        display: 'flex',
        backgroundColor: bgColorL,
        borderWidth: 1,
        borderColor: shade2,
        flexDirection: 'row',
        minHeight: '8%',
        paddingHorizontal: '5%',
        width: '100%'
    },
    inputD: {
        borderBottomWidth: 1,
        borderColor: shade3,
        color: white,
        fontSize: 15,
        marginLeft: '5%',
        paddingLeft: '5%',
        width: '85%'
    },
    inputL: {
        borderBottomWidth: 1,
        borderColor: shade2,
        color: black,
        fontSize: 15,
        marginLeft: '5%',
        paddingLeft: '5%',
        width: '85%'
    },
});

export const scPairStyles = StyleSheet.create({
    cancelD: {
        alignItems: 'center',
        backgroundColor: white,
        borderRadius: 40,
        backgroundColor: shade2,
        paddingVertical: 10,
        width: 150,
    },
    cancelL: {
        alignItems: 'center',
        backgroundColor: shade2,
        borderRadius: 40,
        elevation: 2,
        paddingHorizontal: 40,
        paddingVertical: 10,
        width: 150,
    },
    save: {
        alignItems: 'center',
        backgroundColor: white,
        borderRadius: 40,
        elevation: 2,
        paddingVertical: 10,
        width: 150,
    },
})

export const timePickerStyles = StyleSheet.create({
    amTextD:{
        color: white,
        fontSize: 20, 
        fontWeight: 'bold', 
    },
    amTextL:{
        color: black,
        fontSize: 20, 
        fontWeight: 'bold', 
    },
});

// screen styles

export const categoryStyles = StyleSheet.create({
    cancelBtnD: {
        backgroundColor: white,
        borderRadius: 40,
        paddingHorizontal: 40,
        paddingVertical: 10,
        margin: 10,
        width: '45%',
    },
    cancelBtnL: {
        backgroundColor: shade1,
        borderRadius: 40,
        paddingHorizontal: 40,
        paddingVertical: 10,
        margin: 10,
        width: '45%',
    },
    listD: {
        borderColor: shade4,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        height: '70%',
    },
    listL: {
        borderColor: shade1,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        height: '70%',
    },
})

export const chartScreenStyles = StyleSheet.create({
    categoryTextD: {
        color: white,
        width: '50%'
    },
    categoryTextL: {
        color: black,
        width: '50%'
    },
    messageD: {
        color: shade2,
        textAlign: 'center',
    },
    messageL: {
        color: shade3,
        textAlign: 'center',
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
    bubbleD: {
        backgroundColor: shade4,
    },
    bubbleL: {
        backgroundColor: shade2,
    },
    messageD: {
        color: shade2,
        textAlign: 'center',
    },
    messageL: {
        color: shade3,
        textAlign: 'center',
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

export const settingStyles = StyleSheet.create({
    itemChildContainerD: {
        alignItems: 'center',
        backgroundColor: shade4,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
    },
    itemChildContainerL: {
        alignItems: 'center',
        backgroundColor: shade1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
    },
    itemContainerD: {
        alignItems: 'center',
        backgroundColor: shade4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
    },
    itemContainerL: {
        alignItems: 'center',
        backgroundColor: shade1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
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
