import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Header from '../components/headers/selector';
import SubHeader from '../components/headers/sub';
import LItem from '../components/listitem';
import CategoryModal from '../components/modals/category';
import PromptModal from '../components/modals/prompt';

import { ScreenStyles, CategoryScreenStyles } from './styles';

import { defaultCategories } from '../data/default';
import { deleteCategory, editCategory, setPromptShow } from '../redux/action';
import { store } from '../redux/store';
import { Categories, CategoryType } from '../types/data';
import { ReduxPropType } from '../types/redux';
import { ScreenProps } from '../types/ui';
import { Prompt } from '../data/prompts';

class Screen extends React.Component<ReduxPropType & ScreenProps> {

    state = {
        category: this.props.route.params?.category || Categories.EXPENSE,
        cmOpen: false,
        pmOpen: null,
        selected: defaultCategories[Categories.EXPENSE]['C0000000'],
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    controllers = (category: CategoryType) =>
        <View style={CategoryScreenStyles.controller}>
            <TouchableOpacity onPress={() => this.toggleFav(category)}>
                <Icon
                    color={this.props.theme.static.accentC}
                    name={category.fav ? 'heart' : 'heart-outline'}
                    size={30}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.deleteCategory(category)}>
                <Icon
                    color={this.props.theme.static.icon.actionC}
                    name={'trash-can'}
                    size={30}
                />
            </TouchableOpacity>
        </View>

    confirmDelete = (category: CategoryType | null, show: boolean) => {
        if (category !== null)
            store.dispatch(deleteCategory({
                category: this.state.category,
                key: category.key,
            }));
        store.dispatch(setPromptShow({ prompt: Prompt.DELETE_CATEGORY, show }));
        this.setState({ pmOpen: null });
    }

    deleteCategory = (category: CategoryType) => {
        if (this.props.settings?.promptTrigger[Prompt.DELETE_CATEGORY])
            this.setState({ pmOpen: category });
        else
            this.confirmDelete(category, false);
    }

    editCategory = (category: CategoryType) => {
        store.dispatch(editCategory({
            category: this.state.category,
            data: category,
            key: category.key,
        }));
        this.setState({ open: false });
    }

    toggleFav = (category: CategoryType) => {
        category.fav = !category.fav;
        store.dispatch(editCategory({
            category: this.state.category,
            data: category,
            key: category.key,
        }));
    }

    unsubscribe = this.props.navigation.addListener('focus', () => this.setState({ category: this.props.route.params?.category || Categories.EXPENSE }));

    render() {
        let favs: Array<CategoryType> = [];
        let others: Array<CategoryType> = [];

        Object.keys((this.props.categories || defaultCategories)[this.state.category])
            .map((key: string) => (this.props.categories || defaultCategories)[this.state.category][key])
            .sort((a: CategoryType, b: CategoryType) => {
                if (a.key === 'C0000000')
                    return 1;
                else
                    return a.name.localeCompare(b.name);
            })
            .forEach((category: CategoryType) => {
                if (category.fav)
                    favs.push(category);
                else
                    others.push(category);
            });


        return (
            <>
                <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                    <Header
                        name='categories'
                        navigation={this.props.navigation}
                        onPressRight={() => this.props.navigation.navigate('newCategory', this.state.category)}
                        onToggle={(category: Categories) => this.setState({ category })}
                        right='tag-plus'
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
                                        onPress={() => this.setState({ open: true, selected: category })}
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
                                        onPress={() => this.setState({ open: true, selected: category })}
                                    >
                                        {category.key === 'C0000000' ? <View style={CategoryScreenStyles.controller} /> : this.controllers(category)}
                                    </LItem>
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
                <CategoryModal
                    category={this.state.selected}
                    onClose={() => this.setState({ cmOpen: false })}
                    onConfirm={this.editCategory}
                    open={this.state.cmOpen}
                />
                <PromptModal
                    onClose={() => this.setState({ pmOpen: null })}
                    onConfirm={(dnsa: boolean) => this.confirmDelete(this.state.pmOpen, !dnsa)}
                    open={this.state.pmOpen !== null}
                    prompt={Prompt.DELETE_CATEGORY}
                />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    categories: state.categories,
    settings: state.settings,
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
