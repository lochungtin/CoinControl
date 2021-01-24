import React from 'react';
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';

import AvgCard from '../components/Cards/AvgCard';
import GoalCard from '../components/Cards/GoalCard';
import PieCard from '../components/Cards/PieCard';
import TitleCard from '../components/Cards/TitleCard';
import TrendCard from '../components/Cards/TrendCard';

import { generalCardStyles, styles } from '../styles';

class Screen extends React.Component {

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <View style={this.style(styles, 'screen')}>
                <TitleCard 
                    title={'GENERAL ANALYTICS'}
                />
                <TrendCard />
                <PieCard />                
                <AvgCard />
                <GoalCard />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data,
    settings: state.settings
});

export default connect(mapStateToProps)(Screen);