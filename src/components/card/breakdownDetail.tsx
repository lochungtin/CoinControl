import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Category from '../stats/category';
import Row from '../stats/row';
import CardBase from './base';

import { DetailCardStyles, GeneralCardStyles } from './styles';

import { Categories, CategoryStore, CategoryTallyType, DataStore } from '../../types/data';
import { ReduxThemeType } from '../../types/redux';

interface AdditionalReduxProps {
    categories: CategoryStore,
    data: DataStore,
}

interface DataProps {
    categoryType: Categories,
    categoryKey: string,
}

class Card extends React.Component<ReduxThemeType & DataProps & AdditionalReduxProps> {
    render() {
        let categoryStats: CategoryTallyType = this.props.data.stats.categories[this.props.categoryType].tally[this.props.categoryKey];

        return (
            <CardBase icon='card-text-outline' title='overall details'>
                <View style={GeneralCardStyles.mainContent}>
                    {this.props.categoryKey === '' || categoryStats === undefined ?
                        <Text style={{ ...GeneralCardStyles.nullPrompt, color: this.props.theme.dynamic.text.secondaryC }}>
                            Select a category from "breakdown" by clicking the donut slices or the category list to start using this card
                        </Text>
                        :
                        <View>
                            <View style={DetailCardStyles.topRow}>
                                <Text style={{ ...DetailCardStyles.selected, color: this.props.theme.dynamic.text.mainC }}>
                                    Selected:
                                </Text>
                                <Category category={this.props.categories[this.props.categoryType][this.props.categoryKey]} />
                            </View>
                            <Row label='Total:' value={categoryStats.amount} />
                            <Row
                                noCurrency
                                label='Entries:'
                                value={categoryStats.count}
                            />
                            <Row label='Average per Entry:' value={categoryStats.amount / categoryStats.count} />
                        </View>
                    }
                </View>
            </CardBase>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType & AdditionalReduxProps) => ({
    categories: state.categories,
    data: state.data,
    theme: state.theme,
});

export default connect(mapStateToProps)(Card);
