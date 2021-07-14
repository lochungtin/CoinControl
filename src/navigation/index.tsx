import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { ReduxPropType } from '../types/redux';

import DatePicker from '../components/pickers/date';
import moment from 'moment';

class AppNav extends React.Component<ReduxPropType> {

    render() {
        return (
            <View style={{ backgroundColor: this.props.settings.theme.dynamic.screen.bgC, flex: 1, }}>
                <DatePicker
                    open
                    onClose={() => { }}
                    onSelect={console.log}
                    selected={'22-07-2021'}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(AppNav);
