import Solver from '@enigmaoffline/node-exp-solver';
import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Btn from './btn';

import { NumpadStyles } from './styles';

import { makeGrid } from '../../data/mapping/numpad';
import { ReduxThemeType } from '../../types/redux';
import { NumpadBtnProps } from '../../types/ui';
import { smallKeygen } from '../../utils/keygen';

interface DataProps {
    disableOps?: boolean,
    onConfirm: (num: number) => void,
    value: number,
}

class Numpad extends React.Component<ReduxThemeType & DataProps> {

    state = {
        display: this.props.value.toString() || '',
        mem: '',
    }

    onPressMem = () => {
        if (this.state.mem === '')
            return;

        let lastChr: string = this.state.display.slice(-1);
        let add: string = /[0-9]/.test(lastChr) || lastChr === ')' ? '*' : '0';

        if (lastChr === '.')
            add = '0*';

        this.setState({ display: this.state.display + add + this.state.mem })
    }

    onPressClr = () => this.setState({ display: '0', mem: '' });

    onPressBkS = () => this.setState({ display: this.state.display.substring(0, this.state.display.length - 1) });

    onPressEql = () => {
        if (this.state.display === '')
            return;

        if (/^[-]?[0-9]*\.?[0-9]+$/.test(this.state.display))
            this.props.onConfirm(parseFloat(this.state.display));
        else {
            let ans: string = Solver.solve(Solver.tokenize(this.state.display)).toString();
            this.setState({ display: ans, mem: ans });
        }
    }

    onPressChr = (chr: string) => {
        if (this.state.display === '0' && !['+', '-', '*', '/', '.'].includes(chr))
            this.setState({ display: chr });
        else if (this.state.display === '' && ['+', '-', '*', '/', '.'].includes(chr))
            this.setState({ display: '0' + chr });
        else
            this.setState({ display: this.state.display + chr });
    }

    onPressPar = () => {
        let display: string = this.state.display;
        let lastChar: string = display[display.length - 1];
        let valid: boolean = this.validate(Solver.tokenize(display));

        if (display.length === 0 || display === '0')
            display = '(';
        else if (['+', '-', '*', '/', '(', ')'].includes(lastChar)) {
            if (lastChar === ")")
                display += (valid ? '*(' : ')');
            else
                display += '(';
        }
        else if (lastChar === '.')
            display += '0*(';
        else
            display += (valid ? '*(' : ')');

        this.setState({ display });
    }

    validate = (splt: Array<string>): boolean => {
        let stack: Array<string> = [];
    
        for (let i: number = 0; i < splt.length; ++i) {
            let token: string = splt[i];
            if (token === '(')
                stack.push('(');
            if (token === ')') {
                if (stack.length === 0)
                    return false;
                stack.pop();
            }
        }
    
        return stack.length === 0;
    }

    render() {
        let valid: boolean = /^[-]?[0-9]*\.?[0-9]+$/.test(this.state.display);

        let color: string = this.props.theme.dynamic.text.mainC;
        if (valid)
            color = this.props.theme.static.accentC;

        if (!this.state.display)
            color = this.props.theme.dynamic.text.secondaryC;

        return (
            <View style={{ ...NumpadStyles.root, backgroundColor: this.props.theme.dynamic.screen.secondaryBgC }}>
                <View style={NumpadStyles.display}>
                    <Icon
                        color={this.props.theme.static.accentC}
                        name={'currency-gbp'}
                        size={40}
                    />
                    <Text style={{
                        ...NumpadStyles.text,
                        color,
                        fontSize: valid ? 30 : 24,
                    }}>
                        {this.state.display.replace(/\*/g, 'x') || '00'}
                    </Text>
                </View>
                {makeGrid(
                    this.onPressMem,
                    this.onPressPar,
                    this.onPressClr,
                    this.onPressBkS,
                    this.onPressEql,
                    this.onPressChr,
                ).map((row: Array<NumpadBtnProps>) => {
                    return (
                        <View key={smallKeygen()} style={NumpadStyles.row}>
                            {row.map((btnProps: NumpadBtnProps) => {
                                return (
                                    <Btn
                                        {...btnProps}
                                        disabled={btnProps.isOp && (this.props.disableOps || false)}
                                        highlight={btnProps.icon === 'equal-box' && valid}
                                        key={smallKeygen()}
                                    />
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Numpad);
