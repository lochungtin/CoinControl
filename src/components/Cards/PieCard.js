import React from 'react';
import { Text, View, } from 'react-native';
import * as Progress from 'react-native-progress';
import { PieChart } from 'react-native-svg-charts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Card from './Card';
import TypeSwitch from './TypeSwitch';

import { maxWidth, pieCardStyles, styles } from '../../styles';
import { black, white } from '../../data/color';

class PieCard extends React.Component {

    constructor(props) {
        super(props);
        var type = 'expense';
        if (Object.keys(props.data.expense).length === 0 && Object.keys(props.data.income).length > 0)
            type = 'income';

        this.state = {
            focus: '',
            type: type,
            open: true,
        }
    }

    color = () => this.props.settings.darkMode ? white : black;

    catValue = (catkey, key) => (this.state.type === 'expense' ? this.props.expenseCategories : this.props.incomeCategories)[catkey][key];

    onSlicePress = key => {
        var focus = key;
        if (this.state.focus === key)
            focus = '';
        this.setState({ focus });
    }

    mapData = () => Object.keys(this.props.data[this.state.type]).map(key => ({
        value: this.props.data[this.state.type][key].accumulator,
        svg: {
            fill: this.catValue(key, 'color'),
            onPress: () => this.onSlicePress(key)
        },
        key
    }));


    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <>
                <Card icon={'chart-donut'} title={'PERCENTAGES'} toggle={open => this.setState({ open })}>
                    {this.state.open && <>
                        <TypeSwitch default={this.state.type} update={type => this.setState({ type, focus: '' })} />
                        <PieChart style={{ height: 175, margin: 10 }} data={this.mapData()} innerRadius={'60%'}>
                            <View style={pieCardStyles.centerLabel}>
                                <Icon name={'currency-' + this.props.settings.currency} color={this.color()} size={20} />
                                <Text style={this.style(pieCardStyles, 'amountText')}>
                                    {this.props.total[this.state.type]}
                                </Text>
                            </View>
                        </PieChart>
                        <Text style={this.style(styles, 'text')}>
                            click on sections to view details
                        </Text>
                    </>}
                </Card>

                {this.state.open && this.state.focus !== '' &&
                    <Card color={this.catValue(this.state.focus, 'color')} icon={this.catValue(this.state.focus, 'iconName')} title={this.catValue(this.state.focus, 'name').toUpperCase()} noExpansion>
                        <View style={pieCardStyles.progressBox}>
                            <Progress.Bar
                                color={this.catValue(this.state.focus, 'color')}
                                progress={this.props.data[this.state.type][this.state.focus].accumulator / this.props.total[this.state.type]}
                                width={maxWidth / 1.5}
                            />
                            <View style={{ ...styles.columns, justifyContent: 'space-between', padding: 5, width: '80%' }}>

                                <Text style={this.style(styles, 'text')}>
                                    <Icon name={'currency-' + this.props.settings.currency} color={this.color()} size={13} />
                                    {this.props.data[this.state.type][this.state.focus].accumulator}
                                </Text>
                                <Text style={this.style(styles, 'text')}>
                                    {Math.round(this.props.data[this.state.type][this.state.focus].accumulator / this.props.total[this.state.type] * 100) + '% OF TOTAL'}
                                </Text>
                                <Text style={this.style(styles, 'text')}>
                                    <Icon name={'currency-' + this.props.settings.currency} color={this.color()} size={13} />
                                    {this.props.total[this.state.type]}
                                </Text>
                            </View>
                        </View>
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