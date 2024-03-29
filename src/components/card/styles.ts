import { Dimensions, StyleSheet } from 'react-native';

export const screenWidth: number = Dimensions.get('screen').width;

export const GeneralCardStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 15,
        width: screenWidth * 0.95,
    },
    content: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: screenWidth * 0.85,
    },
    topRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: screenWidth * 0.8,
    },
    titlePadding: {
        paddingLeft: 30,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    mainContent: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 15,
        width: screenWidth * 0.85,
    },
    nullPrompt: {
        fontSize: 16,
        textAlign: 'center',
    },
    topPadding: {
        marginTop: 15,
    }
});

export const DetailCardStyles = StyleSheet.create({
    topRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: screenWidth * 0.85,
    },
    selected: {
        fontSize: 18,
        marginBottom: 15,
    },
    cfDetailRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        width: screenWidth * 0.85,
    },
    priceBox: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export const GoalCardStyles = StyleSheet.create({
    topRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    typeText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textRow: {
        alignItems: 'center',
        borderBottomWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        paddingRight: 5,
        marginBottom: 15,
        width: screenWidth * 0.85,
    },
    textBox: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
    },
    pgbarBox: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15,
        width: screenWidth * 0.85,
    },
});
