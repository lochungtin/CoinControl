import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/headers/minimal';

import { ScreenStyles, SettingsStyles } from './styles';

import { ReduxPropType } from '../types/redux';
import { ScreenProps, SettingsCategory, SettingsItem } from '../types/ui';
import { itemlist, SettingsPickers, SettingsResets, SettingsSwitches } from '../data/mapping/settings';
import { smallKeygen } from '../utils/keygen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Screen extends React.Component<ReduxPropType & ScreenProps> {


    onSwitchToggle = (type: SettingsSwitches, on: boolean) => { }

    onReset = (type: SettingsResets) => { }

    openPicker = (type: SettingsPickers) => { }

    signOut = () => { }

    render() {
        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                <Header name='settings' navigation={this.props.navigation} />
                <ScrollView>
                    {itemlist(
                        this.props.account !== null,
                        this.onSwitchToggle,
                        this.onReset,
                        this.openPicker,
                        this.props.navigation,
                        this.props.settings,
                        this.signOut,
                    ).map((category: SettingsCategory) => {
                        return (
                            <View key={smallKeygen()} style={SettingsStyles.root}>
                                <View style={SettingsStyles.itemBox}>
                                    <Text style={{ ...SettingsStyles.header, color: this.props.theme.dynamic.text.labelC }}>
                                        {category.header.toUpperCase()}
                                    </Text>
                                </View>
                                {category.body.map((item: SettingsItem) => {
                                    return (
                                        <View key={smallKeygen()} style={{ ...SettingsStyles.colorBox, backgroundColor: this.props.theme.dynamic.screen.secondaryBgC }}>
                                            <View style={{ ...SettingsStyles.itemBox }}>
                                                <Icon
                                                    color={this.props.theme.static.accentC}
                                                    name={item.icon}
                                                    size={25}
                                                />
                                                <Text style={{ ...SettingsStyles.label, color: this.props.theme.dynamic.text.mainC }}>
                                                    {item.label}
                                                </Text>
                                                <Icon
                                                    color={this.props.theme.dynamic.icon.actionC}
                                                    name='chevron-right'
                                                    size={30}
                                                />
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    account: state.account,
    settings: state.settings,
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
