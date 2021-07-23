import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

import BreakdownCard from '../components/card/breakdown';
import CashflowCard from '../components/card/cashflow';
import BDDetailsCard from '../components/card/breakdownDetail';
import GoalCard from '../components/card/goal';
import Header from '../components/headers/minimal';

import { ScreenStyles } from './styles';

import { Categories } from '../types/data';
import { ReduxThemeType } from '../types/redux';
import { ScreenProps } from '../types/ui';

class Screen extends React.Component<ReduxThemeType & ScreenProps> {

    state = {
        bdCategoryKey: '',
        bdCategoryType: Categories.EXPENSE,
        cfCategoryKey: '',
        cfCategoryType: Categories.EXPENSE,
        date: '',
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                <Header name='analytics' navigation={this.props.navigation} />
                <ScrollView>
                    <View style={ScreenStyles.scrollView}>
                        <CashflowCard
                            onSelectCategory={(cfCategoryType: Categories, cfCategoryKey: string) => this.setState({ cfCategoryKey, cfCategoryType })}
                            onSelectDate={(date: string) => this.setState({ date })}
                        />
                        <BreakdownCard
                            onSelectCategory={(bdCategoryType: Categories, bdCategoryKey: string) => this.setState({ bdCategoryKey, bdCategoryType })}
                        />
                        <BDDetailsCard
                            categoryKey={this.state.bdCategoryKey}
                            categoryType={this.state.bdCategoryType}
                        />
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

