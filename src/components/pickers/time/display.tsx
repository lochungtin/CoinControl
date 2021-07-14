import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { TimePickerStyles } from '../styles';

import { ReduxPropType } from '../../../types/redux';

interface DataProps {
    highlight?: boolean,
    onPress?: () => void,
    text: string,
}

class Display extends React.Component<ReduxPropType & DataProps> {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    ...TimePickerStyles.displayRoot,
                    ...(this.props.highlight ? {
                        borderWidth: 2,
                        borderColor: this.props.settings.theme.static.accentC,
                    } : {}),
                    backgroundColor: this.props.settings.theme.dynamic.screen.secondaryBgC,
                }}
            >
                <Text style={{
                    ...TimePickerStyles.displayText,
                    color: this.props.settings.theme.dynamic.text.mainC,
                    fontSize: this.props.highlight ? 24 : 36,
                }}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Display);
