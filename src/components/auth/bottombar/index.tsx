import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { ReduxThemeType } from '../../../types/redux';
import { BottomBarStyles } from './styles';

interface DataProps {
    onPress: () => void,
    pressable: string,
    text: string,
}

class BTMBar extends React.Component<ReduxThemeType & DataProps> {
    render() {
        return (
            <View style={BottomBarStyles.root}>
                <Text style={{ ...BottomBarStyles.text, color: this.props.theme.dynamic.text.mainC }}>
                    {this.props.text}
                </Text>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Text style={{ ...BottomBarStyles.pressable, color: this.props.theme.static.accentC }}>
                        {this.props.pressable}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(BTMBar);
