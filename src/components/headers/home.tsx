import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import GoalModal from '../../components/modals/goal';
import PGBar from '../progressbar';

import { GeneralHeaderStyles, HomeHeaderStyles } from './styles';

import { defaultData, defaultSettings } from '../../data/default';
import { goals } from '../../data/goal';
import { setGoal } from '../../redux/action';
import { store } from '../../redux/store';
import { CategoryType, GoalConfigType } from '../../types/data';
import { ReduxPropType } from '../../types/redux';
import { ScreenProps } from '../../types/ui';

interface DataProps {
    onFilterDate: (date: string) => void,
    onFilterCategory: (category: CategoryType) => void,
    onPressSync: () => void,
}

class Header extends React.Component<ReduxPropType & ScreenProps & DataProps> {

    state = {
        gmOpen: false,
        dpOpen: false,
    }

    onConfirmGoal = (config: GoalConfigType) => {
        if (config.type.key === 'goalN')
            config.max = 0;

        store.dispatch(setGoal(config));
        this.setState({ gmOpen: false });
    }

    render() {
        let splt: Array<string> = (this.props.data || defaultData).stats.balance.toString().split('.') || ['0'];

        let balance: string = splt[0] || '420';
        let decimal: string = ((splt[1] || '00') + '00').slice(0, 2);

        let goalPrompt: string = (this.props.data || defaultData).stats.goal.left.toString();

        if (this.props.data?.stats.goal.config.type.key === 'goalN')
            goalPrompt = goals['goalN'].text;
        else
            goalPrompt += ' ' + goals[this.props.data?.stats.goal.config.type.key || 'goalD'].text;

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
                                    progress={0.75}
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
                        <View style={HomeHeaderStyles.right}>
                            <View style={HomeHeaderStyles.controller}>
                                <TouchableOpacity>
                                    <Icon
                                        color={this.props.theme.static.accentC}
                                        name='tag-heart-outline'
                                        size={25}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon
                                        color={this.props.theme.static.accentC}
                                        name='calendar-month'
                                        size={25}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <GoalModal
                    onClose={() => this.setState({ gmOpen: false })}
                    onConfirm={this.onConfirmGoal}
                    open={this.state.gmOpen}
                    config={(this.props.data || defaultData)?.stats.goal.config}
                />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    data: state.data,
    goal: state.goal,
    settings: state.settings,
    theme: state.theme,
});

export default connect(mapStateToProps)(Header);
