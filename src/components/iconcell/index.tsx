import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { ReduxPropType } from '../../types/redux';

class Cell extends React.Component<ReduxPropType> {
    render() {
        return (
            <View>

            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Cell);
