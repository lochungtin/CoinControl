import React from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../components/headers/minimal';
import PromptModal from '../components/modals/prompt';

import { WHITE } from '../data/color';
import { ScreenStyles, SettingsStyles } from './styles';

import { itemlist, SettingsPickers, SettingsSwitches } from '../data/mapping/settings';
import { setDarkMode, setLightMode } from '../redux/action';
import { store } from '../redux/store';
import { ReduxPropType } from '../types/redux';
import { ScreenProps, SettingsCategory, SettingsItem } from '../types/ui';
import { smallKeygen } from '../utils/keygen';
import { Prompt } from '../data/prompts';

class Screen extends React.Component<ReduxPropType & ScreenProps> {

    state = {
        prompt: -1
    }

    confirmReset = (prompt: Prompt, dnsa: boolean) => {
        switch (prompt) {
            case Prompt.DEFAULT_CATEGORIES:
                break;
            case Prompt.DEFAULT_SETTINGS:
                break;
            case Prompt.CLEAR_DATA:
                break;
            default:
                break;
        }
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

    openPicker = (type: SettingsPickers) => { }

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
