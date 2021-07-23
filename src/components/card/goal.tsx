import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import PGBar from '../progressbar';
import Row from '../stats/row';
import CardBase from './base';

import { GeneralCardStyles, GoalCardStyles } from './styles';

import { Goal, goals } from '../../data/goal';
import { ReduxThemeType } from '../../types/redux';
import { CategoryStore, DataStore, SettingsType } from '../../types/data';

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
                <View style={GeneralCardStyles.mainContent}>
                    {this.props.data.stats.goal.config.type === Goal.NONE ?
                        <Text style={{ ...GeneralCardStyles.nullPrompt, color: this.props.theme.dynamic.text.secondaryC }}>
                            Set a goal to start using this card
                        </Text>
                        :
                        <View>
                            <View style={GoalCardStyles.topRow}>
                                <Text style={{ ...GoalCardStyles.text, color: this.props.theme.dynamic.text.mainC }}>
                                    Goal Type:
                                </Text>
                                <Text style={{ ...GoalCardStyles.typeText, color: this.props.theme.static.accentC }}>
                                    {goals[this.props.data.stats.goal.config.type].name.toUpperCase()}
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
                            <Row label='Set Limit:' value={this.props.data.stats.goal.config.max} />
                            <Row label='Remaining:' value={this.props.data.stats.goal.left} />
                            <Row label='Used:' value={this.props.data.stats.goal.used} />
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
