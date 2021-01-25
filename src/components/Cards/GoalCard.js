import React from 'react';
import { Text, View, } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Card from './Card';

import { generalCardStyles, styles } from '../../styles';
import { black, shade2, shade3, white, } from '../../data/color';

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
        return (
            <Card icon={'flag-variant-outline'} title={'GOAL STATUS'}>
                <View style={{ height: 175, marginTop: 20 }}>
                    <ProgressCircle
                        backgroundColor={this.trackColor()}
                        progress={this.props.data.goal.percentage}
                        progressColor={this.props.settings.accent}
                        style={{ height: 175 }}
                    >
                        <View style={generalCardStyles.centerLabel}>
                            {this.props.data.goalSettings.type === 'none' ?
                                <Text style={this.style(styles, 'text')}>
                                    Add goal to start using this card.
                                </Text> :
                                <View>
                                    <Text style={this.style(generalCardStyles, 'amountText')}>
                                        {Math.round(this.props.data.goal.percentage * 100) + '%'}
                                    </Text>
                                    <Text style={this.style(styles, 'centerText')}>
                                        <Icon name={'currency-' + this.props.settings.currency} color={this.color()} size={13} />
                                        {this.processValue(this.props.data.goalSettings.amount - this.props.data.goal.remaining) + ' spent'}
                                    </Text>
                                    <Text style={this.style(styles, 'centerText')}>
                                        {'this ' + this.props.data.goalSettings.type}
                                    </Text>
                                </View>
                            }
                        </View>
                    </ProgressCircle>
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