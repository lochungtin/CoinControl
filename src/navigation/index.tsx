import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { ReduxPropType } from '../types/redux';

import TimePicker from '../components/pickers/time';

class AppNav extends React.Component<ReduxPropType> {

    render() {
        return (
            <View style={{backgroundColor: this.props.settings.theme.dynamic.screen.bgC, flex: 1,}}>
                <TimePicker 
                    am={false}
                    hour={11}
                    minute={30}
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
