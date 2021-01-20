import moment from 'moment';
import React from 'react';
import { TextInput, View, } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from './Bubble';
import ColorPicker from './ColorPicker';
import ExpandButton from './ExpandButton';

import { black, shade2, shade3, white, } from '../data/color';
import { categoryModalStyles, styles, } from '../styles';

class CategoryModal extends React.Component {

    constructor(props) {
        console.log(moment().format("DDMMYYYY-HHmmss"))
        super(props);
        this.state = {
            color: props.settings.accent,
            cpOpen: false,
            newTitle: '',
        }
    }

    close = () => {
        this.setState({ newTitle: '' });
        this.textInput.blur();
        this.props.close();
    }

    confirm = () => {

    }

    cpClose = () => {
        this.setState({ cpOpen: false });
        this.focus();
    }

    focus = () => this.textInput.focus();

    iconColor = () => this.props.settings.darkMode ? white : black;

    placeholderColor = () => this.props.settings.darkMode ? shade2 : shade3;

    style = styleName => categoryModalStyles[styleName + (this.props.settings.darkMode ? "D" : "L")];

    swipe = () => this.state.cpOpen ? 'none' : 'down';

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                isVisible={this.props.open}
                onBackdropPress={this.close}
                onBackButtonPress={this.close}
                onModalShow={this.focus}
                onSwipeComplete={this.close}
                swipeDirection={this.swipe()}
                style={{ flexDirection: 'row', alignItems: 'flex-end', padding: 0, margin: 0 }}
            >
                <View style={{ width: '100%' }}>
                    <View style={this.style('header')}>
                        <ExpandButton color={this.iconColor()} onPress={this.close} />
                    </View>
                    <View style={this.style('content')}>
                        {this.props.icon !== 'none' &&
                            <Icon name={this.props.icon} color={this.state.color} size={30} />
                        }
                        <TextInput
                            onChangeText={text => this.setState({ newTitle: text })}
                            placeholder={'Title (Optional)'}
                            placeholderTextColor={this.placeholderColor()}
                            ref={ref => this.textInput = ref}
                            style={this.style('input')}
                        />
                        <Bubble onPress={() => this.setState({ cpOpen: true })} color={this.state.color} size={25} />
                        <Bubble iconName={'check'} iconColor={this.props.settings.accent} onPress={() => this.confirm()} iconSize={25} />
                    </View>
                </View>
                <ColorPicker
                    close={this.cpClose}
                    open={this.state.cpOpen}
                    onPress={hex => this.setState({ color: hex, cpOpen: false })}
                />
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(CategoryModal);
