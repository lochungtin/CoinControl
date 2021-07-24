import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Category from '../stats/category';
import Row from '../stats/row';
import CardBase from './base';

import { DetailCardStyles, GeneralCardStyles } from './styles';

import { Categories, CategoryStore, DataStore, DataType, SettingsType } from '../../types/data';
import { ReduxThemeType } from '../../types/redux';

interface AdditionalReduxType {
    categories: CategoryStore,
    data: DataStore,
    settings: SettingsType,
}

interface DataProps {
    categoryType: Categories,
    categoryKey: string,
    date: string,
    dataList: Array<{ [key: string]: any }>,
    recordList: Array<DataType>,
}

class Card extends React.Component<ReduxThemeType & DataProps & AdditionalReduxType> {
    render() {
        let amount: number = 0;
        let count: number = 0;

        this.props.recordList.forEach((record: DataType) => {
            if (this.props.categoryKey === record.categoryKey) {
                amount += record.value;
                count += 1;
            }
        });

        let data: { [key: string]: any } = this.props.dataList[this.props.dataList.findIndex((datapoint: { [key: string]: any }) => datapoint.date === this.props.date)];
        let categories: Array<string> = Object.keys(data || {}).filter((key: string) => key !== 'date' && data[key] !== 0);

        console.log(categories);

        return (
            <CardBase icon='card-text-outline' title='7 day details'>
                <View style={GeneralCardStyles.mainContent}>
                    {this.props.categoryKey === '' && this.props.date === '' ?
                        <Text style={{ ...GeneralCardStyles.nullPrompt, color: this.props.theme.dynamic.text.secondaryC }}>
                            Select a category or a date from "7 day cashflow" by clicking on the columns or the cateogory list to start using this card
                        </Text>
                        :
                        <>
                            {this.props.date === '' ?
                                <View>
                                    <View style={DetailCardStyles.topRow}>
                                        <Text style={{ ...DetailCardStyles.selected, color: this.props.theme.dynamic.text.mainC }}>
                                            Selected:
                                        </Text>
                                        <Category category={this.props.categories[this.props.categoryType][this.props.categoryKey]} />
                                    </View>
                                    <Row label='Total:' value={amount} />
                                    <Row
                                        noCurrency
                                        label='Entries:'
                                        value={count}
                                    />
                                    <Row label='Average per Entry:' value={amount / count} />
                                </View>
                                :
                                <View>
                                    <View style={DetailCardStyles.topRow}>
                                        <Text style={{ ...DetailCardStyles.selected, color: this.props.theme.dynamic.text.mainC }}>
                                            Selected:
                                        </Text>
                                        <Text style={{ ...DetailCardStyles.selected, color: this.props.theme.dynamic.text.mainC }}>
                                            {this.props.date}
                                        </Text>
                                    </View>
                                    <View>
                                        {categories.map((key: string) => {
                                            let category = this.props.categories[this.props.categoryType][key];

                                            return (
                                                <View key={category.key} style={DetailCardStyles.cfDetailRow}>
                                                    <Category category={category} />
                                                    <View style={DetailCardStyles.priceBox}>
                                                        <Icon 
                                                            color={this.props.theme.dynamic.text.mainC}
                                                            name={this.props.settings.currency.icon}
                                                            size={20}
                                                        />
                                                        <Text style={{ ...DetailCardStyles.price, color: this.props.theme.dynamic.text.mainC }}>
                                                            {data[key]}
                                                        </Text>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                            }
                        </>
                    }
                </View>
            </CardBase>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType & AdditionalReduxType) => ({
    categories: state.categories,
    data: state.data,
    settings: state.settings,
    theme: state.theme,
});

export default connect(mapStateToProps)(Card);
