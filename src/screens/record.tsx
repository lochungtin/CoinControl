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

import { defaultCategories } from '../data/default';
import { firebaseUpdateRecord } from '../firebase/data';
import { AccountType, Categories, CategoryStore, CategoryType, DataType } from '../types/data';
import { ReduxThemeType } from '../types/redux';
import { ScreenProps } from '../types/ui';
import { dataAdd, displayAdd } from '../redux/action';
import { store } from '../redux/store';
import { keygen } from '../utils/keygen';

interface AdditionalReduxProps {
    account: AccountType,
    categories: CategoryStore,
}

class Screen extends React.Component<ReduxThemeType & ScreenProps & AdditionalReduxProps> {

    state = {
        category: defaultCategories[Categories.EXPENSE]['C0000000'],
        categoryType: this.props.route.params?.category || Categories.EXPENSE,
        open: false,
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => this.setState({ 
            category: defaultCategories[Categories.EXPENSE]['C0000000'],
            categoryType: this.props.route.params?.category || Categories.EXPENSE 
        }));
    }

    onConfirm = (obj: DataType) => {
        store.dispatch(dataAdd(obj));
        store.dispatch(displayAdd(obj));

        if (this.props.account)
            firebaseUpdateRecord(this.props.account.uid, obj);

        this.setState({ open: false });
        this.props.navigation.navigate('home');
    }

    render() {
        let all: Array<CategoryType> = Object.keys((this.props.categories)[this.state.categoryType])
            .map((key: string) => (this.props.categories)[this.state.categoryType][key])
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
                        onToggle={(categoryType: Categories) => this.setState({ categoryType, category: defaultCategories[Categories.EXPENSE]['C0000000'] })}
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
                                        onPress={() => this.setState({ open: true, category })}
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
                                        onPress={() => this.setState({ open: true, category: category })}
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
                        categoryKey: this.state.category.key,
                        categoryType: this.state.categoryType,
                        date: moment().format('DD-MM-YYYY'),
                        key: keygen(),
                        lmt: '',
                        title: '',
                        value: 0,
                    }}
                />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType & AdditionalReduxProps) => ({
    account: state.account,
    categories: state.categories,
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
