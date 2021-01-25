import React from 'react';
import { Text, View, } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Card from './Card';

import { generalCardStyles, styles } from '../../styles';
import { black, shade2, shade3, white, } from '../../data/color';

class GoalCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
        }
    }

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
            <Card icon={'flag-variant-outline'} title={'GOAL STATUS'} toggle={open => this.setState({ open })}>
                {this.state.open && <>
                    <View style={{ height: 175, marginTop: 20 }}>
                        <ProgressCircle
                            backgroundColor={this.trackColor()}
                            progress={this.props.data.percentage}
                            progressColor={this.props.settings.accent}
                            style={{ height: 175 }}
                        >
                            <View style={generalCardStyles.centerLabel}>
                                {this.props.goalType.type === 'none' ?
                                    <Text style={this.style(styles, 'text')}>
                                        Add goal to start using this card.
                                    </Text> :
                                    <View>
                                        <Text style={this.style(generalCardStyles, 'amountText')}>
                                            {Math.round(this.props.data.percentage * 100) + '%'}
                                        </Text>
                                        <Text style={this.style(styles, 'centerText')}>
                                            <Icon name={'currency-' + this.props.settings.currency} color={this.color()} size={13} />
                                            {this.processValue(this.props.goalType.amount - this.props.data.remaining) + ' spent for'}
                                        </Text>
                                        <Text style={this.style(styles, 'centerText')}>
                                            {'the ' + this.props.goalType.type}
                                        </Text>
                                    </View>
                                }
                            </View>
                        </ProgressCircle>
                    </View>
                </>}
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(GoalCard);