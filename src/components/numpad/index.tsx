import Solver from '@enigmaoffline/node-exp-solver';
import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Btn from './btn';

import { NumpadStyles } from './styles';

import { makeGrid } from '../../data/mapping/numpad';
import { ReduxPropType } from '../../types/redux';
import { NumpadBtnProps } from '../../types/ui';
import { smallKeygen } from '../../utils/keygen';

interface DataProps {
    disableOps?: boolean,
    onConfirm: (num: number) => void,
    value: number,
}

class Numpad extends React.Component<ReduxPropType & DataProps> {

    state = {
        display: this.props.value.toString() || '',
    }

    onPressBkS = () => this.setState({ display: this.state.display.substring(0, this.state.display.length - 1) });

    onPressEql = () => {
        if (this.state.display === '')
            return;

        if (/^[-]?[0-9]*\.?[0-9]+$/.test(this.state.display))
            this.props.onConfirm(parseFloat(this.state.display));
        else
            this.setState({ display: Solver.solve(Solver.tokenize(this.state.display)).toString() });
    }

    onPressChr = (chr: string) => {
        if (this.state.display === '0')
            this.setState({ display: chr });
        else
            this.setState({ display: this.state.display + chr });
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
                    () => { },
                    () => { },
                    () => { },
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

const mapStateToProps = (state: ReduxPropType) => ({
                    theme: state.theme,
});

                export default connect(mapStateToProps)(Numpad);
