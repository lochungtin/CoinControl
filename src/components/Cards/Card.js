import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { generalCardStyles, styles, } from '../../styles';
import { black, white } from '../../data/color';

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
        }
    }

    iconColor = () => this.props.color || this.props.settings.accent;

    toggleIconColor = () => {
        if (!this.props.onPress)
            return 'transparent';
        return this.props.settings.darkMode ? white : black;
    }

    onPress = () => {
        if (this.props.onPress)
            this.props.onPress();
    }

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <View style={this.style(generalCardStyles, 'card')}>
                <View style={{ ...styles.columns, justifyContent: 'space-between', width: '100%' }}>
                    <Icon name={this.props.icon} color={this.iconColor()} size={20} />
                    <Text style={this.style(generalCardStyles, 'title')}>
                        {this.props.title}
                    </Text>
                    <TouchableOpacity onPress={this.onPress}>
                        <Icon name={'dots-horizontal'} color={this.toggleIconColor()} size={20} />
                    </TouchableOpacity>
                </View>
                {this.props.children}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Card);