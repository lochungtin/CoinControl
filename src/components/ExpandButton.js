
import React from 'react';
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { black, white, } from '../data/color';

class ExpandButton extends React.Component {

    iconColor = () => this.props.iconColor || this.props.settings.darkMode ? white : black;

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Icon 
                    color={this.iconColor()}
                    name={'dots-horizontal'}
                    size={25}
                />
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(ExpandButton);