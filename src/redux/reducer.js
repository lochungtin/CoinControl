import moment from 'moment';
import { combineReducers } from 'redux';

import { ADD_RECORD, DEFAULT_EXPENSE_CATEGORY, DEFAULT_INCOME_CATEGORY, DEFAULT_SETTINGS, DELETE_HISTORY } from './action';
import { defaultExpenseCategories, defaultIncomeCategories, defaultSettings } from '../default';

const updateRecords = (records = [], action) => {
    switch(action.type) {
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

const updateIncomeCategory = (categories = {}, action) => {
    switch (action.type) {
        case DEFAULT_INCOME_CATEGORY:
            return defaultIncomeCategories;
    }
    return categories;
}

const updateSettings = (settings = {}, action) => {
    switch(action.type) {
        case DEFAULT_SETTINGS:
            return defaultSettings;
    }
    return settings;
}

export default combineReducers({
    expenseCategories: updateExpenseCategory,
    incomeCategories: updateIncomeCategory,
    records: updateRecords,
    settings: updateSettings,
});