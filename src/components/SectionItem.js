import React from 'react';
import { TouchableOpacity, Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../components/Bubble';
import { black, homeScreenStyles, white, styles, } from '../styles';

class SectionItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    iconColor = () => {
        return this.props.dark ? white : black;
    }

    style = (stylesheet, styleName) => {
        return stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.setState({ open: !this.state.open })} style={this.style(homeScreenStyles, 'sectionItem')}>
                <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                    <Icon name={this.props.item.icon} size={20} color={this.props.settings.accent} />
                    <Text style={this.style(homeScreenStyles, 'textCat')}>
                        {this.props.item.category}
                    </Text>
                    <Text style={this.style(homeScreenStyles, 'textVal')}>
                        {this.props.item.value}
                    </Text>
                </View>
                {(this.state.open || !this.props.compactMode) &&
                    <>
                        <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                            <Icon name={this.props.item.icon} size={20} color={'transparent'} />
                            <Text style={this.style(homeScreenStyles, 'textCat')}>
                                Title: {this.props.item.title}
                            </Text>
                            <Text style={{ ...this.style(homeScreenStyles, 'textVal'), color: 'transparent' }}>
                                {this.props.item.value}
                            </Text>
                        </View>
                        <View style={{ ...styles.columns, justifyContent: 'space-between' }}>
                            <View style={{ width: '70%' }} />
                            <Bubble
                                color={this.style(homeScreenStyles, 'bubble').backgroundColor}
                                iconName={'pencil-outline'}
                                iconColor={this.props.settings.accent}
                                onPress={() => this.props.onEdit(this.props.item)}
                            />
                            <Bubble
                                color={this.style(homeScreenStyles, 'bubble').backgroundColor}
                                iconName={'trash-can'}
                                iconColor={this.props.settings.accent}
                                onPress={() => this.props.onDelete(this.props.item.key)}
                            />
                        </View>
                    </>
                }
            </TouchableOpacity>

        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(SectionItem);