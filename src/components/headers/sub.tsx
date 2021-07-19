import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { ReduxPropType } from '../../types/redux';
import { SubHeaderStyles } from './styles';

interface DataProps {
    label: string,
}

class Header extends React.Component<ReduxPropType & DataProps> {
    render() {
        return (
            <View style={SubHeaderStyles.root}>
                <Text style={{ ...SubHeaderStyles.label, color: this.props.theme.dynamic.text.labelC }}>
                    {this.props.label.toUpperCase()}
                </Text>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Header);
