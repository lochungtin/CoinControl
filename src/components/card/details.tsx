import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import CardBase from './base';

import { GeneralCardStyles } from './styles';

import { ReduxThemeType } from '../../types/redux';
import { CategoryStore, DataStore } from '../../types/data';

interface AdditionalReduxType {
    categories: CategoryStore,
    data: DataStore,
}

interface DataProps {
    categoryKey: string,
}

class Card extends React.Component<ReduxThemeType & DataProps> {
    render() {
        return (
            <CardBase icon='card-text-outline' title='details'>
                <View style={GeneralCardStyles.mainContent}>
                    {this.props.categoryKey === '' ?
                        <Text style={{ ...GeneralCardStyles.nullPrompt, color: this.props.theme.dynamic.text.secondaryC }}>
                            Select a category from "breakdown" to start using this card
                        </Text>
                        :
                        <View>
                        </View>
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
