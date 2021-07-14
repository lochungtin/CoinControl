import React from 'react';
import { Text, View } from 'react-native';
import Slider from 'react-native-slider';
import { connect } from 'react-redux';

import { TimePickerStyles } from '../styles';

import { ReduxPropType } from '../../../types/redux';

interface DataProps {
    max: number,
    min: number,
    onValueChange: (value: number) => void,
    step: number,
    text: string,
    value: number,
}

class CSlider extends React.Component<ReduxPropType & DataProps> {
    render() {
        return (
            <View style={TimePickerStyles.sliderRoot}>
                <Text style={{ ...TimePickerStyles.sliderLabel, color: this.props.settings.theme.dynamic.text.mainC }}>
                    {this.props.text}
                </Text>
                <Slider
                    maximumTrackTintColor={this.props.settings.theme.dynamic.percentageTrackC}
                    maximumValue={this.props.max}
                    minimumTrackTintColor={this.props.settings.theme.static.accentC}
                    minimumValue={this.props.min}
                    onValueChange={this.props.onValueChange}
                    step={this.props.step}
                    style={TimePickerStyles.slider}
                    thumbTintColor={this.props.settings.theme.static.accentC}
                    value={this.props.value}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(CSlider);
