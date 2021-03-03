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
        flexDirection: 'row',
    },
    roundView: {
        borderRadius: 40,
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
    rows: {
        alignItems: 'center',
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

// card styles

export const generalCardStyles = StyleSheet.create({
    amountTextD: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    amountTextL: {
        color: black,
        fontSize: 22,
        textAlign: 'center',
    },
    centerLabel: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    cardD: {
        backgroundColor: shade4,
        borderRadius: 10,
        marginHorizontal: '2.5%',
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '95%',
    },
    cardL: {
        backgroundColor: shade1,
        borderRadius: 10,
        marginHorizontal: '2.5%',
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '95%',
    },
    titleD: {
        color: white,
        fontSize: 17,
        width: '70%',
    },
    titleL: {
        color: black,
        fontSize: 17,
        width: '70%',
    },
});

export const pieCardStyles = StyleSheet.create({
    progressBox: {
        alignItems: 'center',
        paddingVertical: 10,
        width: '100%'
    },
});

export const watchlistCardStyles = StyleSheet.create({
    categoriesBar: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 10,
    },
    bubbleContainer: {
        width: 62
    }
});

// modal styles

export const cardModalStyles = StyleSheet.create({
    selectionTextD: {
        color: white,
        fontSize: 16,
    },
    selectionTextL: {
        color: black,
        fontSize: 16,
    },
    selectionRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 240
    },
    titleD: {
        color: white,
        fontSize: 20,
    },
    titleL: {
        color: black,
        fontSize: 20,
    },
})

export const categoryModalStyles = StyleSheet.create({
    contentD: {
        alignItems: 'center',
        backgroundColor: bgColorD,
        borderWidth: 1,
        borderColor: shade3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: '8%',
        paddingHorizontal: '5%',
        width: '100%'
    },
    contentL: {
        alignItems: 'center',
        backgroundColor: bgColorL,
        borderWidth: 1,
        borderColor: shade2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: '8%',
        paddingHorizontal: '5%',
        width: '100%'
    },
    inputD: {
        borderBottomWidth: 1,
        borderColor: shade3,
        color: white,
        fontSize: 15,
        paddingLeft: '5%',
        width: '70%'
    },
    inputL: {
        borderBottomWidth: 1,
        borderColor: shade2,
        color: black,
        fontSize: 15,
        paddingLeft: '5%',
        width: '70%'
    },
});

export const confirmationModalStyles = StyleSheet.create({
    buttonText: {
        color: white
    },
    contentD: {
        alignItems: 'center',
        backgroundColor: bgColorD,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 15,
        width: maxWidth,
    },
    contentL: {
        alignItems: 'center',
        backgroundColor: bgColorL,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 15,
        width: maxWidth,
    },
    detailD: {
        color: white,
        fontSize: 17,
        textAlign: 'justify',
    },
    detailL: {
        color: black,
        fontSize: 17,
        textAlign: 'justify',
    },
    dsaD: {
        color: white,
        fontSize: 15,
    },
    dsaL: {
        color: black,
        fontSize: 15,
    },
    title: {
        fontSize: 23,
    }
});

export const generalBottomModalStyles = StyleSheet.create({
    bottomModalContainer: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        margin: 0,
        padding: 0,
    },
    centerModalContainer: {
        alignItems: 'center', 
        margin: 0,
        padding: 0,
    },
    headerD: {
        alignItems: 'center',
        backgroundColor: shade3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 20,
        justifyContent: 'center',
        width: '100%',
    },
    headerL: {
        alignItems: 'center',
        backgroundColor: shade2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 20,
        justifyContent: 'center',
        width: '100%',
    },
});

export const goalModalStyles = StyleSheet.create({
    selectionContainerD: {
        alignItems: 'center',
        backgroundColor: bgColorD,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '8%',
        width: maxWidth,
    },
    selectionContainerL: {
        alignItems: 'center',
        backgroundColor: bgColorL,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '8%',
        width: maxWidth,
    },
    selectionBox: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        minWidth: '33.3%'
    }
});

export const pickerModalStyles = StyleSheet.create({
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

export const recordModalStyles = StyleSheet.create({
    inputBoxD: {
        alignItems: 'center',
        backgroundColor: bgColorD,
        borderWidth: 1,
        borderColor: shade3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: '8%',
        paddingHorizontal: '5%',
        width: '100%'
    },
    inputBoxL: {
        alignItems: 'center',
        backgroundColor: bgColorL,
        borderWidth: 1,
        borderColor: shade2,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        width: '70%'
    },
    inputL: {
        borderBottomWidth: 1,
        borderColor: shade2,
        color: black,
        fontSize: 15,
        marginLeft: '5%',
        paddingLeft: '5%',
        width: '70%'
    },
});

export const watchlistModalStyles = StyleSheet.create({
    displayTextD: {
        color: white,
        width: 150,
    },
    displayTextL: {
        color: black,
        width: 150,
    },
    selectionBox: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 5,
        width: 300,
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
        flexDirection: 'row',
        maxHeight: 60,
        minHeight: 60,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        width: maxWidth,
    },
    headerL: {
        alignItems: 'center',
        backgroundColor: bgColorL,
        borderColor: shade4,
        borderBottomWidth: 2,
        flexDirection: 'row',
        maxHeight: 60,
        minHeight: 60,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        width: maxWidth,
    },
    textContainer: {
        width: '60%',
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
        backgroundColor: bgColorD,
        borderWidth: 1,
        borderColor: shade3,
        height: '100%',
        justifyContent: 'center',
        width: '25%',
    },
    buttonL: {
        alignItems: 'center',
        backgroundColor: bgColorL,
        borderWidth: 1,
        borderColor: shade2,
        height: '100%',
        justifyContent: 'center',
        width: '25%',
    },
    numpadRoot: {
        height: '40%',
        width: maxWidth
    },
    numpadRow: {
        flexDirection: 'row',
        height: '20%',
        width: '100%'
    },
    outputD: {
        alignItems: 'center',
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

export const timePickerStyles = StyleSheet.create({
    amTextD: {
        color: white,
        fontSize: 20,
        fontWeight: 'bold',
    },
    amTextL: {
        color: black,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

// screen styles

export const iconSelectionScreen = StyleSheet.create({
    headerD: {
        alignItems: 'center',
        backgroundColor: shade4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    headerL: {
        alignItems: 'center',
        backgroundColor: shade1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    headerTextD: {
        color: white,
        fontWeight: 'bold',
    },
    headerTextL: {
        color: black,
        fontWeight: 'bold',
    },
    stack: {
        height: 35,
        width: 35,
    },
    stackChild: {
        left: 0,
        position: 'absolute',
        top: 0,
    },
    stackDelete: {
        alignItems: 'center',
        backgroundColor: '#e74c3c',
        borderRadius: 10,
        elevation: 10,
        height: 20,
        justifyContent: 'center',
        width: 20,
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
        height: '70%',
        minWidth: maxWidth,
    },
    borderL: {
        borderColor: shade1,
        borderTopWidth: 2,
        height: '70%',
        minWidth: maxWidth,
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
    sectionItem: {
        borderRadius: 15,
        paddingHorizontal: 30,
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

export const signupStyles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 35,
      backgroundColor: '#fff'
    },
    inputStyle: {
      width: '100%',
      marginBottom: 15,
      paddingBottom: 15,
      alignSelf: "center",
      borderColor: "#ccc",
      borderBottomWidth: 1
    },
    loginText: {
      color: '#3740FE',
      marginTop: 25,
      textAlign: 'center'
    },
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    }
  });
