import { combineReducers } from 'redux';

import { Actions } from './action';

import { defaultSettings, defaultTheme } from '../data/default';
import { darkTheme, lightTheme } from '../data/theme';

import { ThemeType } from '../types/color';
import { ReduxActionType, SettingsType } from '../types/redux';

const updateSettings = (settings: SettingsType = defaultSettings, action: ReduxActionType) => {
    let update: SettingsType = { ...settings };
    switch (action.type) {
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
    theme: updateTheme,
    settings: updateSettings,
});
