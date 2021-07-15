import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { ReduxPropType } from '../types/redux';

import Component from '../components/modals/goal';

import { colorPickerData } from '../data/color';

import { store } from '../redux/store';
import { setDarkMode } from '../redux/action';
import { keygen } from '../utils/keygen';

class AppNav extends React.Component<ReduxPropType> {

    constructor(props: ReduxPropType) {
        super(props);
        // store.dispatch(setDarkMode());
    }

    render() {
        return (
            <View style={{ backgroundColor: this.props.settings.theme.dynamic.screen.bgC, flex: 1, }}>
                <Component
                    open
                />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(AppNav);
