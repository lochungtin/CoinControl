import React from 'react';
import { ScrollView, Text, View, } from 'react-native';
import { connect } from 'react-redux';

import ScreenHeader from '../components/ScreenHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { icons } from '../data/icons';

import { black, white, } from '../data/color';
import { styles, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            types: Object.keys(icons),
        }
    }

    makeGrid = arr => {
        var grid = [];
        for (let i = 0; i < arr.length; i += 5) {
            var row = arr.slice(i, i + 5);
            var filler = [];
            for (let j = 0; j < 5 - row.length; j++) {
                filler.push('numeric-' + j);
            }
            grid.push([...row, ...filler]);
        }
        console.log(grid);
        return grid;
    }

    iconColor = icon => {
        return icon.startsWith('numeric') ? 'transparent' : this.props.settings.accent;
    }

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <ScreenHeader
                    back={() => this.props.navigation.goBack()}
                    name={'Icons'}
                />
                <ScrollView style={{ width: '100%' }}>
                    {this.state.types.map(type => {
                        return (
                            <View key={type}>
                                <Text>{type}</Text>
                                {this.makeGrid(icons[type]).map(row => {
                                    return (
                                        <View style={{ ...styles.columns, height: 70, justifyContent: 'space-evenly' }}>
                                            {row.map(icon => {
                                                return (
                                                    <Icon name={icon} size={40} color={this.iconColor(icon)} key={icon} />
                                                );
                                            })}
                                        </View>
                                    );
                                })}
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    expenseCategories: state.expenseCategories,
    expenseSelection: state.expenseSelection,
    incomeCategories: state.incomeCategories,
    incomeSelection: state.incomeSelection,
    settings: state.settings,
})

export default connect(mapStateToProps)(Screen);