import React from 'react';
import { Text, View, } from 'react-native';
import { Grid, LineChart, YAxis } from 'react-native-svg-charts';
import { connect } from 'react-redux';

import Card from './Card';
import TypeSwitch from './TypeSwitch';

import { black, white } from '../../data/color';


class TrendCard extends React.Component {

    constructor(props) {
        super(props);
        var type = 'expense';
        if (props.data.expense.length === 0 && props.data.income.length > 0)
            type = 'income';

        this.state = {
            type: type,
        }
    }

    color = () => this.props.settings.darkMode ? white : black;

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <Card icon={'chart-line'} title={'7 DAY CASHFLOW'}>
                <TypeSwitch default={this.state.type} update={type => this.setState({ type })} />
                <View style={{ height: 175, flexDirection: 'row' }}>
                    <YAxis
                        data={this.props.data[this.state.type]}
                        contentInset={{ top: 20, bottom: 20 }}
                        svg={{
                            fill: this.color(),
                            fontSize: 15,
                        }}
                        numberOfTicks={5}
                        formatLabel={(value) => value}
                    />
                    <LineChart
                        style={{ flex: 1, marginLeft: 16 }}
                        data={this.props.data[this.state.type]}
                        svg={{
                            stroke: this.props.settings.accent,
                            strokeWidth: 2
                        }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Grid />
                    </LineChart>
                </View>
                <Text style={{ color: this.color() }}>today</Text>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(TrendCard);