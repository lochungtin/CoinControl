import { combineReducers } from 'redux';

import { Actions } from './action';

import { defaultCategories, defaultData, defaultSettings, defaultTheme } from '../data/default';
import { darkTheme, lightTheme } from '../data/theme';

import { ThemeType } from '../types/color';
import { AccountType, CategoryStore, DataMap, DataStore, DataType, SettingsType } from '../types/data';
import { ReduxActionType } from '../types/redux';
import { colorPickerData } from '../data/color';
import { DisplaySectionType } from '../types/ui';
import moment from 'moment';

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

const updateData = (data: DataStore = defaultData, action: ReduxActionType) => {
    let update: DataStore = { ...data };
    switch (action.type) {
        // clear all
        case Actions.CLEAR_DATA:
            return defaultData;
        // add or edit
        case Actions.RECORD_ADD:
        case Actions.RECORD_EDIT:
            update.data[action.payload.key] = action.payload;
            break;
        // delete
        case Actions.RECORD_DELETE:
            delete update.data[action.payload.key];
            break;
        // delete category - set category to other
        case Actions.CATEGORY_DELETE:
            Object.keys(update).forEach((key: string) => {
                let record: DataType = update.data[key];
                if (record.categoryKey === action.payload.key)
                    record.categoryKey = 'C0000000';
            });
            break;
        // set goal
        case Actions.GOAL_SET:
            update.stats.goal.config = action.payload;
            return update;
        // default
        default:
            return data;
    }
    // update stats
    return update;
}

const updateDisplay = (display: Array<DisplaySectionType> = [], action: ReduxActionType) => {
    if (!action.payload)
        return display;

    let update: Array<DisplaySectionType> = [...display];

    let sectionIndex = update.findIndex((section: DisplaySectionType) => section.date === action.payload.date);

    if (sectionIndex === -1) {
        sectionIndex = update.length;
        update.push({ date: action.payload.date, keys: [] });
    }

    switch (action.type) {
        // clear all
        case Actions.CLEAR_DATA:
            return [];
        // add record
        case Actions.RECORD_ADD:
            update[sectionIndex].keys.push(action.payload.key);
            break;
        // delete record
        case Actions.RECORD_DELETE:
            break;
        // edit record
        case Actions.RECORD_EDIT:
            // let oldSectionIndex = update.findIndex((section: DisplaySectionType) => section.date === action.payload.date);
            break;
        // default
        default:
            return display;
    }
    update.sort((a: DisplaySectionType, b: DisplaySectionType) => moment(b.date, 'DD-MM-YYYY').isAfter(moment(a.date, 'DD-MM-YYYY')) ? 1 : -1);
    return update;
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
    data: updateData,
    display: updateDisplay,
    theme: updateTheme,
    settings: updateSettings,
});
