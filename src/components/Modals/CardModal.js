import React from 'react';
import { Text, View, } from 'react-native'
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import Bubble from '../Bubble';
import ExpandButton from '../ExpandButton';
import { addCard, hideCard, } from '../../redux/action';
import { store } from '../../redux/store';

import { cardModalStyles, pickerModalStyles, styles, } from '../../styles';

class CardModal extends React.Component {

    constructor() {
        super();
        this.mapping = {
            tc: 'CASHFLOW',
            pc: 'PERCENTAGES',
            wc: 'WATCHLIST',
            gc: 'GOAL STATUS',
            cc: 'CATEGORIES',
        }
    }

    icon = value => value ? 'check-circle-outline' : 'close-circle-outline';

    toggle = key => {
        if (this.props.cards[key])
            store.dispatch(hideCard(key));
        else
            store.dispatch(addCard(key));
    }

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                isVisible={this.props.open}
                onBackdropPress={this.props.close}
                onBackButtonPress={this.props.close}
                onSwipeComplete={this.props.close}
                swipeDirection='down'
                style={{ alignItems: 'center', padding: 0, margin: 0 }}
            >
                <View style={{ ...this.style(pickerModalStyles, 'root'), height: 350 }}>
                    <ExpandButton onPress={this.props.close} />
                    <Text style={this.style(cardModalStyles, 'title')}>
                        CARDS
                    </Text>
                    <View style={{ ...styles.rows, height: 240, justifyContent: 'space-evenly' }}>
                        {Object.keys(this.mapping).map(key => {
                            return (
                                <View style={cardModalStyles.selectionRow} key={key}>
                                    <Text style={this.style(cardModalStyles, 'selectionText')}>
                                        {this.mapping[key]}
                                    </Text>
                                    <Bubble
                                        onPress={() => this.toggle(key)}
                                        iconColor={this.props.settings.accent}
                                        iconName={this.icon(this.props.cards[key])}
                                        iconSize={24}
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