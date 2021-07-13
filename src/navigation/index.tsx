import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from '../components/pickers/date';

import { ReduxPropType } from '../types/redux';

class AppNav extends React.Component<ReduxPropType> {

    state = {
        selected: '24-07-2021',
    }

    render() {
        return (
            <View style={{backgroundColor: this.props.settings.theme.dynamic.screen.bgC, flex: 1,}}>
                <DatePicker
                    onClose={() => {}}
                    onSelect={(selected: string) => this.setState({ selected })}
                    open={true}
                    selected={this.state.selected}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(AppNav);
