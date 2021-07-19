import { combineReducers } from 'redux';

import { Actions } from './action';

import { defaultSettings, defaultTheme } from '../data/default';
import { darkTheme, lightTheme } from '../data/theme';

import { ThemeType } from '../types/color';
import { AccountType, SettingsType } from '../types/data';
import { ReduxActionType } from '../types/redux';
import { colorPickerData } from '../data/color';

const updateAccount = (account: AccountType | null = null, action: ReduxActionType) => {
    switch (action.type) {
        // sign in
        case Actions.ACCOUNT_SIGNIN:
            return action.payload;
        // sign out
        case Actions.ACCOUNT_SIGNOUT:
            return account;
        // default
        default:
            return account;
    }
}

const updateSettings = (settings: SettingsType = defaultSettings, action: ReduxActionType) => {
    let update: SettingsType = { ...settings };
    switch (action.type) {
        // set default
        case Actions.DEFAULT_SETTINGS:
            update = defaultSettings;
            for (let i: number = 0; i < 5; ++i)
                update.promptTrigger[i] = true;
            return defaultSettings;
        // set currency
        case Actions.SETTINGS_SET_CURRENCY:
            update.currency = action.payload;
            return update;
        // set dark theme
        case Actions.SETTINGS_SET_DARKMODE:
            update.darkMode = true;
            return update;
        // set light theme
        case Actions.SETTINGS_SET_LIGHTMODE:
            update.darkMode = false;
            return update;
        // set prompt show
        case Actions.SETTINGS_SET_PROMPT_SHOW:
            update.promptTrigger[action.payload.prompt] = action.payload.show;
            return update;
        default:
            return settings;
    }
}

const updateTheme = (theme: ThemeType = defaultTheme, action: ReduxActionType) => {
    let update: ThemeType = { ...theme };
    switch (action.type) {
        // set accent
        case Actions.THEME_ACCENT:
            update.static.accentC = action.payload;
            return update;
        // set default
        case Actions.DEFAULT_SETTINGS:
            update.static.accentC = colorPickerData['greens']['a'].hex;
        // set dark theme
        case Actions.SETTINGS_SET_DARKMODE:
            update.dynamic = darkTheme.dynamic;
            return update;
        // set light theme
        case Actions.SETTINGS_SET_LIGHTMODE:
            update.dynamic = lightTheme.dynamic;
            return update;
        // default 
        default:
            return theme;
    }
}

export default combineReducers({
    account: updateAccount,
    theme: updateTheme,
    settings: updateSettings,
});
