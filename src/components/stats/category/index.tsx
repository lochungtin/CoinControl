import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { WHITE } from '../../../data/color';
import { CategoryStyles } from './styles';

import { CategoryType, SettingsType } from '../../../types/data';
import { ReduxThemeType } from '../../../types/redux';

interface AdditionalReduxType {
    settings: SettingsType,
}

interface DataProps {
    category: CategoryType,
    onPress: () => void,
}

class Row extends React.Component<ReduxThemeType & AdditionalReduxType & DataProps> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={CategoryStyles.category}>
                <View style={{ ...CategoryStyles.icon, backgroundColor: this.props.category.color }}>
                    <Icon
                        color={WHITE}
                        name={this.props.category.icon}
                        size={20}
                    />
                </View>
                <Text style={{ ...CategoryStyles.text, color: this.props.theme.dynamic.text.mainC }}>
                    {this.props.category.name.toUpperCase()}
                </Text>
            </TouchableOpacity>
        );
    }
}
const mapStateToProps = (state: ReduxThemeType & AdditionalReduxType) => ({
    settings: state.settings,
    theme: state.theme,
});

export default connect(mapStateToProps)(Row);
