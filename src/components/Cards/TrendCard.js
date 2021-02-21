import React from 'react';
import { Text, View, } from 'react-native';
import { Grid, LineChart, YAxis, } from 'react-native-svg-charts';
import { connect } from 'react-redux';

import Card from './Card';
import TypeSwitch from './TypeSwitch';

import { black, white, } from '../../data/color';


class TrendCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: props.data.expense.length === 0 && props.data.income.length > 0 ? 'income' : 'expense'
        };
    }

    color = () => this.props.settings.darkMode ? white : black;

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    typeSwitchToggle = type => this.setState({ type });

    render() {
        return (
            <Card icon={'chart-line'} title={'7 DAY CASHFLOW'}>
                <TypeSwitch default={this.state.type} toggle={this.typeSwitchToggle} />
                <View style={{ height: 175, flexDirection: 'row', }}>
                    <YAxis
                        contentInset={{ bottom: 20, top: 20, }}
                        data={this.props.data[this.state.type]}
                        formatLabel={value => value}
                        numberOfTicks={5}
                        svg={{ fill: this.color(), fontSize: 15, }}
                    />
                    <LineChart
                        contentInset={{ bottom: 20, top: 20, }}
                        data={this.props.data[this.state.type]}
                        svg={{ stroke: this.props.settings.accent, strokeWidth: 2, }}
                        style={{ flex: 1, marginLeft: 16, }}
                    >
                        <Grid />
                    </LineChart>
                </View>
                <Text style={{ color: this.color() }}>
                    today
                </Text>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(TrendCard);