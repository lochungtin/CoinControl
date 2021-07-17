import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/headers/minimal';

import { ScreenStyles } from './styles';

import { ReduxPropType } from '../types/redux';
import { ScreenProps } from '../types/ui';

class Screen extends React.Component<ReduxPropType & ScreenProps> {
    render() {
        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                <Header name='settings' navigation={this.props.navigation}/>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
