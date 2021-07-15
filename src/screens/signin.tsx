import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/headers/auth';

import { ReduxPropType } from '../types/redux';

class Screen extends React.Component<ReduxPropType> {
    render() {
        return (
            <View>
                <Header />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
