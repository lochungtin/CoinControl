import moment from 'moment';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import GoalModal from '../modals/goal';
import DatePicker from '../pickers/date';
import PGBar from '../progressbar';

import { GeneralHeaderStyles, HomeHeaderStyles } from './styles';

import { defaultData, defaultSettings } from '../../data/default';
import { Goal, goalExceededText, goals } from '../../data/goal';
import { dataSetGoal } from '../../redux/action';
import { store } from '../../redux/store';
import { DataStore, GoalConfigType } from '../../types/data';
import { ReduxPropType } from '../../types/redux';
import { ScreenProps } from '../../types/ui';

interface DataProps {
    onFilterDate: (date: string) => void,
    onPressSync: () => void,
    toggleDeleting: (deleteMode: boolean) => void,
}

class Header extends React.Component<ReduxPropType & ScreenProps & DataProps> {

    state = {
        deleting: false,
        dateFiltering: false,
        dpOpen: false,
        gmOpen: false,
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onConfirmGoal = (config: GoalConfigType) => {
        store.dispatch(dataSetGoal(config));
        this.setState({ gmOpen: false });
    }

    onFilterDate = (date: string) => {
        this.props.onFilterDate(date);
        this.setState({ dateFiltering: true, dpOpen: false, });
    }

    toggleDateFilter = () => {
        if (this.state.dateFiltering) {
            this.props.onFilterDate('');
            this.setState({ dateFiltering: false });
        }
        else
            this.setState({ dpOpen: true });
    }

    toggleDeleteMode = () => {
        this.props.toggleDeleting(!this.state.deleting);
        this.setState({ deleting: !this.state.deleting });
    }

    unsubscribe = () => this.props.navigation.addListener('focus', () => this.setState({ categoriesFiltering: [] }))

    render() {
        let data: DataStore = this.props.data || defaultData;

        let splt: Array<string> = data.stats.balance.toString().split('.') || ['0'];

        let balance: string = splt[0] || '420';
        let decimal: string = ((splt[1] || '00') + '00').slice(0, 2);

        let progress: number = data.stats.goal.left / data.stats.goal.config.max;
        if (data.stats.goal.used > data.stats.goal.config.max)
            progress = 0;

        let goalPrompt: string = data.stats.goal.left.toFixed(2).toString();

        if (data.stats.goal.left < 0)
            goalPrompt = goalExceededText;
        else if (this.props.data?.stats.goal.config.type === Goal.NONE)
            goalPrompt = goals[Goal.NONE].text;
        else
            goalPrompt += ' ' + goals[data.stats.goal.config.type].text;

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
                                    progress={progress}
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
                        onPress={this.toggleDateFilter}
                        style={{
                            ...HomeHeaderStyles.controller,
                            backgroundColor: this.state.dateFiltering ?
                                this.props.theme.static.accentC :
                                this.props.theme.dynamic.text.mainC,
                        }}
                    >
                        <Icon
                            color={this.state.dateFiltering ? this.props.theme.dynamic.text.mainC : this.props.theme.static.accentC}
                            name='calendar-month'
                            size={20}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.toggleDeleteMode}
                        style={{
                            ...HomeHeaderStyles.controller,
                            backgroundColor: this.state.deleting ?
                                this.props.theme.static.accentC :
                                this.props.theme.dynamic.text.mainC
                        }}
                    >
                        <Icon
                            color={this.state.deleting ? this.props.theme.dynamic.text.mainC : this.props.theme.static.accentC}
                            name='trash-can'
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
            </>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    data: state.data,
    categories: state.categories,
    settings: state.settings,
    theme: state.theme,
});

export default connect(mapStateToProps)(Header);
