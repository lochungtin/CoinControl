import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { ReduxPropType } from '../../../types/redux';
import { DatePickerStyles } from '../styles';

interface DataProps {
    data: string
    highlight: boolean
    key: string
    onPress: (date: string) => void,
}

class Cell extends React.Component<ReduxPropType & DataProps> {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress(this.props.data)} style={DatePickerStyles.cell}>
                <Text style={{ color: this.props.settings.theme.dynamic.text.mainC }}>
                    {parseInt(this.props.data.substring(0, 2))}
                </Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Cell);
