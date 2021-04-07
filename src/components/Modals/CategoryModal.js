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
import { RNKey } from '../../functions/GenKey';

class CategoryModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: props.settings.accent,
            cpOpen: false,
            newTitle: '',
        };
    }

    close = () => {
        this.setState({ newTitle: '' });
        this.textInput.blur();
        this.props.close();
    }

    confirm = () => {
        if (this.state.newTitle !== '') {
            const payload = {
                key: RNKey(),
                data: {
                    color: this.state.color,
                    iconName: this.props.icon,
                    name: this.state.newTitle,
                }
            };
            store.dispatch(this.props.type === 'Expense' ? addExpenseCategory(payload) : addIncomeCategory(payload));
            this.props.close();
        }
    }

    cpClose = () => {
        this.setState({ cpOpen: false });
        this.focus();
    }

    cpOnPress = color => this.setState({ color, cpOpen: false });

    cpOpen = () => this.setState({ cpOpen: true });

    focus = () => this.textInput.focus();

    iconColor = () => this.props.settings.darkMode ? white : black;

    placeholderColor = () => this.props.settings.darkMode ? shade2 : shade3;

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    swipe = () => this.state.cpOpen ? 'none' : 'down';

    textChange = newTitle => this.setState({ newTitle });

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                isVisible={this.props.open}
                onBackdropPress={this.close}
                onBackButtonPress={this.close}
                onModalShow={this.focus}
                onSwipeComplete={this.close}
                style={generalBottomModalStyles.bottomModalContainer}
                swipeDirection={'down'}
            >
                <View style={{ width: '100%' }}>
                    <View style={this.style(generalBottomModalStyles, 'header')}>
                        <ExpandButton color={this.iconColor()} onPress={this.close} />
                    </View>
                    <View style={this.style(categoryModalStyles, 'content')}>
                        {this.props.icon !== 'none' &&
                            <Icon 
                                color={this.state.color} 
                                name={this.props.icon} 
                                size={30}
                            />
                        }
                        <TextInput
                            onChangeText={this.textChange}
                            placeholder={'Title (Optional)'}
                            placeholderTextColor={this.placeholderColor()}
                            style={this.style(categoryModalStyles, 'input')}
                        />
                        <Bubble 
                            color={this.state.color} 
                            onPress={this.cpOpen} 
                            size={25}
                        />
                        <Bubble 
                            iconColor={this.props.settings.accent}
                            iconName={'check'}
                            iconSize={25}
                            onPress={this.confirm}
                        />
                    </View>
                </View>
                <ColorPicker
                    close={this.cpClose}
                    onPress={this.cpOnPress}
                    open={this.state.cpOpen}
                />
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(CategoryModal);
