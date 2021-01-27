import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import ExpandButton from '../ExpandButton';
import Numpad from '../Numpad';
import { defaultGoal, updateGoal, } from '../../redux/action';
import { store } from '../../redux/store';

import { black, shade2, shade3, white, } from '../../data/color';
import { generalBottomModalStyles, goalModalStyles, styles, } from '../../styles';

class GoalModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            goalType: props.data.goalSettings.type,
        }
    }

    close = () => this.props.close();

    iconColor = invert => this.props.settings.darkMode ^ invert ? white : black;

    onConfirm = num => {
        if (this.state.goalType === 'none')
            store.dispatch(defaultGoal());
        else
            store.dispatch(updateGoal({
                amount: num,
                type: this.state.goalType,
            }));

        this.props.close();
    }

    placeholderColor = () => this.props.settings.darkMode ? shade2 : shade3;

    selectionBoxStyle = type => {
        return {
            ...goalModalStyles.selectionBox,
            backgroundColor: this.state.goalType === type ? this.props.settings.accent : 'transparent'
        }
    }

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    swipeControl = () => this.state.cpOpen || this.state.dpOpen ? undefined : 'down';

    update = () => this.setState({ goalType: this.props.data.goalSettings.type });

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                isVisible={this.props.open}
                onBackdropPress={this.close}
                onBackButtonPress={this.close}
                onModalShow={this.update}
                onSwipeComplete={this.close}
                swipeDirection={this.swipeControl()}
                style={{ flexDirection: 'row', alignItems: 'flex-end', padding: 0, margin: 0 }}
            >
                {this.props.open && <>
                    <View style={styles.rows}>
                        <View style={this.style(generalBottomModalStyles, 'header')}>
                            <ExpandButton color={this.iconColor(false)} onPress={this.close} />
                        </View>
                        <View style={this.style(goalModalStyles, 'selectionContainer')}>
                            <TouchableOpacity onPress={() => this.setState({ goalType: 'week' })} style={this.selectionBoxStyle('week')}>
                                <Text style={{ color: this.iconColor(this.state.goalType === 'week') }}>WEEKLY</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ goalType: 'month' })} style={this.selectionBoxStyle('month')}>
                                <Text style={{ color: this.iconColor(this.state.goalType === 'month') }}>MONTHLY</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ goalType: 'none' })} style={this.selectionBoxStyle('none')}>
                                <Text style={{ color: this.iconColor(this.state.goalType === 'none') }}>NO GOALS</Text>
                            </TouchableOpacity>
                        </View>
                        <Numpad
                            disabled={this.state.goalType === 'none'}
                            onConfirm={this.onConfirm}
                            onSpecialPress={() => { }}
                            num={this.props.data.goalSettings.amount}
                        />
                    </View>
                </>}
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data,
    settings: state.settings
});

export default connect(mapStateToProps)(GoalModal);
