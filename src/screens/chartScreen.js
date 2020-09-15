import React from 'react';
import { FlatList, ScrollView, TouchableOpacity, Text, View, } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import Pie from 'react-native-pie';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import ChartSelectionItem from '../components/ChartSelectionItem';
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
                    <View style={{ ...styles.columns, maxHeight: 10, justifyContent: 'space-evenly', minWidth: maxWidth, }}>
                        <TouchableOpacity onPress={() => this.setState({ type: 'Income' })} style={this.typeSelection('Income')}>
                            <Text style={this.text('Income')}>INCOME</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ type: 'Expense' })} style={this.typeSelection('Expense')}>
                            <Text style={this.text('Expense')}>EXPENSE</Text>
                        </TouchableOpacity>
                    </View>
                    {!this.state.edit &&
                        <ScrollView style={{ maxHeight: 480, }}>
                            <View style={styles.rows}>
                                <View style={{ height: 10 }} />
                                <Text style={{ ...this.text(), width: '85%' }}>{"This Week's " + this.state.type}</Text>
                                <View style={{ height: 10 }} />
                                <LineChart
                                    data={{
                                        labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                                        datasets: [{ data: parseWeek(this.props.records, this.state.type) }]
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
                                <View style={{ height: 10 }} />
                                <Text style={{ ...this.text(), width: '85%' }}>{'Total ' + this.state.type + ' Pie Chart'}</Text>
                                <View style={{ height: 20 }} />
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
                                <View style={{ height: 30 }} />
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
                                <View style={{ height: 10 }} />
                            </View>
                        </ScrollView>
                    }
                    {this.state.edit &&
                        <View style={{ height: 480 }}>
                            <FlatList
                                data={this.state.type === 'Expense' ? this.props.expenseCategories : this.props.incomeCategories}
                                renderItem={({ item }) =>
                                    <ChartSelectionItem
                                        dark={this.props.settings.darkMode}
                                        accent={this.props.settings.accent}
                                        action={(item) => {}}
                                        item={item}
                                        
                                    />
                                }
                            />
                        </View>
                    }
                </View>
                <ExpandButton dark={this.props.settings.darkMode} onPress={() => { this.setState({ edit: !this.state.edit }) }} />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    expenseCategories: state.expenseCategories,
    incomeCategories: state.incomeCategories,
    records: state.records,
    settings: state.settings,
})

export default connect(mapStateToProps)(Screen);