import moment from 'moment';
import { combineReducers } from 'redux';

import { Actions } from './action';

import { clearCategories, defaultCategories, defaultCategoryKeys, defaultData, defaultSettings, defaultTheme } from '../data/default';
import { Goal } from '../data/goal';
import { darkTheme, lightTheme } from '../data/theme';

import { ThemeType } from '../types/color';
import { AccountType, Categories, CategoryStore, DataStore, DataType, SettingsType } from '../types/data';
import { ReduxActionType } from '../types/redux';
import { DisplaySectionType } from '../types/ui';

const updateAccount = (account: AccountType | null = null, action: ReduxActionType) => {
    switch (action.type) {
        // sign in
        case Actions.ACCOUNT_SIGNIN:
            return action.payload;
        // sign out
        case Actions.ACCOUNT_SIGNOUT:
            return null;
        // default
        default:
            return account;
    }
}

const updateCategories = (categories: CategoryStore = defaultCategories, action: ReduxActionType) => {
    let update: CategoryStore = JSON.parse(JSON.stringify(categories));
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
        // merge overwrite
        case Actions.CATEGORY_OVERWRITE:
            return action.payload;
        // set default
        case Actions.CATEGORY_SET_DEFAULT:
            return defaultCategories;
        // default
        default:
            return categories;
    }
}

const updateData = (data: DataStore = defaultData, action: ReduxActionType) => {
    const update: DataStore = JSON.parse(JSON.stringify(data));
    switch (action.type) {
        // add
        case Actions.DATA_ADD:
            update.data[action.payload.key] = action.payload;
            break;
        // clear
        case Actions.DATA_CLEAR:
            return defaultData;
        // delete
        case Actions.DATA_DELETE:
            delete update.data[action.payload.key];
            break;
        // edit
        case Actions.DATA_EDIT:
            update.data[action.payload.new.key] = action.payload.new;
            break;
        // delete category - set category to other
        case Actions.DATA_TO_CAT_OTHER:
            action.payload.forEach((key: string) => update.data[key].categoryKey = 'C0000000');
            break;
        // merger overwrite
        case Actions.DATA_OVERWRITE:
            update.data = action.payload;
            break;
        // set goal
        case Actions.DATA_SET_GOAL:
            update.stats.goal.config = action.payload;
            break;
        // default
        default:
            return data;
    }
    // reset stats
    update.stats.balance = 0
    update.stats.categories = JSON.parse(JSON.stringify(clearCategories));
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

        update.stats.categories[record.categoryType].total += record.value;

        // update goal
        if (record.categoryType === Categories.EXPENSE && goalCapDate !== undefined && !moment(record.date, 'DD-MM-YYYY').isBefore(goalCapDate))
            update.stats.goal.used += record.value;
    });

    // update goal
    update.stats.goal.left = update.stats.goal.config.max - update.stats.goal.used;
    return update;
}

const displayAdd = (update: Array<DisplaySectionType>, record: DataType) => {
    let sectionIndex: number = update.findIndex((section: DisplaySectionType) => section.date === record.date);

    if (sectionIndex === -1) {
        sectionIndex = update.length;
        update.push({ date: record.date, keys: [] });
    }

    update[sectionIndex].keys.push(record.key);
}

const displayDelete = (update: Array<DisplaySectionType>, record: DataType) => {
    let sectionIndex: number = update.findIndex((section: DisplaySectionType) => section.date === record.date);

    if (update[sectionIndex].keys.length === 1)
        update.splice(sectionIndex, 1);
    else
        update[sectionIndex].keys.splice(update[sectionIndex].keys.indexOf(record.key), 1);
}

const updateDisplay = (display: Array<DisplaySectionType> = [], action: ReduxActionType) => {
    let update: Array<DisplaySectionType> = [...display];
    switch (action.type) {
        // add
        case Actions.DISPLAY_ADD:
            displayAdd(update, action.payload);
            break;
        // clear
        case Actions.DISPLAY_CLEAR:
            return [];
        // delete
        case Actions.DISPLAY_DELETE:
            displayDelete(update, action.payload);
            break;
        // edit
        case Actions.DISPLAY_EDIT:
            displayDelete(update, action.payload.old);
            displayAdd(update, action.payload.new);
            break;
        case Actions.DISPLAY_OVERWRITE:
            // clear existing
            update = [];
            Object.keys(action.payload).forEach((key: string) => displayAdd(update, action.payload[key]));
            break;
        // default
        default:
            return display;
    }
    update.sort((a: DisplaySectionType, b: DisplaySectionType) => moment(b.date, 'DD-MM-YYYY').isAfter(moment(a.date, 'DD-MM-YYYY')) ? 1 : -1);
    return update;
}

const updateSettings = (settings: SettingsType = defaultSettings, action: ReduxActionType) => {
    let update: SettingsType = JSON.parse(JSON.stringify(settings));
    switch (action.type) {
        // set currency
        case Actions.SETTINGS_SET_CURRENCY:
            update.currency = action.payload;
            return update;
        // set default
        case Actions.SETTINGS_SET_DEFAULT:
            return defaultSettings;
        // set dark theme
        case Actions.SETTINGS_SET_DARKMODE:
            update.darkMode = true;
            return update;
        // set light theme
        case Actions.SETTINGS_SET_LIGHTMODE:
            update.darkMode = false;
            return update;
        // set notif on
        case Actions.SETTINGS_SET_NOTIF_ON:
            update.notif = action.payload;
            return update;
        // set notif time
        case Actions.SETTINGS_SET_NOTIF_TIME:
            update.notifTime = action.payload;
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
        case Actions.THEME_SET_ACCENT:
            update.static.accentC = action.payload;
            return update;
        // set dark theme
        case Actions.THEME_SET_DARKMODE:
            update.dynamic = darkTheme.dynamic;
            return update;
        // set light theme
        case Actions.THEME_SET_LIGHTMODE:
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
    settings: updateSettings,
    theme: updateTheme,
});
