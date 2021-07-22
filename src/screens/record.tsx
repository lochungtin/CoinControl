import moment from 'moment';
import React from 'react';
import { ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Header from '../components/headers/selector';
import SubHeader from '../components/headers/sub';
import LItem from '../components/listitem';
import InputModal from '../components/modals/input';

import { ScreenStyles } from './styles';

import { Categories, CategoryStore, CategoryType, DataType } from '../types/data';
import { ReduxThemeType } from '../types/redux';
import { ScreenProps } from '../types/ui';
import { defaultCategories } from '../data/default';
import { keygen } from '../utils/keygen';
import { store } from '../redux/store';
import { dataAdd, displayAdd } from '../redux/action';

interface AdditionalReduxType {
    categories: CategoryStore,
}

class Screen extends React.Component<ReduxThemeType & ScreenProps & AdditionalReduxType> {

    state = {
        category: this.props.route.params?.category || Categories.EXPENSE,
        open: false,
        selected: defaultCategories[Categories.EXPENSE]['C0000000'],
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onConfirm = (obj: DataType) => {
        store.dispatch(dataAdd(obj));
        store.dispatch(displayAdd(obj));
        this.setState({ open: false });
        this.props.navigation.navigate('home');
    }

    unsubscribe = this.props.navigation.addListener('focus', () => this.setState({ category: this.props.route.params?.category || Categories.EXPENSE }));

    render() {
        let all: Array<CategoryType> = Object.keys((this.props.categories || defaultCategories)[this.state.category])
            .map((key: string) => (this.props.categories || defaultCategories)[this.state.category][key])
            .sort((a: CategoryType, b: CategoryType) => {
                if (a.key === 'C0000000')
                    return 1;
                else
                    return a.name.localeCompare(b.name);
            });

        let favs: Array<CategoryType> = all.filter((category: CategoryType) => category.fav);

        return (
            <>
                <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                    <Header
                        name='new record'
                        navigation={this.props.navigation}
                        onToggle={(category: Categories) => this.setState({ category, selected: defaultCategories[Categories.EXPENSE]['C0000000'] })}
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
                                        <Icon
                                            color={this.props.theme.static.icon.actionC}
                                            name='chevron-right'
                                            size={30}
                                        />
                                    </LItem>
                                );
                            })}
                            <SubHeader label='all categories' />
                            {all.map((category: CategoryType) => {
                                return (
                                    <LItem
                                        uppercase
                                        category={category}
                                        key={category.key}
                                        label={category.name}
                                        onPress={() => this.setState({ open: true, selected: category })}
                                    >
                                        <Icon
                                            color={this.props.theme.static.icon.actionC}
                                            name='chevron-right'
                                            size={30}
                                        />
                                    </LItem>
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
                <InputModal
                    onClose={() => this.setState({ open: false })}
                    onConfirm={this.onConfirm}
                    open={this.state.open}
                    record={{
                        categoryKey: this.state.selected.key,
                        categoryType: this.state.category,
                        date: moment().format('DD-MM-YYYY'),
                        key: keygen(),
                        title: '',
                        value: 0,
                    }}
                />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType & AdditionalReduxType) => ({
    categories: state.categories,
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
