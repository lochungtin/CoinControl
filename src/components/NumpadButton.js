import React from 'react';
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { black, numpadStyles, white, } from '../styles';

class NumpadButton extends React.Component {

    render() {
        return (
            <View style={numpadStyles.button}>

            </View>        
        )
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(NumpadButton);