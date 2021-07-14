import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { ReduxPropType } from '../types/redux';

import Component from '../components/numpad';
import moment from 'moment';
import { colorPickerData } from '../data/color';
import { keygen } from '../utils/keygen';

class AppNav extends React.Component<ReduxPropType> {

    render() {
        return (
            <View style={{ backgroundColor: this.props.settings.theme.dynamic.screen.bgC, flex: 1, }}>
                <Component 

                />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(AppNav);
