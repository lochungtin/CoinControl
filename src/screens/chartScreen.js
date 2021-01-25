import React from 'react';
import { ScrollView, View, } from 'react-native';
import { connect } from 'react-redux';

import CategoryCard from '../components/Cards/CategoryCard';
import GoalCard from '../components/Cards/GoalCard';
import PieCard from '../components/Cards/PieCard';
import TitleCard from '../components/Cards/TitleCard';
import TrendCard from '../components/Cards/TrendCard';
import WatchCard from '../components/Cards/WatchCard';
import CardModal from '../components/Modals/CardModal';

import { update } from '../functions/GenStats';
import { styles } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: update(props.data.data, props.watchlist),
            cmOpen: false,
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => this.setState({ data: update(this.props.data.data, this.props.watchlist) }));
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <View style={{ ...this.style(styles, 'screen'), }}>
                <ScrollView style={{ width: '100%' }}>
                    <TitleCard
                        onPress={() => this.setState({ cmOpen: true })}
                        icon={'chart-bubble'}
                        title={'GENERAL ANALYTICS'}
                    />
                    {this.props.cards.tc && <TrendCard data={this.state.data.recent} />}
                    {this.props.cards.pc && <PieCard data={this.state.data.categories} total={this.state.data.total} />}
                    {this.props.cards.wc && <WatchCard data={this.state.data.watchlist} />}
                    {this.props.cards.gc && <GoalCard />}
                    {this.props.cards.cc && <CategoryCard data={this.state.data.categories} total={this.state.data.total} />}
                </ScrollView>
                <CardModal
                    close={() => this.setState({ cmOpen: false })}
                    open={this.state.cmOpen}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    cards: state.cards,
    data: state.data,
    settings: state.settings,
    watchlist: state.watchlist,
});

export default connect(mapStateToProps)(Screen);