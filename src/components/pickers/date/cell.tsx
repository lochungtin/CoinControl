import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { ReduxThemeType } from '../../../types/redux';
import { DatePickerStyles } from '../styles';

interface DataProps {
    data: string,
    disabled?: boolean,
    highlight?: boolean,
    key: string,
    onPress?: () => void,
    special: boolean,
}

class Cell extends React.Component<ReduxThemeType & DataProps> {

    render() {
        let parsed: number = parseInt(this.props.data.substring(0, 2));
        let text: string = isNaN(parsed) ? this.props.data : parsed.toString();

        let color: string = this.props.theme.dynamic.text.mainC;
        if (this.props.special)
            color = this.props.theme.static.accentC;

        if (this.props.disabled)
            color = this.props.theme.dynamic.text.secondaryC;

        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    ...DatePickerStyles.cell,
                    ...(this.props.highlight ? {
                        borderColor: this.props.theme.static.accentC,
                        borderWidth: 1,
                    } : {}),
                }}
            >
                <Text style={{ ...DatePickerStyles.text, color }}>
                    {text}
                </Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Cell);
