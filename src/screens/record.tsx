import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/headers/selector';
import SubHeader from '../components/headers/sub';
import LItem from '../components/listitem';
import InputModal from '../components/modals/input';

import { ScreenStyles } from './styles';

import { Categories, CategoryType, IconSection } from '../types/data';
import { ReduxPropType } from '../types/redux';
import { ScreenProps } from '../types/ui';
import { defaultCategories } from '../data/default';

class Screen extends React.Component<ReduxPropType & ScreenProps> {

    state = {
        category: this.props.route.params?.category || Categories.EXPENSE,
    }

    componentWillUnmount() {
        this.unsubscribe();
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
                        onToggle={(category: Categories) => this.setState({ category })}
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
                                        {<View />}
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
                                        {<View />}
                                    </LItem>
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
            </>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    categories: state.categories,
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
