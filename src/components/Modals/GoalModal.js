import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import ExpandButton from '../ExpandButton';
import Numpad from '../Numpad';
import { defaultGoal, updateGoal, } from '../../redux/action';
import { store } from '../../redux/store';

import { black, shade2, shade3, white, } from '../../data/color';
import { RNKey } from '../../functions/GenKey';
import { generalBottomModalStyles, goalModalStyles, styles, } from '../../styles';

class GoalModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            goalType: props.data.goalSettings.type,
        };

        this.goalType = {
            week: 'WEEKLY',
            month: 'MONTHLY',
            none: 'NO GOALS',
        };
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

    selectionBoxStyle = type => ({
        ...goalModalStyles.selectionBox,
        backgroundColor: this.state.goalType === type ? this.props.settings.accent : 'transparent'
    });

    setGoalType = goalType => this.setState({ goalType });

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

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
                style={generalBottomModalStyles.bottomModalContainer}
                swipeDirection={'down'}                
            >
                {this.props.open && <>
                    <View style={styles.rows}>
                        <View style={this.style(generalBottomModalStyles, 'header')}>
                            <ExpandButton color={this.iconColor(false)} onPress={this.close} />
                        </View>
                        <View style={this.style(goalModalStyles, 'selectionContainer')}>
                            {Object.keys(this.goalType).map(type => {
                                return (
                                    <TouchableOpacity 
                                        key={RNKey()}
                                        onPress={() => this.setGoalType(type)} 
                                        style={this.selectionBoxStyle(type)}
                                    >
                                        <Text style={{ color: this.iconColor(this.state.goalType === type) }}>
                                            {this.goalType[type]}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
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
