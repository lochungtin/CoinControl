import moment from 'moment';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import GoalModal from '../modals/goal';
import DatePicker from '../pickers/date';
import MultiPicker from '../pickers/multi';
import PGBar from '../progressbar';

import { GeneralHeaderStyles, HomeHeaderStyles } from './styles';
import { WHITE } from '../../data/color';

import { defaultCategories, defaultData, defaultSettings } from '../../data/default';
import { goals } from '../../data/goal';
import { setGoal } from '../../redux/action';
import { store } from '../../redux/store';
import { Categories, CategoryStore, CategoryType, DataStore, GoalConfigType } from '../../types/data';
import { ReduxPropType } from '../../types/redux';
import { ScreenProps } from '../../types/ui';

interface DataProps {
    onFilterDate: (date: string) => void,
    onFilterCategory: (category: CategoryType | undefined) => void,
    onPressSync: () => void,
}

class Header extends React.Component<ReduxPropType & ScreenProps & DataProps> {

    state = {
        categoriesFiltering: [],
        dateFiltering: false,
        dpOpen: false,
        gmOpen: false,
        mpOpen: false,
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onConfirmGoal = (config: GoalConfigType) => {
        if (config.type.key === 'goalN')
            config.max = 0;

        store.dispatch(setGoal(config));
        this.setState({ gmOpen: false });
    }

    onFilterDate = (date: string) => {
        this.props.onFilterDate(date);
        this.setState({ dateFiltering: true, dpOpen: false, });
    }

    toggleCategoryFilter = () => {
        if (this.state.categoriesFiltering) {
            this.props.onFilterCategory(undefined);
            this.setState({ categoriesFiltering: false });
        }
        else
            this.setState({ mpOpen: true });
    }

    toggleDateFilter = () => {
        if (this.state.dateFiltering) {
            this.props.onFilterDate('');
            this.setState({ dateFiltering: false });
        }
        else
            this.setState({ dpOpen: true });
    }

    unsubscribe = () => this.props.navigation.addListener('focus', () => this.setState({ categoriesFiltering: [] }))

    render() {
        let data: DataStore = (this.props.data || defaultData);
        let allCategories: CategoryStore = (this.props.categories || defaultCategories);

        let splt: Array<string> = data.stats.balance.toString().split('.') || ['0'];

        let balance: string = splt[0] || '420';
        let decimal: string = ((splt[1] || '00') + '00').slice(0, 2);

        let goalPrompt: string = data.stats.goal.left.toString();

        if (this.props.data?.stats.goal.config.type.key === 'goalN')
            goalPrompt = goals['goalN'].text;
        else
            goalPrompt += ' ' + goals[this.props.data?.stats.goal.config.type.key || 'goalD'].text;

        let categories: Array<CategoryType> = [
            ...Object.keys(data.stats.expense).map((key: string) => allCategories[Categories.EXPENSE][key]),
            ...Object.keys(data.stats.income).map((key: string) => allCategories[Categories.INCOME][key]),
        ];

        return (
            <>
                <View style={{ ...GeneralHeaderStyles.root, backgroundColor: this.props.theme.dynamic.screen.secondaryBgC }}>
                    <StatusBar backgroundColor={this.props.theme.dynamic.screen.secondaryBgC} />
                    <View style={HomeHeaderStyles.contentPositioner}>
                        <TouchableOpacity onPress={this.props.navigation.toggleDrawer}>
                            <Icon
                                color={this.props.theme.static.icon.drawerC}
                                name='menu-open'
                                size={40}
                            />
                        </TouchableOpacity>
                        <View style={HomeHeaderStyles.content}>
                            <View style={HomeHeaderStyles.balanceRow}>
                                <Icon
                                    color={this.props.theme.dynamic.text.mainC}
                                    name={(this.props.settings || defaultSettings).currency.icon}
                                    size={36}
                                />
                                <Text style={{ ...HomeHeaderStyles.balance, color: this.props.theme.dynamic.text.mainC }}>
                                    {balance}
                                </Text>
                                <Text style={{ ...HomeHeaderStyles.decimal, color: this.props.theme.dynamic.text.mainC }}>
                                    {'.' + decimal}
                                </Text>
                            </View>
                            <Text style={{ ...HomeHeaderStyles.goal, color: this.props.theme.dynamic.text.labelC }}>
                                {goalPrompt}
                            </Text>
                            <View style={HomeHeaderStyles.pgbar}>
                                <PGBar
                                    height={5}
                                    progress={data.stats.goal.left / data.stats.goal.config.max}
                                    width={0.45}
                                />
                            </View>
                            <View style={HomeHeaderStyles.actionBtnRow}>
                                <TouchableOpacity onPress={() => this.setState({ gmOpen: true })} style={{ ...HomeHeaderStyles.actionBtn, backgroundColor: this.props.theme.static.icon.homeC }}>
                                    <Icon
                                        color={this.props.theme.static.accentC}
                                        name='trophy-outline'
                                        size={25}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('record')} style={{ ...HomeHeaderStyles.actionBtn, backgroundColor: this.props.theme.static.icon.homeC }}>
                                    <Icon
                                        color={this.props.theme.static.accentC}
                                        name='plus'
                                        size={25}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.props.onPressSync} style={{ ...HomeHeaderStyles.actionBtn, backgroundColor: this.props.theme.static.icon.homeC }}>
                                    <Icon
                                        color={this.props.theme.static.accentC}
                                        name='restart'
                                        size={25}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Icon
                            color={'transparent'}
                            name='menu-open'
                            size={40}
                        />
                    </View>
                </View>
                <View style={HomeHeaderStyles.controllerBox}>
                    <TouchableOpacity
                        style={{
                            ...HomeHeaderStyles.controller,
                            backgroundColor: this.state.categoriesFiltering ?
                                this.props.theme.static.accentC :
                                this.props.theme.dynamic.text.mainC
                        }}
                        onPress={this.toggleCategoryFilter}
                    >
                        <Icon
                            color={this.state.categoriesFiltering ? this.props.theme.dynamic.text.mainC : this.props.theme.static.accentC}
                            name='tag-heart-outline'
                            size={20}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            ...HomeHeaderStyles.controller,
                            backgroundColor: this.state.dateFiltering ?
                                this.props.theme.static.accentC :
                                this.props.theme.dynamic.text.mainC
                        }}
                        onPress={this.toggleDateFilter}
                    >
                        <Icon
                            color={this.state.dateFiltering ? this.props.theme.dynamic.text.mainC : this.props.theme.static.accentC}
                            name='calendar-month'
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                <GoalModal
                    onClose={() => this.setState({ gmOpen: false })}
                    onConfirm={this.onConfirmGoal}
                    open={this.state.gmOpen}
                    config={(this.props.data || defaultData)?.stats.goal.config}
                />
                <DatePicker
                    onClose={() => this.setState({ dpOpen: false })}
                    onSelect={this.onFilterDate}
                    open={this.state.dpOpen}
                    selected={moment().format('DD-MM-YYYY')}
                />
                <MultiPicker
                    items={categories}
                    onClose={() => this.setState({ mpOpen: false })}
                    onSelect={this.onConfirmGoal}
                    open={this.state.mpOpen}
                    render={(category: CategoryType) => {
                        return (
                            <View key={category.key} style={HomeHeaderStyles.category}>
                                <View style={{ ...HomeHeaderStyles.icon, backgroundColor: category.color }}>
                                    <Icon
                                        color={WHITE}
                                        name={category.icon}
                                        size={25}
                                    />
                                </View>
                                <Text style={{ ...HomeHeaderStyles.label, color: this.props.theme.dynamic.text.mainC }}>
                                    {category.name.toUpperCase()}
                                </Text>
                            </View>
                        );
                    }}
                    selectedIndices={this.state.categoriesFiltering}
                />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    data: state.data,
    categories: state.categories,
    goal: state.goal,
    settings: state.settings,
    theme: state.theme,
});

export default connect(mapStateToProps)(Header);
