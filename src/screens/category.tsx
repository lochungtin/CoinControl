import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { ScreenStyles } from './styles';

import { ReduxPropType } from '../types/redux';

class Screen extends React.Component<ReduxPropType> {
    render() {
        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>

            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
