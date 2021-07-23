import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import PieChart from '../charts/pie';
import Selector from '../selector';
import CardBase from './base';

import { GeneralCardStyles, PieCardStyles } from './styles';

import { ReduxThemeType } from '../../types/redux';
import { Categories, CategoryStatType, CategoryStore, CategoryType, DataStore } from '../../types/data';
import { PieArcProps } from '../../types/ui';
import { WHITE } from '../../data/color';

interface AdditionalReduxType {
    categories: CategoryStore,
    data: DataStore,
}

class Card extends React.Component<ReduxThemeType & AdditionalReduxType> {

    state = {
        category: Categories.EXPENSE
    }

    selectCategory = (category: string) => { console.log(category) }

    render() {
        let categoryStat: CategoryStatType = this.props.data.stats.categories[this.state.category];
        let categoryListP2: Array<CategoryType> = [];
        let pieData: Array<PieArcProps> = Object.keys(categoryStat.tally).map((key: string) => {
            let obj: { amount: number, count: number } = categoryStat.tally[key];

            let category: CategoryType = this.props.categories[this.state.category][key];
            categoryListP2.push(category);

            return ({
                svg: {
                    fill: category.color,
                    onPress: () => this.selectCategory(key),
                },
                value: obj.amount,
            });
        });

        let categoryListP1: Array<CategoryType> = categoryListP2.splice(0, Math.ceil(categoryListP2.length / 2));

        return (
            <CardBase icon='chart-donut' title='breakdown'>
                <View style={GeneralCardStyles.mainContent}>
                    <Selector
                        onToggle={(category: Categories) => this.setState({ category })}
                        selected={this.state.category}
                        width={0.85}
                    />
                    <View>
                        <Text>
                            {`Total: ${categoryStat.total}`}
                        </Text>
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
                                        onPress={() => this.selectCategory(category.key)}
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
                                        onPress={() => this.selectCategory(category.key)}
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
