import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import PieChart from '../charts/pie';
import Selector from '../selector';
import List from '../stats/list';
import Row from '../stats/row';
import CardBase from './base';

import { GeneralCardStyles } from './styles';

import { Categories, CategoryStatType, CategoryStore, CategoryTallyType, CategoryType, DataStore } from '../../types/data';
import { ReduxThemeType } from '../../types/redux';
import { PieArcProps } from '../../types/ui';

interface AdditionalReduxType {
    categories: CategoryStore,
    data: DataStore,
}

interface DataProps {
    onSelectCategory: (categoryType: Categories, categoryKey: string) => void,
}

class Card extends React.Component<ReduxThemeType & AdditionalReduxType & DataProps> {

    state = {
        categoryKey: '',
        categoryType: Categories.EXPENSE,
    }

    onSelectCategory = (categoryKey: string) => {
        if (this.state.categoryKey === categoryKey)
            categoryKey = '';

        this.setState({ categoryKey });
        this.props.onSelectCategory(this.state.categoryType, categoryKey);
    }

    onToggleCategory = (categoryType: Categories) => {
        this.setState({ categoryType });
        this.props.onSelectCategory(this.state.categoryType, '');
    }

    render() {
        let categoryStat: CategoryStatType = this.props.data.stats.categories[this.state.categoryType];
        let categoryList: Array<CategoryType> = [];
        let pieData: Array<PieArcProps> = Object.keys(categoryStat.tally).map((key: string) => {
            let obj: CategoryTallyType = categoryStat.tally[key];

            let category: CategoryType = this.props.categories[this.state.categoryType][key];
            categoryList.push(category);

            return ({
                svg: {
                    fill: category.color,
                    onPress: () => this.onSelectCategory(key),
                },
                value: obj.amount,
            });
        });

        return (
            <CardBase icon='chart-donut' title='breakdown'>
                <View style={GeneralCardStyles.mainContent}>
                    <Selector
                        onToggle={this.onToggleCategory}
                        selected={this.state.categoryType}
                        width={0.85}
                    />
                    <View style={GeneralCardStyles.topPadding}>
                        <Row
                            bold
                            label='Total:'
                            value={categoryStat.total}
                        />
                    </View>
                    {categoryStat.total !== 0 && <PieChart
                        data={pieData}
                        size={250}
                        width={0.1}
                    />}
                    {categoryStat.total !== 0 && <List
                        categoryList={categoryList}
                        onSelectCategory={this.onSelectCategory}
                    />}
                </View>
            </CardBase>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType & AdditionalReduxType) => ({
    categories: state.categories,
    data: state.data,
    theme: state.theme,
});

export default connect(mapStateToProps)(Card);
