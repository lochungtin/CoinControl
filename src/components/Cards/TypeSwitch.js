import React from 'react';
import { Switch, Text, View, } from 'react-native';
import { connect } from 'react-redux';
import { black, white, } from '../../data/color';

import { styles } from '../../styles';

class TrendCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: props.default
        }
    }

    color = type => {
        if (this.state.type === type)
            return this.props.settings.accent;
        return this.props.settings.darkMode ? white : black;
    }

    style = (stylesheet, styleName) => stylesheet[styleName + (this.props.settings.darkMode ? "D" : "L")];

    toggle = val => {
        const type = val ? 'income' : 'expense';
        this.setState({ type });
        this.props.update(type);
    }

    render() {
        return (
            <View style={{ ...styles.columns, justifyContent: 'space-evenly', width: '100%', paddingVertical: 10, }}>
                <Text style={{ color: this.color('expense') }}>EXPENSE</Text>
                <Switch
                    onValueChange={this.toggle}
                    thumbColor={white}
                    trackColor={{ false: this.props.settings.accent, true: this.props.settings.accent }}
                    value={this.state.type === 'income'}
                />
                <Text style={{ color: this.color('income') }}>INCOME</Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(TrendCard);