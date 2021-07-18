import React from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../components/headers/minimal';
import PromptModal from '../components/modals/prompt';
import ColorPicker from '../components/pickers/color';
import MultiPicker from '../components/pickers/multi';
import TimePicker from '../components/pickers/time';

import { WHITE } from '../data/color';
import { ScreenStyles, SettingsStyles } from './styles';

import { defaultSettings } from '../data/default';
import { itemlist, SettingsPickers, SettingsSwitches } from '../data/mapping/settings';
import { Prompt } from '../data/prompts';
import { clearData, setAccent, setDarkMode, setDefaultCategories, setDefaultSettings, setLightMode } from '../redux/action';
import { store } from '../redux/store';
import { ReduxPropType } from '../types/redux';
import { ScreenProps, SettingsCategory, SettingsItem } from '../types/ui';
import { smallKeygen } from '../utils/keygen';

class Screen extends React.Component<ReduxPropType & ScreenProps> {

    state = {
        colorPickerOpen: false,
        prompt: -1,
        timePickerOpen: false,
    }

    confirmReset = (prompt: Prompt, dnsa: boolean) => {
        switch (prompt) {
            case Prompt.DEFAULT_CATEGORIES:
                store.dispatch(setDefaultCategories());
                break;
            case Prompt.DEFAULT_SETTINGS:
                store.dispatch(setDefaultSettings());
                break;
            case Prompt.CLEAR_DATA:
                store.dispatch(clearData());
                break;
            default:
                break;
        }
        this.setState({ prompt: -1 });
    }

    onSwitchToggle = (type: SettingsSwitches, on: boolean) => {
        if (type === SettingsSwitches.DARK_MODE)
            store.dispatch(on ? setDarkMode() : setLightMode());
    }

    onReset = (prompt: Prompt) => {
        if (this.props.settings?.promptTrigger[prompt]) {
            this.setState({ prompt });
        }
        else {
            this.confirmReset(prompt, false);
        }
    }

    openPicker = (type: SettingsPickers) => {
        switch (type) {
            case SettingsPickers.TIME:
                this.setState({ timePickerOpen: true });
                break;
            case SettingsPickers.COLOR:
                this.setState({ colorPickerOpen: true });
                break;
        }
    }

    setAccentColor = (accent: string) => {
        store.dispatch(setAccent(accent));
        this.setState({ colorPickerOpen: false });
    }

    setNotifTime = (time: string) => {
        this.setState({ timePickerOpen: false });
    }

    signOut = () => { }

    render() {
        return (
            <>
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
                                                            trackColor={{ false: this.props.theme.static.icon.actionC, true: this.props.theme.static.icon.actionC }}
                                                            value={item.switch}
                                                        />
                                                        :
                                                        <Icon
                                                            color={this.props.theme.static.icon.actionC}
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
                <ColorPicker
                    onClose={() => this.setState({ colorPickerOpen: false })}
                    onSelect={this.setAccentColor}
                    open={this.state.colorPickerOpen}
                    selected={this.props.theme.static.accentC}
                />
                <TimePicker
                    am={this.props.settings?.notifTime.substring(6, 8) === 'AM'}
                    hour={parseInt((this.props.settings?.notifTime || defaultSettings.notifTime).substring(0, 2))}
                    minute={(this.props.settings?.notifTime || defaultSettings.notifTime).substring(3, 5)}
                    onClose={() => this.setState({ timePickerOpen: false })}
                    onSelect={this.setNotifTime}
                    open={this.state.timePickerOpen}
                />
                <PromptModal
                    onClose={() => this.setState({ prompt: -1 })}
                    onConfirm={(dnsa: boolean) => this.confirmReset(this.state.prompt, dnsa)}
                    open={this.state.prompt !== -1}
                    prompt={this.state.prompt}
                />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxPropType) => ({
    account: state.account,
    settings: state.settings,
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
