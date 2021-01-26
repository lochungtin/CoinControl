import React from 'react';
import { Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Card from './Card';
import LabeledProcess from './LabeledProcess';
import TypeSwitch from './TypeSwitch';

import { styles } from '../../styles';
import { NULL_KEY } from '../../data/default';


class CategoryCard extends React.Component {

    constructor(props) {
        super(props);
        var type = 'expense';
        if (Object.keys(props.data.expense).length === 0 && Object.keys(props.data.income).length > 0)
            type = 'income';

        this.state = { type };
    }

    catValue = (catkey, key) => {
        const cat = (this.state.type === 'expense' ? this.props.expenseCategories : this.props.incomeCategories)[catkey] || this.props.expenseCategories[NULL_KEY];
        return cat[key];
    }

    percentage = key => this.props.data[this.state.type][key].counter / this.props.total[this.state.type + 'Total'];

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    render() {
        return (
            <Card icon={'label-multiple-outline'} title={'CATEGORIES'}>
                {(Object.keys(this.props.data['expense']).length > 0 || Object.keys(this.props.data['income']).length > 0) ?
                    <>
                        <TypeSwitch default={this.state.type} update={type => this.setState({ type })} />
                        {Object.keys(this.props.data[this.state.type])
                            .sort((a, b) => this.percentage(b) - this.percentage(a))
                            .map(key => {
                                return (
                                    <View style={{ ...styles.columns, alignItems: 'flex-start' }} key={key}>
                                        <Icon name={this.catValue(key, 'iconName')} color={this.catValue(key, 'color')} size={35} />
                                        <LabeledProcess
                                            color={this.catValue(key, 'color')}
                                            lValue={this.props.data[this.state.type][key].counter}
                                            percentage={this.percentage(key)}
                                            rValue={this.props.total[this.state.type + 'Total']}
                                        />
                                    </View>
                                );
                            })}
                        <Text style={this.style(styles, 'centerText')}>
                            QUANTITY COUNT
                        </Text>
                    </> :
                    <View style={{ paddingTop: 15 }}>
                        <Text style={this.style(styles, 'centerText')}>
                            No Records Found
                        </Text>
                    </View>
                }
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    expenseCategories: state.expenseCategories,
    incomeCategories: state.incomeCategories,
    settings: state.settings
});

export default connect(mapStateToProps)(CategoryCard);