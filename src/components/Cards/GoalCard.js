import React from 'react';
import { Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Card from './Card';
import ProgressCircle from '../Charts/ProgressCircle';

import { black, shade2, shade3, white, } from '../../data/color';
import { generalCardStyles, styles, } from '../../styles';

class GoalCard extends React.Component {

    color = () => this.props.settings.darkMode ? white : black;

    processValue = val => {
        const splt = val.toString().split('.');
        if (splt.length === 1)
            return val + '.00';
        if (splt[1].length === 1)
            return val + '0';
        else
            return splt[0] + '.' + splt[1].substring(0, 2);
    }


    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    trackColor = () => this.props.settings.darkMode ? shade3 : shade2;

    render() {
        console.log(this.props.data.goal)
        return (
            <Card icon={'flag-variant-outline'} title={'GOAL STATUS'}>
                <View style={{ ...styles.columns, justifyContent: 'space-around', marginBottom: 10, marginTop: 20, }}>
                    <ProgressCircle
                        dim={100}
                        progress={this.props.data.goal.percentage}
                        progressColor={this.props.settings.accent}
                        trackColor={this.trackColor()}
                        strokeWidth={5}
                    />
                    <View style={{ width: 190 }}>
                        {this.props.data.goalSettings.type === 'none' ?
                            <Text style={this.style(styles, 'text')}>
                                Add a goal to start using this card
                            </Text> :
                            <View style={{ ...styles.rows, alignItems: 'flex-start' }}>
                                <Text style={this.style(generalCardStyles, 'amountText')}>
                                    {Math.round(this.props.data.goal.percentage * 100) + '% Used'}
                                </Text>
                                <View style={{ height: 10 }} />
                                <Text style={this.style(styles, 'text')}>
                                    <Icon
                                        color={this.color()}
                                        name={'currency-' + this.props.settings.currency}
                                        size={13}
                                    />
                                    {this.processValue(this.props.data.goalSettings.amount - this.props.data.goal.remaining) + ' spent this ' + this.props.data.goalSettings.type}
                                </Text>
                                <Text style={this.style(styles, 'text')}>
                                    <Icon
                                        color={this.color()}
                                        name={'currency-' + this.props.settings.currency}
                                        size={13}
                                    />
                                    {this.processValue(this.props.data.goal.remaining) + ' remaining'}
                                </Text>
                            </View>
                        }
                    </View>
                </View>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data,
    settings: state.settings,
});

export default connect(mapStateToProps)(GoalCard);