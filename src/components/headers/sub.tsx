import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { ReduxThemeType } from '../../types/redux';
import { SubHeaderStyles } from './styles';

interface DataProps {
    highlight?: boolean
    label: string,
}

class Header extends React.Component<ReduxThemeType & DataProps> {
    render() {
        return (
            <View style={SubHeaderStyles.root}>
                <Text style={{ ...SubHeaderStyles.label, color: this.props.highlight ? this.props.theme.static.accentC : this.props.theme.dynamic.text.labelC }}>
                    {this.props.label.toUpperCase()}
                </Text>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Header);
