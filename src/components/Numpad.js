import React from 'react';
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import NumpadButton from './NumpadButton';
import { black, numpadStyles, styles, white, } from '../styles';

class Numpad extends React.Component {

    render() {
        return (
            <View style={numpadStyles.numpadRoot}>
                <View style={numpadStyles.numpadRow}>
                    <NumpadButton />
                    <NumpadButton />
                    <NumpadButton />
                    <NumpadButton />
                </View>
                <View style={numpadStyles.numpadRow}>
                    <NumpadButton />
                    <NumpadButton />
                    <NumpadButton />
                    <NumpadButton />
                </View>
                <View style={numpadStyles.numpadRow}>
                    <NumpadButton />
                    <NumpadButton />
                    <NumpadButton />
                    <NumpadButton />
                </View>
                <View style={numpadStyles.numpadRow}>
                    <NumpadButton />
                    <NumpadButton />
                    <NumpadButton />
                    <NumpadButton />
                </View>
            </View>        
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Numpad);