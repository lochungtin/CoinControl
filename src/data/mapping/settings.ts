import { Categories, SettingsType } from "../../types/data";
import { SettingsCategory } from "../../types/ui";
import { defaultSettings } from "../default";

export enum SettingsPickers {
    CURRENCY,
    TIME,
}

export enum SettingsSwitches {
    DARK_MODE,
    NOTIF,
}

export enum SettingsResets {
    CATEGORIES,
    EVERYTHING,
    SETTINGS,
}

export const itemlist = (
    isSignedIn: boolean,
    onSwitchToggle: (type: SettingsSwitches, on: boolean) => void,
    onReset: (type: SettingsResets) => void,
    openPicker: (type: SettingsPickers) => void,
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
                    onPress: () => openPicker(SettingsPickers.CURRENCY),
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
                    switch: true,
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
                    label: 'Expense Categories',
                    onPress: (value: boolean) => onSwitchToggle(SettingsSwitches.NOTIF, value),
                    switch: settings.notif
                },
                {
                    blurred: settings.notif,
                    icon: 'subdirectory-arrow-right',
                    label: settings.notifTime,
                    onPress: () => openPicker(SettingsPickers.TIME),
                },
            ],
        },
        {
            header: 'danger zone',
            body: [
                {
                    icon: 'tag-off-outline',
                    label: 'Reset Categories',
                    onPress: () => onReset(SettingsResets.CATEGORIES),
                },
                {
                    icon: 'cog-refresh-outline',
                    label: 'Reset Settings',
                    onPress: () => onReset(SettingsResets.SETTINGS),
                },
                {
                    icon: 'alert-circle-outline',
                    label: 'CLEAR ALL DATA',
                    onPress: () => onReset(SettingsResets.EVERYTHING),
                },
            ],
        },
    ];