import React from 'react';
import { Text, View, } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Card from './Card';
import LabeledProcess from './LabeledProcess';
import TypeSwitch from './TypeSwitch';

import { black, white, } from '../../data/color';
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

    mapData = () => Object.keys(this.props.data[this.state.type]).map(key => {
        const value = this.props.data[this.state.type][key] || { accumulator: 0 };
        return ({
            value: value.accumulator,
            svg: {
                fill: this.catValue(key, 'color'),
                onPress: () => this.onSlicePress(key)
            },
            key,
        });
    });

    onSlicePress = key => this.setState({ focus: this.state.focus === key ? '' : key });

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    typeSwitchToggle = type => this.setState({ type, focus: '' });

    render() {
        return (
            <>
                <Card icon={'chart-donut'} title={'PERCENTAGES'}>
                    {(Object.keys(this.props.data['expense']).length > 0 || Object.keys(this.props.data['income']).length > 0) ?
                        <>
                            <TypeSwitch default={this.state.type} toggle={this.typeSwitchToggle} />
                            <PieChart data={this.mapData()} innerRadius={'60%'} style={{ height: 175, margin: 10, }}>
                                <View style={generalCardStyles.centerLabel}>
                                    <Text style={this.style(generalCardStyles, 'amountText')}>
                                        <Icon 
                                            color={this.color()} 
                                            name={'currency-' + this.props.settings.currency} 
                                            size={20}
                                        />
                                        {this.props.total[this.state.type]}
                                    </Text>
                                </View>
                            </PieChart>
                            <Text style={this.style(styles, 'text')}>
                                click on sections to view details
                            </Text>
                        </> :
                        <View style={{ paddingTop: 15 }}>
                            <Text style={this.style(styles, 'centerText')}>
                                No Records Found
                            </Text>
                        </View>
                    }
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