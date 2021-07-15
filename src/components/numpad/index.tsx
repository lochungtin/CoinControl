import Solver from '@enigmaoffline/node-exp-solver';
import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Btn from './btn';

import { NumpadStyles } from './styles';

import { makeGrid } from '../../data/numpad';
import { NumpadBtnProps } from '../../types/data';
import { ReduxPropType } from '../../types/redux';
import { smallKeygen } from '../../utils/keygen';
import display from '../pickers/time/display';

interface DataProps {
    disableOps?: boolean,
    onConfirm: (num: number) => void,
}

class Numpad extends React.Component<ReduxPropType & DataProps> {

    state = {
        display: ''
    }

    onPressEql = () => {
        if (this.state.display === '')
            return;

        if (/^[-]?[0-9]*\.?[0-9]+$/.test(this.state.display))
            this.props.onConfirm(parseFloat(this.state.display));
        else
            this.setState({ display: Solver.solve(Solver.tokenize(this.state.display)).toString() });
    }

    render() {
        let valid: boolean = /^[-]?[0-9]*\.?[0-9]+$/.test(this.state.display);

        let color: string = this.props.settings.theme.dynamic.text.mainC;
        if (valid)
            color = this.props.settings.theme.static.accentC;
        
        if (!this.state.display)
            color = this.props.settings.theme.dynamic.text.secondaryC;

        return (
            <View style={{ ...NumpadStyles.root, backgroundColor: this.props.settings.theme.dynamic.screen.secondaryBgC }}>
                <View style={NumpadStyles.display}>
                    <Icon
                        color={this.props.settings.theme.static.accentC}
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
                    () => this.setState({ display: this.state.display.substring(0, this.state.display.length - 1) }),
                    this.onPressEql,
                    (chr: string) => this.setState({ display: this.state.display + chr }),
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
    settings: state.settings,
});

export default connect(mapStateToProps)(Numpad);
