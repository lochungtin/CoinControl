import React from 'react';
import { SafeAreaView, SectionList, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { parseAll, parseTotal } from '../functions/parser';
import { styles } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>

            </View>
        );
    }
}

const mapStateToProps = state => ({
    records: state.records,
    settings: state.settings,
})

export default connect(mapStateToProps)(Screen);