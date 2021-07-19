import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Header from '../components/headers/selector';
import SubHeader from '../components/headers/sub';
import LItem from '../components/listitem';

import { ScreenStyles, CategoryScreenStyles } from './styles';

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

    controllers = (category: CategoryType) =>
        <View style={CategoryScreenStyles.controller}>
            <TouchableOpacity>
                <Icon
                    color={this.props.theme.static.accentC}
                    name={category.fav ? 'heart' : 'heart-outline'}
                    size={30}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon
                    color={this.props.theme.static.icon.actionC}
                    name={'dots-vertical'}
                    size={30}
                />
            </TouchableOpacity>
        </View>

    unsubscribe = this.props.navigation.addListener('focus', () => this.setState({ category: this.props.route.params.category || Categories.EXPENSE }));

    render() {
        let favs: Array<CategoryType> = [];
        let others: Array<CategoryType> = [];

        Object.keys((this.props.categories || defaultCategories)[this.state.category])
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
                <ScrollView>
                    <View style={ScreenStyles.scrollView}>
                        <SubHeader label='favourites' />
                        {favs.map((category: CategoryType) => {
                            return (
                                <LItem
                                    uppercase
                                    category={category}
                                    key={category.key}
                                    label={category.name}
                                >
                                    {this.controllers(category)}
                                </LItem>
                            );
                        })}
                        <SubHeader label='other categories' />
                        {others.map((category: CategoryType) => {
                            return (
                                <LItem
                                    uppercase
                                    category={category}
                                    key={category.key}
                                    label={category.name}
                                >
                                    {category.key === 'C0000000' ? <View style={CategoryScreenStyles.controller} /> : this.controllers(category)}
                                </LItem>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    categories: state.categories,
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
