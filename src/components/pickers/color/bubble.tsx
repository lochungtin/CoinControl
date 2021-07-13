import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { ColorPickerStyles } from '../styles';

import { ColorPickerCellDataType } from '../../../types/color';
import { ReduxPropType } from '../../../types/redux';

interface DataProps {
    data: ColorPickerCellDataType,
    highlight: boolean,
    key: string,
    onPress: (hex: string) => void,
}

class Bubble extends React.Component<ReduxPropType & DataProps> {
    render() {
        return (
            <TouchableOpacity 
                onPress={() => this.props.onPress(this.props.data.hex)}
                style={{
                    ...ColorPickerStyles.bubble,
                    ...(this.props.highlight ? {
                        borderWidth: 5,
                        borderColor: this.props.settings.theme.dynamic.text.mainC,
                    } : {}),
                    backgroundColor: this.props.data.hex,
                    left: this.props.data.pos.x,
                    top: this.props.data.pos.y,
                }}
            />
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Bubble);
