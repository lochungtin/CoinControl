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
import { Prompt } from '../data/prompts';
import { firebaseDeleteCategory, firebaseUpdateCategory } from '../firebase/data';
import { categoryDelete, categoryEdit, dataSetCatsToOther, settingsSetPromptShow } from '../redux/action';
import { store } from '../redux/store';
import { AccountType, Categories, CategoryStore, CategoryType, DataStore, DataType, SettingsType } from '../types/data';
import { ReduxThemeType } from '../types/redux';
import { ScreenProps } from '../types/ui';

interface AdditionalReduxProps {
    account: AccountType,
    data: DataStore,
    categories: CategoryStore,
    settings: SettingsType,
}

class Screen extends React.Component<ReduxThemeType & ScreenProps & AdditionalReduxProps> {

    state = {
        category: defaultCategories[Categories.EXPENSE]['C0000000'],
        categoryType: this.props.route.params?.category || Categories.EXPENSE,
        cmOpen: false,
        pmOpen: null,
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => this.setState({
            category: defaultCategories[Categories.EXPENSE]['C0000000'],
            categoryType: this.props.route.params?.category || Categories.EXPENSE,
        }));
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
            <TouchableOpacity onPress={() => this.categoryDelete(category)}>
                <Icon
                    color={this.props.theme.static.icon.actionC}
                    name={'trash-can'}
                    size={30}
                />
            </TouchableOpacity>
        </View>

    confirmDelete = (category: CategoryType | null, show: boolean) => {
        if (category !== null) {
            let toDelete: Array<string> = [];

            Object.keys(this.props.data.data).forEach((key: string) => {
                let record: DataType = this.props.data.data[key];
                if (record.categoryKey === category.key)
                    toDelete.push(record.key);
            });

            store.dispatch(categoryDelete({ key: category.key, type: this.state.categoryType }));
            store.dispatch(dataSetCatsToOther(toDelete));

            if (this.props.account)
                firebaseDeleteCategory(this.props.account.uid, this.state.categoryType, category.key, toDelete);
        }
        store.dispatch(settingsSetPromptShow({ show, prompt: Prompt.DELETE_CATEGORY }));
        this.setState({ pmOpen: null });
    }

    categoryDelete = (category: CategoryType) => {
        if (this.props.settings?.promptTrigger[Prompt.DELETE_CATEGORY])
            this.setState({ pmOpen: category });
        else
            this.confirmDelete(category, false);
    }

    categoryEdit = (category: CategoryType) => {
        store.dispatch(categoryEdit({ category, type: this.state.categoryType }));

        if (this.props.account)
            firebaseUpdateCategory(this.props.account.uid, this.state.categoryType, category);

        this.setState({ cmOpen: false });
    }

    toggleFav = (category: CategoryType) => {
        category.fav = !category.fav;
        store.dispatch(categoryEdit({ category, type: this.state.categoryType }));
    }

    render() {
        let favs: Array<CategoryType> = [];
        let others: Array<CategoryType> = [];

        Object.keys((this.props.categories)[this.state.categoryType])
            .map((key: string) => (this.props.categories)[this.state.categoryType][key])
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
                        onPressRight={() => this.props.navigation.navigate('newCategory', this.state.categoryType)}
                        onToggle={(categoryType: Categories) => this.setState({ categoryType })}
                        right='tag-plus'
                        selected={this.state.categoryType}
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
                                        onPress={() => this.setState({ category, cmOpen: true })}
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
                                        onPress={() => this.setState({ category, cmOpen: true })}
                                    >
                                        {category.key === 'C0000000' ? <View style={CategoryScreenStyles.controller} /> : this.controllers(category)}
                                    </LItem>
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
                <CategoryModal
                    category={this.state.category}
                    onClose={() => this.setState({ cmOpen: false })}
                    onConfirm={this.categoryEdit}
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

const mapStateToProps = (state: ReduxThemeType & AdditionalReduxProps) => ({
    account: state.account,
    data: state.data,
    categories: state.categories,
    settings: state.settings,
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
