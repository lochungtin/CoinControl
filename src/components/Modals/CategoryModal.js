import React from 'react';
import { TextInput, View, } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../Bubble';
import ColorPicker from '../ColorPicker';
import ExpandButton from '../ExpandButton';
import { addExpenseCategory, addIncomeCategory, } from '../../redux/action';
import { store } from '../../redux/store';

import { black, shade2, shade3, white, } from '../../data/color';
import { categoryModalStyles, generalBottomModalStyles, } from '../../styles';

class CategoryModal extends React.Component {

    constructor(props) {
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
        if (this.state.newTitle !== '') {
            if (this.props.type === 'Expense')
                store.dispatch(addExpenseCategory({ color: this.state.color, iconName: this.props.icon, name: this.state.newTitle, }));
            else
                store.dispatch(addIncomeCategory({ color: this.state.color, iconName: this.props.icon, name: this.state.newTitle, }));
            this.props.close();
        }
    }

    cpClose = () => {
        this.setState({ cpOpen: false });
        this.focus();
    }

    focus = () => this.textInput.focus();

    iconColor = () => this.props.settings.darkMode ? white : black;

    placeholderColor = () => this.props.settings.darkMode ? shade2 : shade3;

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

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
                swipeDirection={'down'}
                style={{ flexDirection: 'row', alignItems: 'flex-end', padding: 0, margin: 0 }}
            >
                <View style={{ width: '100%' }}>
                    <View style={this.style(generalBottomModalStyles, 'header')}>
                        <ExpandButton color={this.iconColor()} onPress={this.close} />
                    </View>
                    <View style={this.style(categoryModalStyles, 'content')}>
                        {this.props.icon !== 'none' &&
                            <Icon name={this.props.icon} color={this.state.color} size={30} />
                        }
                        <TextInput
                            onChangeText={text => this.setState({ newTitle: text })}
                            placeholder={'Title (Optional)'}
                            placeholderTextColor={this.placeholderColor()}
                            ref={ref => this.textInput = ref}
                            style={this.style(categoryModalStyles, 'input')}
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
