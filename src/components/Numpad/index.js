import React from 'react';
import { Text, View, } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import NumpadButton from './NumpadButton';

import { numpadStyles } from '../../styles';

class Numpad extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            dpOpen: false,
            num: this.props.num.toString(),
            ready: true,
        }
    }

    appendNum = num => {
        if (this.state.num === '0' && num !== '.')
            this.setState({ num: num.toString() });
        else
            this.setState({ num: this.state.num + num });
    }

    appendOp = op => {
        if (this.state.num.endsWith(" "))
            this.setState({ num: this.state.num.slice(0, -3) + op, ready: false });
        else
            this.setState({ num: this.state.num + op, ready: false });
    }

    backspace = () => {
        var num = this.state.num.slice(0, -1);
        if (num === '')
            this.setState({ num: '0' });
        else
            this.setState({ num: num });
    }

    confirm = () => {
        if (this.state.ready)
            this.props.onConfirm(this.state.num);
        else {
            var splt = this.state.num.split(" ");
            var numStack = new Array();
            var opStack = new Array();
            for (const t of splt) {
                if (t === '+' || t === '-')
                    opStack.push(t);
                else
                    numStack.push(t);
            }

            this.setState({ num: this.evalRecur(numStack, opStack).toString(), ready: true });
        }
    }

    evalRecur = (numStack, opStack) => {
        if (numStack.length === 1)
            return numStack.shift();
        var a = parseFloat(numStack.shift());
        var b = parseFloat(numStack.shift());
        if (opStack.shift() === '+')
            return this.evalRecur([a + b, ...numStack], opStack);
        else
            return this.evalRecur([a - b, ...numStack], opStack);
    }

    style = styleName => numpadStyles[styleName + (this.props.settings.darkMode ? 'D' : 'L')];

    render() {
        return (
            <View style={numpadStyles.numpadRoot}>
                <View style={this.style('output')}>
                    <Icon name={'currency-' + this.props.settings.currency} size={25} color={this.style('outputNum').color} />
                    <Text style={this.style('outputNum')}>{this.state.num}</Text>
                </View>
                <View style={numpadStyles.numpadRow}>
                    {[1, 2, 3].map(num => {
                        return (
                            <NumpadButton icon={'numeric-' + num} key={num} onPress={() => this.appendNum(num)} />
                        )
                    })}
                    <NumpadButton special={true} value={this.state.date} onPress={() => this.setState({ dpOpen: true })} />
                </View>
                <View style={numpadStyles.numpadRow}>
                    {[4, 5, 6].map(num => {
                        return (
                            <NumpadButton icon={'numeric-' + num} key={num} onPress={() => this.appendNum(num)} />
                        )
                    })}
                    <NumpadButton icon={'plus'} onPress={() => this.appendOp(' + ')} />
                </View>
                <View style={numpadStyles.numpadRow}>
                    {[7, 8, 9].map(num => {
                        return (
                            <NumpadButton icon={'numeric-' + num} key={num} onPress={() => this.appendNum(num)} />
                        )
                    })}
                    <NumpadButton icon={'minus'} onPress={() => this.appendOp(' - ')} />
                </View>
                <View style={numpadStyles.numpadRow}>
                    <NumpadButton icon={'circle-small'} onPress={() => this.appendNum('.')} />
                    <NumpadButton icon={'numeric-0'} onPress={() => this.appendNum(0)} />
                    <NumpadButton icon={'backspace-outline'} onPress={this.backspace} />
                    <NumpadButton icon={this.state.ready ? 'check' : 'equal'} onPress={this.confirm} special={true} />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Numpad);