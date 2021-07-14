import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Btn from './btn';

import { NumpadStyles } from './styles';

import { makeGrid } from '../../data/numpad';
import { NumpadBtnProps } from '../../types/data';
import { ReduxPropType } from '../../types/redux';

interface DataProps {
    disableOps: boolean,
    onConfirm: (num: number) => void,
}

class Numpad extends React.Component<ReduxPropType & DataProps> {

    state = {
        display: '-420'
    }

    render() {
        let valid: boolean = /^[-]?[0-9]*\.?[0-9]+$/.test(this.state.display);

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
                        color: valid ? this.props.settings.theme.static.accentC : this.props.settings.theme.dynamic.text.mainC,
                        fontSize: valid ? 30 : 24,
                    }}>
                        {this.state.display.replace(/\*/g, 'x')}
                    </Text>
                </View>
                {makeGrid(
                    () => { },
                    () => { },
                    () => { },
                    () => { },
                    () => { },
                    () => { },
                ).map((row: Array<NumpadBtnProps>) => {
                    return (
                        <View style={NumpadStyles.row}>
                            {row.map((btnProps: NumpadBtnProps) => {
                                return (
                                    <Btn {...btnProps} disabled={btnProps.isOp && this.props.disableOps} />
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
