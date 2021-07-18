import React from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/headers/minimal';

import { ScreenStyles, SettingsStyles } from './styles';

import { ReduxPropType } from '../types/redux';
import { ScreenProps, SettingsCategory, SettingsItem } from '../types/ui';
import { itemlist, SettingsPickers, SettingsResets, SettingsSwitches } from '../data/mapping/settings';
import { smallKeygen } from '../utils/keygen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WHITE } from '../data/color';
import { TouchableOpacity } from 'react-native';
import { store } from '../redux/store';
import { setDarkMode, setLightMode } from '../redux/action';

class Screen extends React.Component<ReduxPropType & ScreenProps> {


    onSwitchToggle = (type: SettingsSwitches, on: boolean) => {
        if (type === SettingsSwitches.DARK_MODE)
            store.dispatch(on ? setDarkMode() : setLightMode());
    }

    onReset = (type: SettingsResets) => { }

    openPicker = (type: SettingsPickers) => { }

    signOut = () => { }

    render() {
        console.log(this.props.settings);
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
                                        <View
                                            key={smallKeygen()}
                                            style={{
                                                ...SettingsStyles.colorBox,
                                                backgroundColor: this.props.theme.dynamic.screen.secondaryBgC,
                                                opacity: item.blurred ? 0.5 : 1,
                                            }}
                                        >
                                            <TouchableOpacity onPress={() => item.onPress(!item.switch)} style={{ ...SettingsStyles.itemBox }}>
                                                <Icon
                                                    color={this.props.theme.static.accentC}
                                                    name={item.icon}
                                                    size={25}
                                                />
                                                <Text style={{ ...SettingsStyles.label, color: this.props.theme.dynamic.text.mainC }}>
                                                    {item.label}
                                                </Text>
                                                {item.switch !== undefined ?
                                                    <Switch
                                                        onValueChange={item.onPress}
                                                        thumbColor={item.switch ? this.props.theme.static.accentC : WHITE}
                                                        trackColor={{ false: this.props.theme.dynamic.icon.actionC, true: this.props.theme.dynamic.icon.actionC }}
                                                        value={item.switch}
                                                    />
                                                    :
                                                    <Icon
                                                        color={this.props.theme.dynamic.icon.actionC}
                                                        name='chevron-right'
                                                        size={30}
                                                    />

                                                }
                                            </TouchableOpacity>
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
