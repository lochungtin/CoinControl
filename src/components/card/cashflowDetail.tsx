import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Category from '../stats/category';
import Row from '../stats/row';
import CardBase from './base';

import { DetailCardStyles, GeneralCardStyles } from './styles';

import { Categories, CategoryStore, CategoryTallyType, DataStore, DataType } from '../../types/data';
import { ReduxThemeType } from '../../types/redux';

interface AdditionalReduxType {
    categories: CategoryStore,
    data: DataStore,
}

interface DataProps {
    categoryType: Categories,
    categoryKey: string,
    colorList: Array<string>,
    date: string,
    dataList: Array<{ [key: string]: any }>,
    keyList: Array<string>,
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
    theme: state.theme,
});

export default connect(mapStateToProps)(Card);
