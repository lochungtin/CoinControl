import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

import BreakdownCard from '../components/card/breakdown';
import CashflowCard from '../components/card/cashflow';
import DetailsCard from '../components/card/details';
import GoalCard from '../components/card/goal';
import Header from '../components/headers/minimal';

import { ScreenStyles } from './styles';

import { ReduxThemeType } from '../types/redux';
import { ScreenProps } from '../types/ui';
import { Categories } from '../types/data';

class Screen extends React.Component<ReduxThemeType & ScreenProps> {

    state = {
        categoryKey: '',
        categoryType: Categories.EXPENSE,
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                <Header name='analytics' navigation={this.props.navigation} />
                <ScrollView>
                    <View style={ScreenStyles.scrollView}>
                        <CashflowCard />
                        <BreakdownCard onSelectCategory={(categoryType: Categories, categoryKey: string) => this.setState({ categoryKey, categoryType })} />
                        <DetailsCard categoryKey={this.state.categoryKey} categoryType={this.state.categoryType} />
                        <GoalCard />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);

