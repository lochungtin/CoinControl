import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import BaseModal from '../base';
import Bubble from './bubble';

import { colorPickerData } from '../../../data/color';
import { ColorPickerStyles } from '../styles';

import { ColorPickerCellDataType, ColorPickerSectorDataType } from '../../../types/color';
import { ReduxPropType } from '../../../types/redux';
import { smallKeygen } from '../../../utils/keygen';

interface DataProps {
    onClose: () => void,
    onSelect: (hex: string) => void,
    open: boolean,
    selected: string,
}

class Picker extends React.Component<ReduxPropType & DataProps> {
    render() {
        return (
            <BaseModal onClose={this.props.onClose} open={this.props.open}>
                <View style={ColorPickerStyles.stack}>
                    <View style={{
                        ...ColorPickerStyles.bgSquares,
                        backgroundColor: this.props.settings.theme.dynamic.screen.bgC,
                        transform: [
                            { translateY: 70 },
                        ]
                    }} />
                    <View style={{
                        ...ColorPickerStyles.bgSquares,
                        backgroundColor: this.props.settings.theme.dynamic.screen.bgC,
                        transform: [
                            { translateY: 70 },
                            { rotate: '-60deg' },
                        ]
                    }} />
                    <View style={{
                        ...ColorPickerStyles.bgSquares,
                        backgroundColor: this.props.settings.theme.dynamic.screen.bgC,
                        transform: [
                            { translateY: 70 },
                            { rotate: '60deg' },
                        ]
                    }} />
                    {Object.keys(colorPickerData).map((colorSectorKey: string) => {
                        let colorSector: ColorPickerSectorDataType = colorPickerData[colorSectorKey];
                        return Object.keys(colorSector).map((colorCellKey: string) => {
                            let colorCell: ColorPickerCellDataType = colorSector[colorCellKey];
                            return (
                                <Bubble
                                    data={colorCell}
                                    highlight={this.props.selected === colorCell.hex}
                                    key={smallKeygen()}
                                    onPress={this.props.onSelect}
                                />
                            );
                        });
                    })}
                </View>
            </BaseModal>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Picker);
