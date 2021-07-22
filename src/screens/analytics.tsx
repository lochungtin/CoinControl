import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { ReduxThemeType } from '../types/redux';

class Screen extends React.Component<ReduxThemeType> {
    render() {
        return (
            <View>

            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
