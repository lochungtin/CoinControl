import moment from 'moment';
import { combineReducers } from 'redux';

import {
    ADD_RECORD,
    ADD_EXPENSE_CATEGORY,
    ADD_INCOME_CATEGORY,
    DEFAULT_EXPENSE_CATEGORY,
    DEFAULT_EXPENSE_SELECTION,
    DEFAULT_GOAL,
    DEFAULT_INCOME_CATEGORY,
    DEFAULT_INCOME_SELECTION,
    DEFAULT_SETTINGS,
    DELETE_EXPENSE_CATEGORY,
    DELETE_INCOME_CATEGORY,
    DELETE_RECORD,
    DELETE_HISTORY,
    EDIT_RECORD,
    RESET_KEY,
    RESET_ALLKEYS,
    UPDATE_EXPENSE_SELECTION,
    UPDATE_GOAL,
    UPDATE_INCOME_SELECTION,
    UPDATE_SETTINGS, 
} from './action';
import {
    defaultExpenseCategories,
    defaultExpenseSelection,
    defaultGoal,
    defaultIncomeCategories,
    defaultIncomeSelection,
    defaultSettings
} from '../data/default';

const updateRecords = (records = [], action) => {
    switch (action.type) {
        case ADD_RECORD:
            action.payload['key'] = moment().format();
            return [...records, action.payload];
        case DELETE_HISTORY:
            return [];
        case DELETE_RECORD:
            var temp = [...records];
            var found = false;
            var pos = -1;
            while (!found) {
                if (temp[++pos].key === action.payload)
                    found = true;
            }
            temp.splice(pos, 1);
            return temp;
        case EDIT_RECORD:
            var temp = [...records];
            var found = false;
            var pos = -1;
            while (!found) {
                if (temp[++pos].key === action.payload.key)
                    found = true;
            }
            temp.splice(pos, 1, action.payload);
            return temp;
        case RESET_KEY:
            var temp = [...records];
            for (const record of temp) {
                if (record.category === action.payload) {
                    record.category = 'Other';
                    record.icon = 'information-variant';
                }
            }
            return temp;
        case RESET_ALLKEYS:
            var temp = [...records];
            for (const record of temp) {
                if (!defaultExpenseCategories.includes(record.category) || !defaultIncomeCategories.includes(record.category)) {
                    record.category = 'Other';
                    record.icon = 'information-variant';
                }
            }
    }
    return records;
}

const updateExpenseCategory = (categories = [], action) => {
    switch (action.type) {
        case DEFAULT_EXPENSE_CATEGORY:
            return defaultExpenseCategories;
        case ADD_EXPENSE_CATEGORY:
            return [...categories, action.payload];
        case DELETE_EXPENSE_CATEGORY:
            var temp = [...categories];
            var position
            for (position = 0; position < temp.length; position++) {
                if (temp[position].key === action.payload)
                    break;
            }
            temp.splice(position, 1);
            return temp;
    }
    return categories;
}

const updateExpenseSelection = (selection = [], action) => {
    switch (action.type) {
        case DEFAULT_EXPENSE_SELECTION:
            return defaultExpenseSelection;
        case UPDATE_EXPENSE_SELECTION:
            return action.payload;
    }
    return selection;
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

const updateIncomeCategory = (categories = [], action) => {
    switch (action.type) {
        case DEFAULT_INCOME_CATEGORY:
            return defaultIncomeCategories;
        case ADD_INCOME_CATEGORY:
            return [...categories, action.payload];
        case DELETE_INCOME_CATEGORY:
            var temp = [...categories];
            var position
            for (position = 0; position < temp.length; position++) {
                if (temp[position].key === action.payload)
                    break;
            }
            temp.splice(position, 1);
            return temp;
    }
    return categories;
}

const updateIncomeSelection = (selection = [], action) => {
    switch (action.type) {
        case DEFAULT_INCOME_SELECTION:
            return defaultIncomeSelection;
        case UPDATE_INCOME_SELECTION:
            return action.payload;
    }
    return selection;
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
    expenseSelection: updateExpenseSelection,
    goal: updateGoal,
    incomeCategories: updateIncomeCategory,
    incomeSelection: updateIncomeSelection,
    records: updateRecords,
    settings: updateSettings,
});