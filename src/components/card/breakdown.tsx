import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import PieChart from '../charts/pie';
import Selector from '../selector';
import Row from '../stats/row';
import CardBase from './base';

import { WHITE } from '../../data/color';
import { GeneralCardStyles, PieCardStyles } from './styles';

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
        categoryType: Categories.EXPENSE,
        categoryKey: '',
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
        let categoryListP2: Array<CategoryType> = [];
        let pieData: Array<PieArcProps> = Object.keys(categoryStat.tally).map((key: string) => {
            let obj: CategoryTallyType = categoryStat.tally[key];

            let category: CategoryType = this.props.categories[this.state.categoryType][key];
            categoryListP2.push(category);

            return ({
                svg: {
                    fill: category.color,
                    onPress: () => this.onSelectCategory(key),
                },
                value: obj.amount,
            });
        });

        let categoryListP1: Array<CategoryType> = categoryListP2.splice(0, Math.ceil(categoryListP2.length / 2));

        return (
            <CardBase icon='chart-donut' title='breakdown'>
                <View style={GeneralCardStyles.mainContent}>
                    <Selector
                        onToggle={this.onToggleCategory}
                        selected={this.state.categoryType}
                        width={0.85}
                    />
                    <View style={PieCardStyles.rowPadding}>
                        <Row
                            bold
                            label='Total:'
                            value={categoryStat.total}
                        />
                    </View>
                    <PieChart
                        data={pieData}
                        size={250}
                        width={0.1}
                    />
                    <View style={PieCardStyles.selectList}>
                        <View>
                            {categoryListP1.map((category: CategoryType) => {
                                return (
                                    <TouchableOpacity
                                        key={category.key}
                                        onPress={() => this.onSelectCategory(category.key)}
                                        style={PieCardStyles.category}
                                    >
                                        <View style={{ ...PieCardStyles.icon, backgroundColor: category.color }}>
                                            <Icon
                                                color={WHITE}
                                                name={category.icon}
                                                size={20}
                                            />
                                        </View>
                                        <Text style={{ ...PieCardStyles.text, color: this.props.theme.dynamic.text.mainC }}>
                                            {category.name.toUpperCase()}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <View>
                            {categoryListP2.map((category: CategoryType) => {
                                return (
                                    <TouchableOpacity
                                        key={category.key}
                                        onPress={() => this.onSelectCategory(category.key)}
                                        style={PieCardStyles.category}
                                    >
                                        <View style={{ ...PieCardStyles.icon, backgroundColor: category.color }}>
                                            <Icon
                                                color={WHITE}
                                                name={category.icon}
                                                size={20}
                                            />
                                        </View>
                                        <Text style={{ ...PieCardStyles.text, color: this.props.theme.dynamic.text.mainC }}>
                                            {category.name.toUpperCase()}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
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
