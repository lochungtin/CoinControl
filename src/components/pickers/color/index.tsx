import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { ColorPickerStyles } from '../styles';

import { ReduxPropType } from '../../../types/redux';

class Picker extends React.Component<ReduxPropType> {
    render() {
        console.log(this.props.settings)
        return (
            <View style={ColorPickerStyles.stack}>
                <View style={{
                    backgroundColor: undefined,
                    height: 219.4,
                    width: 380,
                }}/>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Picker);
