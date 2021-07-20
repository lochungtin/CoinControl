import { combineReducers } from 'redux';

import { Actions } from './action';

import { defaultCategories, defaultSettings, defaultTheme } from '../data/default';
import { darkTheme, lightTheme } from '../data/theme';

import { ThemeType } from '../types/color';
import { AccountType, CategoryStore, DataMap, DataType, SettingsType } from '../types/data';
import { ReduxActionType } from '../types/redux';
import { colorPickerData } from '../data/color';
import { DisplaySectionType } from '../types/ui';

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

const updateCategories = (categories: CategoryStore = defaultCategories, action: ReduxActionType) => {
    let update: CategoryStore = { ...categories };
    switch (action.type) {
        // add or edit
        case Actions.CATEGORY_ADD:
        case Actions.CATEGORY_EDIT:
            update[action.payload.category][action.payload.data.key] = action.payload.data;
            return update;
        // delete
        case Actions.CATEGORY_DELETE:
            delete update[action.payload.category][action.payload.key];
            return update;
        // set default
        case Actions.DEFAULT_CATEGORIES:
            return defaultCategories;
        // default
        default:
            return categories;
    }
}

const updateData = (data: DataMap = {}, action: ReduxActionType) => {
    let update: DataMap = { ...data };
    switch (action.type) {
        // add or edit
        case Actions.RECORD_ADD:
        case Actions.RECORD_EDIT:
            update[action.payload.key] = action.payload;
            return update;
        // delete
        case Actions.RECORD_DELETE:
            delete update[action.payload.key];
            return update;
        // delete category - set category to other
        case Actions.CATEGORY_DELETE:
            Object.keys(update).forEach((key: string) => {
                let record: DataType = update[key];
                if (record.categoryKey === action.payload.key)
                    record.categoryKey = 'C0000000';
            });
            return update;
        // default
        default:
            return data;
    }
}

const updateDisplay = (display: Array<DisplaySectionType> = [], action: ReduxActionType) => {
    let update: Array<DisplaySectionType> = [...display];

    let sectionIndex = update.findIndex((section: DisplaySectionType) => section.date === action.payload.date);
    let section: DisplaySectionType;

    if (sectionIndex === -1) 
        section = { date: action.payload.date, keys: [] }
    else 
        section = update[sectionIndex];

    switch (action.type) {
        // add record
        case Actions.RECORD_ADD:
            section.keys.push(action.payload);
            return update;
        // delete record
        case Actions.RECORD_DELETE:
            return update;
        // edit record
        case Actions.RECORD_EDIT:
            // let oldSectionIndex = update.findIndex((section: DisplaySectionType) => section.date === action.payload.date);
            return update;
        // default
        default:
            return display;
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
        // set notif on
        case Actions.SETTINGS_SET_NOTIF_ON:
            update.notif = action.payload;
            return update;
        // set notif time
        case Actions.SETTINGS_SET_NOTIF_TIME:
            update.notifTime = action.payload;
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
    categories: updateCategories,
    theme: updateTheme,
    settings: updateSettings,
});
