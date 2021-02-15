import React from 'react';
import { Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../Bubble';
import Card from './Card';
import LabeledProcess from './LabeledProcess';
import WatchlistModal from '../Modals/WatchlistModal';

import { white } from '../../data/color';
import { NULL_KEY } from '../../data/default';
import { styles, watchlistCardStyles, } from '../../styles';

class WatchCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dmOpen: false,
            focus: props.watchlist[0] || '',
        }
    }

    catValue = (catkey, key) => {
        const cat = this.props.expenseCategories[catkey] || this.props.expenseCategories[NULL_KEY];
        return cat[key];
    }

    color = () => this.props.settings.darkMode ? white : black;

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <Card icon={'eye-outline'} title={'WATCHLIST'} onPress={() => this.setState({ dmOpen: true })}>
                {this.props.watchlist.length > 0 &&
                    <View style={watchlistCardStyles.categoriesBar}>
                        {this.props.watchlist.map(key => <View style={watchlistCardStyles.bubbleContainer} key={key}>
                            <Bubble
                                iconColor={this.state.focus === key ? this.catValue(key, 'color') : this.color()}
                                iconName={this.catValue(key, 'iconName')}
                                iconSize={30}
                                onPress={() => this.setState({ focus: key })}
                            />
                        </View>)}
                    </View>
                }
                {this.props.data.expense[this.state.focus] === undefined ?
                    <View style={{ paddingTop: 15 }}>
                        <Text style={this.style(styles, 'centerText')}>
                            No Records Found
                        </Text>
                    </View> :
                    <>
                        <LabeledProcess
                            color={this.catValue(this.state.focus, 'color')}
                            lValue={<>
                                <Icon name={'currency-' + this.props.settings.currency} color={this.color()} size={13} />
                                {this.props.data.expense[this.state.focus].accumulator}
                            </>}
                            percentage={this.props.data.expense[this.state.focus].accumulator / this.props.total.expense}
                            rValue={<>
                                <Icon name={'currency-' + this.props.settings.currency} color={this.color()} size={13} />
                                {this.props.total.expense}
                            </>}
                        />
                        <LabeledProcess
                            color={this.catValue(this.state.focus, 'color')}
                            lValue={this.props.data.expense[this.state.focus].counter}
                            percentage={this.props.data.expense[this.state.focus].counter / this.props.total.expenseTotal}
                            rValue={this.props.total.expenseTotal}
                        />
                    </>
                }
                <WatchlistModal
                    close={() => this.setState({ dmOpen: false, focus: this.props.watchlist[0] || '' })}
                    open={this.state.dmOpen}
                />
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    expenseCategories: state.expenseCategories,
    settings: state.settings,
    watchlist: state.watchlist,
});

export default connect(mapStateToProps)(WatchCard);