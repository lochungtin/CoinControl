import React from 'react';
import { TouchableOpacity } from 'react-native';
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
                        borderColor: this.props.theme.dynamic.text.mainC,
                        borderWidth: 5,
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
    theme: state.theme,
});

export default connect(mapStateToProps)(Bubble);
