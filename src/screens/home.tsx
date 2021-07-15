import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { ScreenStyles } from './styles';

import { ReduxPropType } from '../types/redux';
import { ScreenProps } from '../types/uiprops';

class Screen extends React.Component<ReduxPropType & ScreenProps> {

    componentDidMount() {
        this.props.navigation.closeDrawer()
        this.props.navigation.openDrawer();
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                <TouchableOpacity
                    onPress={this.props.navigation.toggleDrawer}
                    style={{ marginTop: 100, height: 100, width: 200, backgroundColor: '#00FFB4' }}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
