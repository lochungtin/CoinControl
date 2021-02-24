import React from 'react';
import { Text, View, } from 'react-native'
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import Bubble from '../Bubble';
import ExpandButton from '../ExpandButton';
import { addCard, hideCard, } from '../../redux/action';
import { store } from '../../redux/store';

import { RNKey } from '../../functions/GenKey';
import { cardModalStyles, generalBottomModalStyles, pickerModalStyles, styles, } from '../../styles';

class CardModal extends React.Component {

    constructor(props) {
        super(props);
        this.mapping = {
            cc: 'CATEGORIES',
            gc: 'GOAL STATUS',
            pc: 'PERCENTAGES',
            tc: 'CASHFLOW',
        };
    }

    icon = value => value ? 'check-circle-outline' : 'close-circle-outline';

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    toggle = key => store.dispatch(this.props.cards[key] ? hideCard(key) : addCard(key));

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                isVisible={this.props.open}
                onBackdropPress={this.props.close}
                onBackButtonPress={this.props.close}
                onSwipeComplete={this.props.close}
                style={generalBottomModalStyles.centerModalContainer}
                swipeDirection='down'
            >
                <View style={{ ...this.style(pickerModalStyles, 'root'), height: 300, }}>
                    <ExpandButton onPress={this.props.close} />
                    <Text style={this.style(cardModalStyles, 'title')}>
                        CARDS
                    </Text>
                    <View style={{ ...styles.rows, height: 200, justifyContent: 'space-evenly' }}>
                        {Object.keys(this.mapping).map(key => {
                            return (
                                <View style={cardModalStyles.selectionRow} key={RNKey()}>
                                    <Text style={this.style(cardModalStyles, 'selectionText')}>
                                        {this.mapping[key]}
                                    </Text>
                                    <Bubble
                                        iconColor={this.props.settings.accent}
                                        iconName={this.icon(this.props.cards[key])}
                                        iconSize={24}
                                        onPress={() => this.toggle(key)}
                                        size={24}
                                    />
                                </View>
                            );
                        })}
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    cards: state.cards,
    settings: state.settings,
});

export default connect(mapStateToProps)(CardModal);