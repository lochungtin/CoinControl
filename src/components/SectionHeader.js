import React from 'react';
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';

import { homeScreenStyles, styles, } from '../styles';

class SectionHeader extends React.Component {

    style = (stylesheet, styleName) => {
        return stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];
    }

    render() {
        return (
            <View style={this.style(homeScreenStyles, 'sectionHead')}>
                <Text style={this.style(styles, 'text')}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(SectionHeader);