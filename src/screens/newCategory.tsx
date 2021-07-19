import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Header from '../components/headers/selector';
import SubHeader from '../components/headers/sub';
import CategoryModal from '../components/modals/category';

import { NewCatScreenStyles, ScreenStyles } from './styles';

import { pickRandom } from '../data/color';
import { defaultCategories } from '../data/default';
import { icons } from '../data/icons';
import { Categories, CategoryType, IconSection } from '../types/data';
import { addCategory } from '../redux/action';
import { store } from '../redux/store';
import { ReduxPropType } from '../types/redux';
import { ScreenProps } from '../types/ui';
import { keygen, smallKeygen } from '../utils/keygen';

class Screen extends React.Component<ReduxPropType & ScreenProps> {

    state = {
        category: this.props.route.params,
        open: false,
        selected: defaultCategories[Categories.EXPENSE]['C0000000'],
    }

    editCategory = (category: CategoryType) => {
        store.dispatch(addCategory({
            category: this.state.category,
            data: category,
            key: category.key,
        }));
        this.setState({ open: false });
    }

    selectIcon = (name: string) => {
        let key: string = keygen();
        let color: string = pickRandom();
        this.setState({
            open: true,
            selected: {
                color,
                key,
                fav: false,
                icon: name,
                name: '',
            },
        });
    }

    render() {
        return (
            <>
                <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                    <Header
                        backMode
                        name='new categories'
                        navigation={this.props.navigation}
                        onToggle={(category: Categories) => this.setState({ category })}
                        selected={this.state.category}
                    />
                    <SubHeader label='select an icon' />
                    <ScrollView>
                        <View style={ScreenStyles.scrollView}>
                            {icons.map((section: IconSection) => {
                                return (
                                    <View key={smallKeygen()}>
                                        <SubHeader highlight label={section.header} />
                                        {section.data.map((row: Array<string | null>) => {
                                            return (
                                                <View key={smallKeygen()} style={NewCatScreenStyles.row}>
                                                    {row.map((elem: string | null) => {
                                                        if (elem === null)
                                                            return <View key={smallKeygen()} style={{ width: 50 }} />

                                                        return (
                                                            <TouchableOpacity key={smallKeygen()} onPress={() => this.selectIcon(elem)}>
                                                                <Icon
                                                                    color={this.props.theme.dynamic.text.mainC}
                                                                    name={elem}
                                                                    size={50}
                                                                />
                                                            </TouchableOpacity>
                                                        );
                                                    })}
                                                </View>
                                            );
                                        })}
                                    </View>
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
                <CategoryModal
                    category={this.state.selected}
                    onClose={() => this.setState({ open: false })}
                    onConfirm={this.editCategory}
                    open={this.state.open}
                />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
