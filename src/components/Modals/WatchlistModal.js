import React from 'react';
import { FlatList, Text, View, } from 'react-native'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../Bubble';
import ExpandButton from '../ExpandButton';
import { addWatchlist, removeWatchlist, } from '../../redux/action';
import { store } from '../../redux/store';

import { pickerModalStyles, styles, watchlistModalStyles, } from '../../styles';

class WatchlistModal extends React.Component {

    icon = key => this.props.watchlist.includes(key) ? 'check-circle-outline' : 'close-circle-outline';

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    toggle = key => {
        if (this.props.watchlist.includes(key))
            store.dispatch(removeWatchlist(key));
        else if (this.props.watchlist.length < 6)
            store.dispatch(addWatchlist(key));
    }

    render() {
        return (
            <Modal
                animationIn={'slideInUp'}
                isVisible={this.props.open}
                onBackdropPress={this.props.close}
                onBackButtonPress={this.props.close}
                style={{ alignItems: 'center', padding: 0, margin: 0, }}
            >
                <View style={{ ...this.style(pickerModalStyles, 'root'), height: 600, width: 350 }}>
                    <ExpandButton onPress={this.props.close} />
                    {this.props.watchlist.length === 6 &&
                        <Text style={this.style(styles, 'centerText')}>
                            WATCHLIST IS CURRENTLY FULL
                        </Text>
                    }
                    <FlatList
                        data={Object.keys(this.props.expenseCategories)}
                        keyExtractor={key => key}
                        renderItem={obj => {
                            const key = obj.item;
                            const item = this.props.expenseCategories[key];
                            return (
                                <View style={watchlistModalStyles.selectionBox}>
                                    <Icon 
                                        color={item.color} 
                                        name={item.iconName} 
                                        size={24}
                                    />
                                    <Text style={this.style(watchlistModalStyles, 'displayText')}>
                                        {item.name.toUpperCase()}
                                    </Text>
                                    <Bubble
                                        iconColor={this.props.settings.accent}
                                        iconName={this.icon(key)}
                                        iconSize={24}
                                        onPress={() => this.toggle(key)}
                                        size={24}
                                    />
                                </View>
                            );
                        }}
                    />
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    cards: state.cards,
    expenseCategories: state.expenseCategories,
    settings: state.settings,
    watchlist: state.watchlist,
});

export default connect(mapStateToProps)(WatchlistModal);