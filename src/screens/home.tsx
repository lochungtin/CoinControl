import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/headers/home';
import SubHeader from '../components/headers/sub';

import { ScreenStyles } from './styles';

import { ReduxPropType } from '../types/redux';
import { ScreenProps } from '../types/ui';

class Screen extends React.Component<ReduxPropType & ScreenProps> {

    componentDidMount() {
        this.props.navigation.closeDrawer()
        this.props.navigation.openDrawer();
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                <Header navigation={this.props.navigation} />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
