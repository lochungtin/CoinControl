import React from 'react';
import { ScrollView, View, } from 'react-native';
import { connect } from 'react-redux';

import CategoryCard from '../components/Cards/CategoryCard';
import GoalCard from '../components/Cards/GoalCard';
import PieCard from '../components/Cards/PieCard';
import TitleCard from '../components/Cards/TitleCard';
import TrendCard from '../components/Cards/TrendCard';
import WatchCard from '../components/Cards/WatchCard';

import { update } from '../functions/GenStats';
import { styles } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: update(props.data.data, props.watchlist)
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
                        onPress={() => { }}
                        icon={'chart-bubble'}
                        title={'GENERAL ANALYTICS'}
                    />
                    <TrendCard data={this.state.data.recent} />
                    <PieCard data={this.state.data.categories} total={this.state.data.total} />
                    <WatchCard data={this.state.data.watchlist} />
                    <GoalCard data={this.props.data.goal} goalType={this.props.data.goalSettings} />
                    <CategoryCard data={this.state.data.categories} total={this.state.data.total} />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data,
    settings: state.settings,
    watchlist: state.watchlist,
});

export default connect(mapStateToProps)(Screen);