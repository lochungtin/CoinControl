import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { ReduxPropType } from '../../../types/redux';

class BTMBar extends React.Component<ReduxPropType> {
    render() {
        return (
            <View>

            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(BTMBar);