import React from 'react';
import { ScrollView, View, } from 'react-native';
import { connect } from 'react-redux';

import AvgCard from '../components/Cards/AvgCard';
import CategoryCard from '../components/Cards/CategoryCard';
import GoalCard from '../components/Cards/GoalCard';
import PieCard from '../components/Cards/PieCard';
import TitleCard from '../components/Cards/TitleCard';
import TrendCard from '../components/Cards/TrendCard';
import WatchCard from '../components/Cards/WatchCard';

import { styles } from '../styles';

class Screen extends React.Component {

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
                    <TrendCard />
                    <PieCard />
                    <WatchCard />
                    <AvgCard />
                    <GoalCard />
                    <CategoryCard />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data,
    settings: state.settings
});

export default connect(mapStateToProps)(Screen);