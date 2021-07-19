import { Categories, SettingsType } from "../../types/data";
import { SettingsCategory } from "../../types/ui";
import { defaultSettings } from "../default";
import { Prompt } from "../prompts";

export enum SettingsPickers {
    COLOR,
    TIME,
}

export enum SettingsSelects {
    PROMPT,
    CURRENCY,
}

export enum SettingsSwitches {
    DARK_MODE,
    NOTIF,
}

export const itemlist = (
    isSignedIn: boolean,
    onSwitchToggle: (type: SettingsSwitches, on: boolean) => void,
    onReset: (type: Prompt) => void,
    openPicker: (type: SettingsPickers) => void,
    openSelect: (type: SettingsSelects) => void,
    navigation: any,
    settings: SettingsType = defaultSettings,
    signOut: () => void,
): Array<SettingsCategory> => [
        {
            header: 'account',
            body: [
                {
                    icon: 'account',
                    label: isSignedIn ? 'Sign Out' : 'Sign In',
                    onPress: () => {
                        if (isSignedIn)
                            signOut();
                        else
                            navigation.navigate('signin');
                    },
                },
            ],
        },
        {
            header: 'general',
            body: [
                {
                    icon: settings.currency.icon,
                    label: 'Currency Label',
                    onPress: () => openSelect(SettingsSelects.CURRENCY),
                },
            ],
        },
        {
            header: 'themes',
            body: [
                {
                    icon: 'lightbulb-outline',
                    label: 'Dark Mode',
                    onPress: (value: boolean) => onSwitchToggle(SettingsSwitches.DARK_MODE, value),
                    switch: settings.darkMode,
                },
                {
                    icon: 'palette',
                    label: 'Accent Color',
                    onPress: () => openPicker(SettingsPickers.COLOR),
                },
            ],
        },
        {
            header: 'categories',
            body: [
                {
                    icon: 'tag',
                    label: 'Expense Categories',
                    onPress: () => navigation.navigate('category', Categories.EXPENSE),
                },
                {
                    icon: 'tag-outline',
                    label: 'Income Categories',
                    onPress: () => navigation.navigate('category', Categories.INCOME),
                },
            ],
        },
        {
            header: 'advanced',
            body: [
                {
                    icon: 'bell-outline',
                    label: 'Daily Notifications',
                    onPress: (value: boolean) => onSwitchToggle(SettingsSwitches.NOTIF, value),
                    switch: settings.notif
                },
                {
                    blurred: !settings.notif,
                    icon: 'subdirectory-arrow-right',
                    label: settings.notifTime,
                    onPress: () => openPicker(SettingsPickers.TIME),
                },
                {
                    icon: 'comment-text-outline',
                    label: 'Pop Up Warnings',
                    onPress: () => openSelect(SettingsSelects.PROMPT),
                },
            ],
        },
        {
            header: 'danger zone',
            body: [
                {
                    icon: 'tag-off-outline',
                    label: 'Reset Categories',
                    onPress: () => onReset(Prompt.DEFAULT_CATEGORIES),
                },
                {
                    icon: 'cog-refresh-outline',
                    label: 'Reset Settings',
                    onPress: () => onReset(Prompt.DEFAULT_SETTINGS),
                },
                {
                    icon: 'alert-circle-outline',
                    label: 'CLEAR ALL DATA',
                    onPress: () => onReset(Prompt.CLEAR_DATA),
                },
            ],
        },
    ];