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

class Card extends React.Component<ReduxThemeType> {
    render() {
        return (
            <CardBase icon='card-text-outline' title='details'>
                <View>

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
