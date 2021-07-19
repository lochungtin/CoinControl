import React from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../components/headers/minimal';
import SubHeader from '../components/headers/sub';
import PromptModal from '../components/modals/prompt';
import ColorPicker from '../components/pickers/color';
import MultiPicker from '../components/pickers/multi';
import TimePicker from '../components/pickers/time';

import { WHITE } from '../data/color';
import { ScreenStyles, SettingsStyles } from './styles';

import { currencyData } from '../data/currency';
import { defaultSettings } from '../data/default';
import { itemlist, SettingsPickers, SettingsSelects, SettingsSwitches } from '../data/mapping/settings';
import { Prompt, promptNames } from '../data/prompts';
import {
    clearData,
    setAccent,
    setCurrency,
    setDarkMode,
    setDefaultCategories,
    setDefaultSettings,
    setLightMode,
    setNotifOn,
    setNotifTime,
    setPromptShow,
} from '../redux/action';
import { store } from '../redux/store';
import { CurrencyType } from '../types/data';
import { ReduxPropType } from '../types/redux';
import { ScreenProps, SettingsCategory, SettingsItem } from '../types/ui';
import { smallKeygen } from '../utils/keygen';

class Screen extends React.Component<ReduxPropType & ScreenProps> {

    state = {
        colorPickerOpen: false,
        multiPickerOpen: -1,
        multiPickerData: [],
        multiPickerSelected: [],
        prompt: -1,
        timePickerOpen: false,
    }

    confirmReset = (prompt: Prompt, show: boolean) => {
        store.dispatch(setPromptShow({ prompt, show }));
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

    multiSelectRender = (obj: any) => {
        switch (this.state.multiPickerOpen) {
            case SettingsSelects.CURRENCY:
                let currency: CurrencyType = obj;
                return (
                    <View style={SettingsStyles.currencyItem}>
                        <Icon
                            color={this.props.theme.static.accentC}
                            name={currency.icon}
                            size={30}
                        />
                        <Text style={{ ...SettingsStyles.currencyText, color: this.props.theme.dynamic.text.mainC }}>
                            {currency.name}
                        </Text>
                    </View>
                );
            case SettingsSelects.PROMPT:
                let prompt: number = obj;
                return (
                    <View style={SettingsStyles.currencyItem}>
                        <Icon
                            color={this.props.theme.static.accentC}
                            name={this.props.settings?.promptTrigger[prompt] ? 'text-box' : 'text-box-remove-outline'}
                            size={30}
                        />
                        <Text style={{ ...SettingsStyles.currencyText, color: this.props.theme.dynamic.text.mainC }}>
                            {promptNames[prompt]}
                        </Text>
                    </View>
                );
            default:
                return <View />;
        }
    }

    multiSelected = (obj: any) => {
        if (this.state.multiPickerOpen === SettingsSelects.CURRENCY) {
            store.dispatch(setCurrency(obj));
            this.setState({ multiPickerOpen: -1 });
        }
        if (this.state.multiPickerOpen === SettingsSelects.PROMPT)
            store.dispatch(setPromptShow({ prompt: obj, show: !this.props.settings?.promptTrigger[obj] }));
    }

    onSwitchToggle = (type: SettingsSwitches, on: boolean) => {
        if (type === SettingsSwitches.DARK_MODE)
            store.dispatch(on ? setDarkMode() : setLightMode());
        if (type === SettingsSwitches.NOTIF)
            store.dispatch(setNotifOn(on));
    }

    onReset = (prompt: Prompt) => {
        if (this.props.settings?.promptTrigger[prompt])
            this.setState({ prompt });
        else
            this.confirmReset(prompt, false);
    }

    openPicker = (type: SettingsPickers) => {
        if (type === SettingsPickers.TIME)
            return this.setState({ timePickerOpen: true });
        if (type === SettingsPickers.COLOR)
            return this.setState({ colorPickerOpen: true });
    }

    setAccentColor = (accent: string) => {
        store.dispatch(setAccent(accent));
        this.setState({ colorPickerOpen: false });
    }

    setNotifTime = (time: string) => {
        store.dispatch(setNotifTime(time));
        this.setState({ timePickerOpen: false });
    }

    signOut = () => { }

    render() {
        let data: Array<any> = [];
        let selected: Array<number> = [];
        if (this.state.multiPickerOpen === SettingsSelects.CURRENCY) {
            data = Object.keys(currencyData).map((key: string) => currencyData[key]);
            selected = [data.findIndex((cur: CurrencyType) => cur.key === this.props.settings?.currency.key)];
        }

        if (this.state.multiPickerOpen === SettingsSelects.PROMPT) {
            data = Object.keys(this.props.settings?.promptTrigger || []);
            selected = [];
        }

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
                            (multiPickerOpen: SettingsSelects) => this.setState({ multiPickerOpen }),
                            this.props.navigation,
                            this.props.settings,
                            this.signOut,
                        ).map((category: SettingsCategory) => {
                            return (
                                <View key={smallKeygen()} style={SettingsStyles.root}>
                                    <SubHeader label={category.header} />
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
                                                <TouchableOpacity onPress={() => item.onPress(!item.switch)} style={SettingsStyles.itemBox}>
                                                    <Icon
                                                        color={this.props.theme.static.accentC}
                                                        name={item.icon}
                                                        size={25}
                                                    />
                                                    <Text style={{ ...SettingsStyles.label, color: this.props.theme.dynamic.text.mainC }}>
                                                        {item.label}
                                                    </Text>
                                                    <View style={SettingsStyles.itemRight}>
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
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    })}
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
                <MultiPicker
                    items={data}
                    onClose={() => this.setState({ multiPickerOpen: -1 })}
                    onSelect={this.multiSelected}
                    open={this.state.multiPickerOpen !== -1}
                    selectedIndices={selected}
                    render={this.multiSelectRender}
                />
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
                    onConfirm={(dnsa: boolean) => this.confirmReset(this.state.prompt, !dnsa)}
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
