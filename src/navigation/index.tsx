import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ColorPicker from '../components/pickers/color';

import { ReduxPropType } from '../types/redux';

class AppNav extends React.Component<ReduxPropType> {
    render() {
        return (
            <View>
                <ColorPicker selected={this.props.settings.theme.static.accentC} />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(AppNav);
