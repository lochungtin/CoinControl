import moment from 'moment';
import { combineReducers } from 'redux';

import { ADD_RECORD, DEFAULT_EXPENSE_CATEGORY, DEFAULT_GOAL, DEFAULT_INCOME_CATEGORY, DEFAULT_SETTINGS, DELETE_HISTORY, UPDATE_GOAL, UPDATE_SETTINGS } from './action';
import { defaultExpenseCategories, defaultGoal, defaultIncomeCategories, defaultSettings } from '../default';

const updateRecords = (records = [], action) => {
    switch (action.type) {
        case ADD_RECORD:
            action.payload['key'] = moment().format();
            return [...records, action.payload];
        case DELETE_HISTORY:
            return [];
    }
    return records;
}

const updateExpenseCategory = (categories = {}, action) => {
    switch (action.type) {
        case DEFAULT_EXPENSE_CATEGORY:
            return defaultExpenseCategories;
    }
    return categories;
}

const updateGoal = (goal = {}, action) => {
    switch (action.type) {
        case DEFAULT_GOAL:
            return defaultGoal;
        case UPDATE_GOAL:
            return action.payload;
    }
    return goal;
}

const updateIncomeCategory = (categories = {}, action) => {
    switch (action.type) {
        case DEFAULT_INCOME_CATEGORY:
            return defaultIncomeCategories;
    }
    return categories;
}

const updateSettings = (settings = {}, action) => {
    switch (action.type) {
        case DEFAULT_SETTINGS:
            return defaultSettings;
        case UPDATE_SETTINGS:
            var newSettings = { ...settings };
            newSettings[action.payload.key] = action.payload.update;
            return newSettings;
    }
    return settings;
}

export default combineReducers({
    expenseCategories: updateExpenseCategory,
    goal: updateGoal,
    incomeCategories: updateIncomeCategory,
    records: updateRecords,
    settings: updateSettings,
});