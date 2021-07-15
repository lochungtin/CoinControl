import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { ScreenStyles } from './styles';

import { ReduxPropType } from '../types/redux';
import { ScreenProps } from '../types/uiprops';

class Screen extends React.Component<ReduxPropType & ScreenProps> {

    componentDidMount() {
        this.props.navigation.openDrawer();
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
