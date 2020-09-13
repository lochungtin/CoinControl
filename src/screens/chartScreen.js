import React from 'react';
import { TouchableOpacity, Text, View, } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import Pie from 'react-native-pie';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import ExpandButton from '../components/ExpandButton';
import PieLabels from '../components/PieLabels';
import { parseLabel, parseSector, parseWeek } from '../functions/parser';
import { bgColorD, bgColorL, chartScreenStyles, iconColors, maxWidth, styles, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pie: true,
            type: 'Expense',
        }
    }

    iconColor = () => {
        return this.props.settings.darkMode ? iconColors.iconD : iconColors.iconL;
    }

    text = type => {
        if (this.state.type === type)
            return { color: this.props.settings.accent }
        return this.props.settings.darkMode ? styles.textD : styles.textL;
    }

    title = () => {
        return this.props.settings.darkMode ? chartScreenStyles.titleD : chartScreenStyles.titleL;
    }

    typeSelection = type => {
        if (this.props.settings.darkMode)
            return this.state.type === type ? chartScreenStyles.typeSelectedD : chartScreenStyles.type;
        else
            return this.state.type === type ? chartScreenStyles.typeSelectedL : chartScreenStyles.type;
    }

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <View style={{ ...styles.rows, justifyContent: 'space-between', paddingTop: 50 }}>
                    <View style={{ ...styles.columns, justifyContent: 'center', maxHeight: 35, }}>
                        <Icon name={'chart-line'} color={this.text().color} size={35} />
                        <Text style={this.title()}> Analytics</Text>
                    </View>
                    {this.state.pie &&
                        <>
                            <View style={{ ...styles.columns, maxHeight: 10, justifyContent: 'space-evenly', minWidth: maxWidth, }}>
                                <TouchableOpacity onPress={() => this.setState({ type: 'Income' })} style={this.typeSelection('Income')}>
                                    <Text style={this.text('Income')}>INCOME</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ type: 'Expense' })} style={this.typeSelection('Expense')}>
                                    <Text style={this.text('Expense')}>EXPENSE</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ ...styles.rows, maxHeight: 480, }}>
                                <Pie
                                    backgroundColor={this.props.settings.darkMode ? bgColorD : bgColorL}
                                    dividerSize={6}
                                    innerRadius={100}
                                    radius={130}
                                    sections={parseSector(
                                        this.props.records,
                                        this.state.type,
                                        this.props.settings.accent,
                                        this.props.settings.darkMode ? bgColorL : bgColorD
                                    )}
                                    strokeCap={'butt'}
                                />
                                <View style={{ height: 20 }} />
                                <View>
                                    {
                                        parseLabel(
                                            this.props.records,
                                            this.state.type,
                                            this.props.settings.accent,
                                            this.props.settings.darkMode ? bgColorL : bgColorD
                                        ).map((item) => {
                                            return <PieLabels dark={this.props.settings.darkMode} item={item} key={item.category} />
                                        })
                                    }
                                </View>
                            </View>
                        </>
                    }
                    {!this.state.pie &&
                        <>
                            <LineChart
                                data={{
                                    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                                    datasets: [{ data: parseWeek(this.props.records, 'Income') }]
                                }}
                                width={maxWidth}
                                height={220}
                                chartConfig={{
                                    backgroundColor: this.props.settings.darkMode ? bgColorD : bgColorL,
                                    backgroundGradientFrom: this.props.settings.darkMode ? bgColorD : bgColorL,
                                    backgroundGradientTo: this.props.settings.darkMode ? bgColorD : bgColorL,
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                    }
                                }}
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                            <LineChart
                                data={{
                                    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                                    datasets: [{ data: parseWeek(this.props.records, 'Expense') }]
                                }}
                                width={maxWidth}
                                height={220}
                                chartConfig={{
                                    backgroundColor: this.props.settings.darkMode ? bgColorD : bgColorL,
                                    backgroundGradientFrom: this.props.settings.darkMode ? bgColorD : bgColorL,
                                    backgroundGradientTo: this.props.settings.darkMode ? bgColorD : bgColorL,
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                    }
                                }}
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        </>
                    }
                </View>
                <ExpandButton dark={this.props.settings.darkMode} onPress={() => { this.setState({ pie: !this.state.pie }) }} />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    records: state.records,
    settings: state.settings,
})

export default connect(mapStateToProps)(Screen);