import React from 'react';
import { Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Card from './Card';
import PieChart from '../Charts/PieChart';
import LabeledProcess from './LabeledProcess';
import TypeSwitch from './TypeSwitch';

import { black, shade2, shade3, white, } from '../../data/color';
import { NULL_KEY } from '../../data/default';
import { generalCardStyles, styles, } from '../../styles';

class PieCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            focus: '',
            type: Object.keys(props.data.expense).length === 0 && Object.keys(props.data.income).length > 0 ? 'income' : 'expense',
        };
    }

    color = () => this.props.settings.darkMode ? white : black;

    catValue = (catkey, key) => ((this.state.type === 'expense' ? this.props.expenseCategories : this.props.incomeCategories)[catkey] || this.props.expenseCategories[NULL_KEY])[key];

    mapData = data => Object.keys(data).map(key => {
        const value = this.props.data[this.state.type][key] || { accumulator: 0 };
        return ({
            onPress: () => this.setState({ focus: this.state.focus === key ? '' : key }),
            svg: {
                fill: this.catValue(key, 'color'),
            },
            value: value.accumulator,
        });
    });

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    trackColor = () => this.props.settings.darkMode ? shade3 : shade2;

    typeSwitchToggle = type => this.setState({ type, focus: '' });

    render() {
        return (
            <>
                <Card icon={'chart-donut'} title={'PERCENTAGES'}>
                    <TypeSwitch default={this.state.type} toggle={this.typeSwitchToggle} />
                    <View style={{ ...styles.columns, justifyContent: 'space-around', marginVertical: 20 }}>
                        <PieChart
                            data={this.mapData(this.props.data[this.state.type])}
                            dim={165}
                            trackColor={this.trackColor()}
                            width={0.1}
                        />
                        <View style={{ ...styles.rows, alignItems: 'flex-start', justifyContent: 'space-around', width: 150 }}>
                            <Text style={this.style(generalCardStyles, 'amountText')}>
                                Total {this.state.type.toUpperCase()[0] + this.state.type.substring(1)}
                            </Text>
                            <Text style={this.style(generalCardStyles, 'amountText')}>
                                <Icon
                                    color={this.color()}
                                    name={'currency-' + this.props.settings.currency}
                                    size={20}
                                />
                                {this.props.total[this.state.type]}
                            </Text>
                            <View style={{ height: 50 }} />
                            <Text style={{ ...this.style(styles, 'text'), height: 40 }}>
                                {Object.keys(this.props.data[this.state.type]).length === 0 ? 'No Records Found' : 'click on sections to view details'}
                            </Text>
                        </View>
                    </View>
                </Card>

                {this.state.focus !== '' && Object.keys(this.props.data[this.state.type]).length > 0 && this.props.data[this.state.type][this.state.focus] &&
                    <Card
                        color={this.catValue(this.state.focus, 'color')}
                        icon={this.catValue(this.state.focus, 'iconName')}
                        noExpansion
                        title={this.catValue(this.state.focus, 'name').toUpperCase()}
                    >
                        <LabeledProcess
                            color={this.catValue(this.state.focus, 'color')}
                            lValue={<>
                                <Icon
                                    color={this.color()}
                                    name={'currency-' + this.props.settings.currency}
                                    size={13}
                                />
                                {this.props.data[this.state.type][this.state.focus].accumulator}
                            </>}
                            percentage={this.props.data[this.state.type][this.state.focus].accumulator / this.props.total[this.state.type]}
                            rValue={<>
                                <Icon
                                    color={this.color()}
                                    name={'currency-' + this.props.settings.currency}
                                    size={13}
                                />
                                {this.props.total[this.state.type]}
                            </>}
                        />
                    </Card>
                }
            </>
        );
    }
}

const mapStateToProps = state => ({
    expenseCategories: state.expenseCategories,
    incomeCategories: state.incomeCategories,
    settings: state.settings
});

export default connect(mapStateToProps)(PieCard);