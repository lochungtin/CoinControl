import React from 'react';
import { Text, View, } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Card from './Card';
import TypeSwitch from './TypeSwitch';

import { generalCardStyles, styles } from '../../styles';
import { black, white } from '../../data/color';
import LabeledProcess from './LabeledProcess';

class PieCard extends React.Component {

    constructor(props) {
        super(props);
        var type = 'expense';
        if (Object.keys(props.data.expense).length === 0 && Object.keys(props.data.income).length > 0)
            type = 'income';

        this.state = {
            focus: '',
            type: type,
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
                <Card icon={'chart-donut'} title={'PERCENTAGES'}>
                    {(Object.keys(this.props.data['expense']).length > 0 || Object.keys(this.props.data['income']).length > 0) ?
                        <>
                            <TypeSwitch default={this.state.type} update={type => this.setState({ type, focus: '' })} />
                            <PieChart style={{ height: 175, margin: 10 }} data={this.mapData()} innerRadius={'60%'}>
                                <View style={generalCardStyles.centerLabel}>
                                    <Text style={this.style(generalCardStyles, 'amountText')}>
                                        <Icon name={'currency-' + this.props.settings.currency} color={this.color()} size={20} />
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

                {this.state.focus !== '' && Object.keys(this.props.data[this.state.type]).length > 0 &&
                    <Card color={this.catValue(this.state.focus, 'color')} icon={this.catValue(this.state.focus, 'iconName')} title={this.catValue(this.state.focus, 'name').toUpperCase()} noExpansion>
                        <LabeledProcess
                            color={this.catValue(this.state.focus, 'color')}
                            lValue={<>
                                <Icon name={'currency-' + this.props.settings.currency} color={this.color()} size={13} />
                                {this.props.data[this.state.type][this.state.focus].accumulator}
                            </>}
                            percentage={this.props.data[this.state.type][this.state.focus].accumulator / this.props.total[this.state.type]}
                            rValue={<>
                                <Icon name={'currency-' + this.props.settings.currency} color={this.color()} size={13} />
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