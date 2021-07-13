import { combineReducers } from 'redux';

import { defaultSettings } from '../data/default';
import { darkTheme, lightTheme } from '../data/theme';
import { ReduxActionType, SettingsType } from '../types/redux';
import { Actions } from './action';

const updateSettings = (settings: SettingsType = defaultSettings, action: ReduxActionType) => {
    let update = { ...settings };
    switch (action.type) {
        // set dark theme
        case Actions.SETTINGS_SET_DARKMODE:
            update.theme = darkTheme;
            return update;
        // set light theme
        case Actions.SETTINGS_SET_LIGHTMODE:
            update.theme = lightTheme;
            return update;
        // default 
        default:
            return settings;
    }
}

export default combineReducers({
    settings: updateSettings,
});
