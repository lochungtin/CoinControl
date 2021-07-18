import { combineReducers } from 'redux';

import { Actions } from './action';

import { defaultSettings, defaultTheme } from '../data/default';
import { darkTheme, lightTheme } from '../data/theme';

import { ThemeType } from '../types/color';
import { AccountType, SettingsType } from '../types/data';
import { ReduxActionType } from '../types/redux';

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
        // set dark theme
        case Actions.SETTINGS_SET_DARKMODE:
            update.darkMode = true;
            return update;
        // set light theme
        case Actions.SETTINGS_SET_LIGHTMODE:
            update.darkMode = false;
            return update;
        default:
            return settings;
    }
}

const updateTheme = (theme: ThemeType = defaultTheme, action: ReduxActionType) => {
    switch (action.type) {
        // set dark theme
        case Actions.SETTINGS_SET_DARKMODE:
            return darkTheme;
        // set light theme
        case Actions.SETTINGS_SET_LIGHTMODE:
            return lightTheme;
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
