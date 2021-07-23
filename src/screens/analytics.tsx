import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/headers/minimal';
import Cashflow from '../components/card/cashflow';

import { ScreenStyles } from './styles';

import { ReduxThemeType } from '../types/redux';
import { ScreenProps } from '../types/ui';

class Screen extends React.Component<ReduxThemeType & ScreenProps> {
    render() {
        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                <Header name='analytics' navigation={this.props.navigation} />
                <ScrollView>
                    <View style={ScreenStyles.scrollView}>
                        <Cashflow />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
