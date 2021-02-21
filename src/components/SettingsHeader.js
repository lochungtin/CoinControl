import React from 'react';
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';

import { settingStyles } from '../styles';

class SettingsHeader extends React.Component {

    render() {
        return (
            <View style={settingStyles.titleContainer}>
                <Text style={this.props.settings.darkMode ? settingStyles.titleStyleD : settingStyles.titleStyleL}>
                    {this.props.title}
                </Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(SettingsHeader);