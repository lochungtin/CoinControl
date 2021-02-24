import React from 'react';
import { Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Bubble from '../Bubble';
import Card from './Card';
import PieChart from '../Charts/PieChart';
import LabeledProcess from './LabeledProcess';
import TypeSwitch from './TypeSwitch';

import { black, shade2, shade3, white, } from '../../data/color';
import { NULL_KEY } from '../../data/default';
import { RNKey } from '../../functions/GenKey';
import { generalCardStyles, styles, } from '../../styles';

class PieCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            focus: '',
            index: 0,
            type: Object.keys(props.data.expense).length === 0 && Object.keys(props.data.income).length > 0 ? 'income' : 'expense',
        };
    }

    color = () => this.props.settings.darkMode ? white : black;

    catValue = (catkey, key) => ((this.state.type === 'expense' ? this.props.expenseCategories : this.props.incomeCategories)[catkey] || this.props.expenseCategories[NULL_KEY])[key];

    decrement = () => {
        if (this.state.index > 0)
            this.setState({ index: this.state.index - 1 });
    }

    iconColor = () => this.props.settings.darkMode ? shade2 : shade3;

    increment = () => {
        if (Object.keys(this.props.data[this.state.type]).length / 5 - 1 > this.state.index)
            this.setState({ index: this.state.index + 1 });
    }

    mapData = data => Object.keys(data).map(key => {
        const value = this.props.data[this.state.type][key] || { accumulator: 0 };
        return ({
            svg: {
                fill: this.catValue(key, 'color'),
            },
            value: value.accumulator,
        });
    });

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    toggleDetail = key => this.setState({ focus: this.state.focus === key ? '' : key });

    trackColor = () => this.props.settings.darkMode ? shade3 : shade2;

    typeSwitchToggle = type => this.setState({ type, focus: '' });

    render() {
        const data = Object.keys(this.props.data[this.state.type]);
        return (
            <>
                <Card icon={'chart-donut'} title={'PERCENTAGES'}>
                    <TypeSwitch default={this.state.type} toggle={this.typeSwitchToggle} />
                    <View style={{ ...styles.columns, justifyContent: 'space-around', marginVertical: 20 }}>
                        <PieChart
                            data={this.mapData(this.props.data[this.state.type])}
                            dim={160}
                            trackColor={this.trackColor()}
                            width={0.1}
                        />
                        <View style={{ ...styles.rows, alignItems: 'flex-start', justifyContent: 'space-around', width: 160 }}>
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
                                {data.length === 0 ? 'No Records Found' : 'click on sections to view details'}
                            </Text>
                        </View>
                    </View>
                    {data.length > 0 &&
                        <View style={{ ...styles.columns, justifyContent: 'space-around', }}>
                            <Bubble
                                iconColor={this.color()}
                                iconName={'chevron-left'}
                                iconSize={20}
                                onPress={this.decrement}
                            />
                            <View style={{ ...styles.columns, justifyContent: 'space-around', width: 300 }}>
                                {data.slice(this.state.index * 5, (this.state.index + 1) * 5).map(key => {
                                    return (
                                        <Bubble
                                            iconColor={this.catValue(key, 'color')}
                                            iconName={this.catValue(key, 'iconName')}
                                            iconSize={25}
                                            key={RNKey()}
                                            onPress={() => this.toggleDetail(key)}
                                            size={35}
                                            selected={this.state.focus === key}
                                        />
                                    );
                                })}
                            </View>
                            <Bubble
                                iconColor={this.color()}
                                iconName={'chevron-right'}
                                iconSize={20}
                                onPress={this.increment}
                            />
                        </View>
                    }
                </Card>

                {this.state.focus !== '' && data.length > 0 && this.props.data[this.state.type][this.state.focus] &&
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