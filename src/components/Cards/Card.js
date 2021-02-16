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
        };
    }

    iconColor = () => this.props.color || this.props.settings.accent;

    toggleIconColor = () => {
        if (!this.props.onPress)
            return 'transparent';
        return this.props.settings.darkMode ? white : black;
    }

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <TouchableOpacity style={this.style(generalCardStyles, 'card')}>
                <View style={{ ...styles.columns, justifyContent: 'space-between', width: '100%', }}>
                    <TouchableOpacity onPress={this.props.iconPress}>
                        <Icon 
                            color={this.iconColor()} 
                            name={this.props.icon} 
                            size={20}
                        />
                    </TouchableOpacity>
                    <Text style={this.style(generalCardStyles, 'title')}>
                        {this.props.title}
                    </Text>
                    <TouchableOpacity onPress={this.props.onPress}>
                        <Icon 
                            color={this.toggleIconColor()} 
                            name={'dots-horizontal'} 
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Card);