import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/headers/selector';
import SubHeader from '../components/headers/sub';

import { ScreenStyles } from './styles';

import { Categories, CategoryType } from '../types/data';
import { ReduxPropType } from '../types/redux';
import { ScreenProps } from '../types/ui';
import { defaultCategories } from '../data/default';

class Screen extends React.Component<ReduxPropType & ScreenProps> {

    state = {
        category: this.props.route.params.category || Categories.EXPENSE,
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    unsubscribe = this.props.navigation.addListener('focus', () => this.setState({ category: this.props.route.params.category || Categories.EXPENSE }));

    render() {
        let keylist: Array<string> = Object.keys((this.props.categories || defaultCategories)[this.state.category]);
        let favs: Array<CategoryType> = [];
        let others: Array<CategoryType> = [];

        keylist
            .map((key: string) => (this.props.categories || defaultCategories)[this.state.category][key])
            .forEach((category: CategoryType) => {
                if (category.fav)
                    favs.push(category);
                else
                    others.push(category);
            });


        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                <Header
                    name='categories'
                    navigation={this.props.navigation}
                    onPressRight={() => this.props.navigation.navigate('newCategory')}
                    onToggle={(category: Categories) => this.setState({ category })}
                    right='pen'
                    selected={this.state.category}
                />
                <SubHeader label='favourites' />
                <SubHeader label='other categories' />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    categories: state.categories,
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
