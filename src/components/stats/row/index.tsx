import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { RowStyles } from './styles';

import { SettingsType } from '../../../types/data';
import { ReduxThemeType } from '../../../types/redux';

interface AdditionalReduxType {
    settings: SettingsType,
}

interface DataProps {
    bold?: boolean,
    label: string,
    noCurrency?: boolean,
    value: number,
}

class Row extends React.Component<ReduxThemeType & AdditionalReduxType & DataProps> {
    render() {
        return (
            <View style={{ ...RowStyles.root, borderBottomColor: this.props.theme.dynamic.screen.bgC }}>
                <View style={RowStyles.textBox}>
                    <Icon
                        color={this.props.theme.static.accentC}
                        name='chevron-right'
                        size={30}
                    />
                    <Text style={{
                        ...RowStyles.text,
                        color: this.props.theme.static.accentC,
                        fontWeight: this.props.bold ? 'bold' : 'normal',
                    }}>
                        {this.props.label}
                    </Text>
                </View>
                <View style={RowStyles.textBox}>
                    {!this.props.noCurrency && <Icon
                        color={this.props.theme.dynamic.text.mainC}
                        name={this.props.settings.currency.icon}
                        size={20}
                    />}
                    <Text style={{
                        ...RowStyles.text,
                        color: this.props.theme.dynamic.text.mainC,
                        fontWeight: this.props.bold ? 'bold' : 'normal',
                    }}>
                        {this.props.value.toFixed(2)}
                    </Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType & AdditionalReduxType) => ({
    settings: state.settings,
    theme: state.theme,
});

export default connect(mapStateToProps)(Row);
