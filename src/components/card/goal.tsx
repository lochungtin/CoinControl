import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import PGBar from '../progressbar';
import CardBase from './base';

import { GeneralCardStyles, GoalCardStyles } from './styles';

import { ReduxThemeType } from '../../types/redux';
import { CategoryStore, DataStore, SettingsType } from '../../types/data';
import { Goal, goals } from '../../data/goal';

interface AdditionalReduxType {
    categories: CategoryStore,
    data: DataStore,
    settings: SettingsType,
}

class Card extends React.Component<ReduxThemeType & AdditionalReduxType> {
    render() {
        let progress: number = this.props.data.stats.goal.left / this.props.data.stats.goal.config.max;
        if (this.props.data.stats.goal.used > this.props.data.stats.goal.config.max)
            progress = 0;

        return (
            <CardBase icon='shield-outline' title='goal status'>
                <View style={GeneralCardStyles.content}>
                    {this.props.data.stats.goal.config.type === Goal.NONE ?
                        <Text style={{ color: this.props.theme.dynamic.text.secondaryC }}>
                            Set a goal to start using this card
                        </Text>
                        :
                        <View>
                            <View style={GoalCardStyles.topRow}>
                                <Text style={{ ...GoalCardStyles.text, color: this.props.theme.dynamic.text.mainC }}>
                                    {`Goal Type: `}
                                    <Text style={{ ...GoalCardStyles.typeText, color: this.props.theme.static.accentC }}>
                                        {goals[this.props.data.stats.goal.config.type].name.toUpperCase()}
                                    </Text>
                                </Text>
                            </View>
                            <View style={GoalCardStyles.pgbarBox}>
                                <PGBar
                                    height={20}
                                    progress={progress}
                                    width={0.6}
                                />
                                <Text style={{ ...GoalCardStyles.text, color: this.props.theme.dynamic.text.mainC }}>
                                    {`${(progress * 100).toFixed(2)}%`}
                                </Text>
                            </View>
                            <View style={{ ...GoalCardStyles.textRow, borderBottomColor: this.props.theme.dynamic.screen.bgC }}>
                                <Icon
                                    color={this.props.theme.static.accentC}
                                    name='chevron-right'
                                    size={30}
                                />
                                <View style={GoalCardStyles.textBox}>
                                    <Icon
                                        color={this.props.theme.dynamic.text.mainC}
                                        name={this.props.settings.currency.icon}
                                        size={20}
                                    />
                                    <Text style={{ ...GoalCardStyles.text, color: this.props.theme.dynamic.text.mainC }}>
                                        {`${this.props.data.stats.goal.config.max.toFixed(2)} set limit`}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ ...GoalCardStyles.textRow, borderBottomColor: this.props.theme.dynamic.screen.bgC }}>
                                <Icon
                                    color={this.props.theme.static.accentC}
                                    name='chevron-right'
                                    size={30}
                                />
                                <View style={GoalCardStyles.textBox}>
                                    <Icon
                                        color={this.props.theme.dynamic.text.mainC}
                                        name={this.props.settings.currency.icon}
                                        size={20}
                                    />
                                    <Text style={{ ...GoalCardStyles.text, color: this.props.theme.dynamic.text.mainC }}>
                                        {`${this.props.data.stats.goal.left.toFixed(2)} remaining`}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ ...GoalCardStyles.textRow, borderBottomColor: this.props.theme.dynamic.screen.bgC }}>
                                <Icon
                                    color={this.props.theme.static.accentC}
                                    name='chevron-right'
                                    size={30}
                                />
                                <View style={GoalCardStyles.textBox}>
                                    <Icon
                                        color={this.props.theme.dynamic.text.mainC}
                                        name={this.props.settings.currency.icon}
                                        size={20}
                                    />
                                    <Text style={{ ...GoalCardStyles.text, color: this.props.theme.dynamic.text.mainC }}>
                                        {`${this.props.data.stats.goal.used.toFixed(2)} used so far`}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    }
                </View>
            </CardBase>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType & AdditionalReduxType) => ({
    categories: state.categories,
    data: state.data,
    settings: state.settings,
    theme: state.theme,
});

export default connect(mapStateToProps)(Card);
