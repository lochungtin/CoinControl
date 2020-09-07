import React from 'react';
import { SafeAreaView, SectionList, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { parseAll, parseTotal } from '../functions/parser';
import { accent, darkWhite, homeScreenStyles, lightGrey, maxWidth, styles, white, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.screen}>

            </View>
        );
    }
}

const mapStateToProps = state => ({
    records: state.records
})

export default connect(mapStateToProps)(Screen);