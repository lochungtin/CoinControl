import React from 'react';
import { Text, View, } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import NumpadButton from './NumpadButton';

import { numpadStyles } from '../../styles';
import { RNKey } from '../../functions/GenKey';

class Numpad extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
            dpOpen: false,
            num: props.num.toString(),
            ready: true,
        };

        this.grid = [
            [
                [1, 2, 3],
                <NumpadButton onPress={this.props.onSpecialPress}>
                    {this.props.children}
                </NumpadButton>
            ],
            [
                [4, 5, 6],
                <NumpadButton
                    disabled={this.props.disabled}
                    icon={'plus'}
                    onPress={() => this.appendOp(' + ')}
                />
            ],
            [
                [7, 8, 9],
                <NumpadButton
                    disabled={this.props.disabled}
                    icon={'minus'}
                    onPress={() => this.appendOp(' - ')}
                />
            ]
        ];

        this.lastRow = [
            {
                icon: 'circle-small',
                onPress: () => this.appendNum('.'),
                special: false,
            },
            {
                icon: 'numeric-0',
                onPress: () => this.appendNum(0),
                special: false,
            },
            {
                icon: 'backspace-outline',
                onPress: () => this.backspace(),
                special: false,
            },
            {
                icon: this.state.ready ? 'check' : 'equal',
                onPress: () => this.confirm(),
                special: true,
            }
        ];
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
        let num = this.state.num.slice(0, -1);
        if (num === '')
            this.setState({ num: '0' });
        else
            this.setState({ num: num });
    }

    confirm = () => {
        if (this.state.ready)
            this.props.onConfirm(this.state.num);
        else {
            let splt = this.state.num.split(" ");
            let numStack = new Array();
            let opStack = new Array();
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
        let a = parseFloat(numStack.shift());
        let b = parseFloat(numStack.shift());
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
                    <Icon
                        color={this.style('outputNum').color}
                        name={'currency-' + this.props.settings.currency}
                        size={25}
                    />
                    <Text style={this.style('outputNum')}>
                        {this.state.num}
                    </Text>
                </View>
                {this.grid.map(row => {
                    return (
                        <View key={RNKey()} style={numpadStyles.numpadRow}>
                            {row[0].map(num => {
                                return (
                                    <NumpadButton
                                        disabled={this.props.disabled}
                                        icon={'numeric-' + num}
                                        key={RNKey()}
                                        onPress={() => this.appendNum(num)}
                                    />
                                );
                            })}
                            {row[1]}
                        </View>
                    );
                })}
                <View style={numpadStyles.numpadRow}>
                    {this.lastRow.map(cell => {
                        return (
                            <NumpadButton
                                disabled={this.props.disabled}
                                icon={cell.icon}
                                key={RNKey()}
                                onPress={cell.onPress}
                                special={cell.special}
                            />
                        );
                    })}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Numpad);