import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { ReduxPropType } from '../types/redux';

class AppNav extends React.Component<ReduxPropType> {

    constructor(props: ReduxPropType) {
        super(props);
        // store.dispatch(setDarkMode());
    }

    render() {
        return (
            <View style={{ backgroundColor: this.props.theme.dynamic.screen.bgC, flex: 1, }}>

            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(AppNav);
