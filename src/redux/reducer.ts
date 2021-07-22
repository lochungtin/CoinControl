import moment from 'moment';
import { combineReducers } from 'redux';

import { Actions } from './action';

import { colorPickerData } from '../data/color';
import { clearCategories, defaultCategories, defaultData, defaultSettings, defaultTheme } from '../data/default';
import { darkTheme, lightTheme } from '../data/theme';

import { ThemeType } from '../types/color';
import { AccountType, Categories, CategoryStore, DataStore, DataType, SettingsType } from '../types/data';
import { ReduxActionType } from '../types/redux';
import { DisplaySectionType } from '../types/ui';
import { Goal } from '../data/goal';

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
            update.stats.balance = 0
            update.stats.categories = { ...clearCategories };
            update.stats.goal.config = {
                type: Goal.NONE,
                max: 10,
            };
            update.stats.goal.left = 10;
            update.stats.goal.used = 0;
            update.data = {};
            return update;
        // add
        case Actions.RECORD_ADD:
            update.data[action.payload.key] = action.payload;
            break;
        // delete
        case Actions.RECORD_DELETE:
            delete update.data[action.payload.key];
            break;
        // edit
        case Actions.RECORD_EDIT:
            update.data[action.payload.new.key] = action.payload.new;
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
            break;
        // default
        default:
            return data;
    }
    // reset stats
    update.stats.balance = 0
    update.stats.categories = { ...clearCategories };
    update.stats.goal.left = 0;
    update.stats.goal.used = 0;
    // update stats
    let goalCapDate: moment.Moment | undefined = undefined;
    let now: moment.Moment = moment()
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
        .set('millisecond', 0);
    switch (update.stats.goal.config.type) {
        case Goal.DAILY:
            goalCapDate = now;
            break;
        case Goal.WEEKLY:
            goalCapDate = now.subtract(now.get('day'), 'day');
            break;
        case Goal.MONTHLY:
            goalCapDate = now.set('D', 1);
            break;
        default:
            break;
    }

    Object.keys(update.data).forEach((key: string) => {
        let record: DataType = update.data[key];

        // update balance
        update.stats.balance += (record.categoryType * 2 - 1) * record.value;

        // update category tally
        if (update.stats.categories[record.categoryType].tally[record.categoryKey] === undefined)
            update.stats.categories[record.categoryType].tally[record.categoryKey] = {
                amount: 0,
                count: 0,
            };

        update.stats.categories[record.categoryType].tally[record.categoryKey].amount += record.value;
        update.stats.categories[record.categoryType].tally[record.categoryKey].count += 1;

        // update goal
        if (record.categoryType === Categories.EXPENSE && goalCapDate !== undefined && !moment(record.date, 'DD-MM-YYYY').isBefore(goalCapDate))
            update.stats.goal.used += record.value;
    });

    // update goal
    update.stats.goal.left = update.stats.goal.config.max - update.stats.goal.used;

    return update;
}

const displayAdd = (update: Array<DisplaySectionType>, record: DataType) => {
    var sectionIndex = update.findIndex((section: DisplaySectionType) => section.date === record.date);

    if (sectionIndex === -1) {
        sectionIndex = update.length;
        update.push({ date: record.date, keys: [] });
    }

    update[sectionIndex].keys.push(record.key);
}

const displayDelete = (update: Array<DisplaySectionType>, record: DataType) => {
    var sectionIndex = update.findIndex((section: DisplaySectionType) => section.date === record.date);

    if (update[sectionIndex].keys.length === 1)
        update.splice(sectionIndex, 1);
    else
        update[sectionIndex].keys.splice(update[sectionIndex].keys.indexOf(record.key), 1);
}

const updateDisplay = (display: Array<DisplaySectionType> = [], action: ReduxActionType) => {
    let update: Array<DisplaySectionType> = [...display];
    switch (action.type) {
        // clear all
        case Actions.CLEAR_DATA:
            return [];
        // add record
        case Actions.RECORD_ADD:
            displayAdd(update, action.payload);
            break;
        // delete record
        case Actions.RECORD_DELETE:
            displayDelete(update, action.payload);
            break;
        // edit record
        case Actions.RECORD_EDIT:
            displayDelete(update, action.payload.old);
            displayAdd(update, action.payload.new);
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
