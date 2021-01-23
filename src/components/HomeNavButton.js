import React from 'react';
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';

import Bubble from './Bubble';

import { black } from '../data/color';
import { styles } from '../styles';

class HomeNavButton extends React.Component {

    style = styleName => styles[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <View style={styles.rows}>
                <Bubble
                    color={this.props.settings.accent}
                    iconColor={black}
                    iconName={this.props.icon}
                    iconSize={25}
                    onPress={this.props.onPress}
                    size={35}
                />
                <Text style={this.style('centerText')}>
                    {this.props.text}
                </Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(HomeNavButton);