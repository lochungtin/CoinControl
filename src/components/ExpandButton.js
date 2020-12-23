import React from 'react';
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { black, white, } from '../styles';

class ExpandButton extends React.Component {

    color = () => {
        if (this.props.color !== undefined)
            return this.props.color;
        return this.props.settings.darkMode ? white : black;
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Icon name={'dots-horizontal'} size={25} color={this.color()} />
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(ExpandButton);