import { combineReducers } from 'redux';

import {
    ADD_RECORD,
    ADD_EXPENSE_CATEGORY,
    ADD_INCOME_CATEGORY,
    DEFAULT_EXPENSE_CATEGORY,
    DEFAULT_GOAL,
    DEFAULT_INCOME_CATEGORY,
    DEFAULT_SETTINGS,
    DELETE_EXPENSE_CATEGORY,
    DELETE_INCOME_CATEGORY,
    DELETE_RECORD,
    DELETE_HISTORY,
    EDIT_EXPENSE_CATEGORY,
    EDIT_INCOME_CATEGORY,
    EDIT_RECORD,
    UPDATE_GOAL,
    UPDATE_SETTINGS,
} from './action';
import {
    defaultData,
    defaultExpenseCategories,
    defaultIncomeCategories,
    defaultSettings
} from '../data/default';

const genKey = () => genRNKey() + genRNKey() + '-' + genRNKey();
const genRNKey = () => Math.floor((1 + Math.random() * 0x10000)).toString(16);

const addRecord = (base, datekey, rnkey, payload) => {
    // create new date object
    if (base.data[datekey] === undefined)
        base.data[datekey] = {};

    // add payload to data
    base.data[datekey][rnkey] = payload;

    // create new date object for display
    if (base.display.findIndex(obj => obj.title === datekey))
        base.display.push({ title: datekey, data: [] });

    // add datetime key to obj.data array
    base.display[base.display.length - 1].data.push(datekey + ':' + rnkey);

    // sort display array by date
    base.display.sort((a, b) => a.title < b.title * -1 + a.title > b.title * 1);

    // update total
    const total = (parseFloat(base.total) + (payload.type === 'Expense' ? -1 : 1) * payload.value);
    base.total = (total + (total % 1 !== 0 ? '0' : '.00')).toString();
}

const deleteRecord = (base, datekey, rnkey) => {
    // update total
    const record = base.data[datekey][rnkey];
    const total = (parseFloat(base.total) + (record.type === 'Expense' ? 1 : -1) * record.value);
    base.total = (total + (total % 1 !== 0 ? '0' : '.00')).toString();

    // delete from data
    delete base.data[datekey][rnkey];

    // delete from display
    const outerIndex = base.display.findIndex(obj => obj.title === datekey);
    const innerIndex = base.display[outerIndex].data.indexOf(datekey + ':' + rnkey);
    base.display[outerIndex].data.splice(innerIndex, 1);

    // delete display label if empty
    if (base.display[outerIndex].data.length === 0)
        base.display.splice(outerIndex, 1);
}

const updateGoal = base => {
    
}

const updateData = (data = defaultData, action) => {
    var temp = { ...data };
    switch (action.type) {
        case DELETE_HISTORY:
            return defaultData;

        case ADD_RECORD:
            var rnkey = genKey();
            var datekey = action.payload.date;

            addRecord(temp, datekey, rnkey, { ...action.payload, key: datekey + ':' + rnkey });
            console.log(temp);
            break;

        case EDIT_RECORD:
            var keyset = action.payload.key.split(':');
            var datekey = action.payload.date;

            deleteRecord(temp, keyset[0], keyset[1]);
            addRecord(temp, datekey, keyset[1], { ...action.payload, key: datekey + ':' + keyset[1] });
            break;

        case DELETE_RECORD:
            var keyset = action.payload.split(':');

            deleteRecord(temp, keyset[0], keyset[1]);
            break;
    }
    updateGoal(temp);

    return temp;
}

const updateExpenseCategory = (categories = defaultExpenseCategories, action) => {
    switch (action.type) {
        case DEFAULT_EXPENSE_CATEGORY:
            return defaultExpenseCategories;
        case ADD_EXPENSE_CATEGORY:
            var temp = { ...categories };
            temp[genKey()] = action.payload;
            return temp;
        case DELETE_EXPENSE_CATEGORY:
            var temp = { ...categories };
            delete temp[action.payload];
            return temp;
        case EDIT_EXPENSE_CATEGORY:
            return { ...categories, ...action.payload }
    }
    return categories;
}

const updateIncomeCategory = (categories = defaultIncomeCategories, action) => {
    switch (action.type) {
        case DEFAULT_INCOME_CATEGORY:
            return defaultIncomeCategories;
        case ADD_INCOME_CATEGORY:
            var temp = { ...categories };
            temp[genKey()] = action.payload;
            return temp;
        case DELETE_INCOME_CATEGORY:
            var temp = { ...categories };
            delete temp[action.payload];
            return temp;
        case EDIT_INCOME_CATEGORY:
            return { ...categories, ...action.payload }
    }
    return categories;
}

const updateSettings = (settings = defaultSettings, action) => {
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
    data: updateData,
    expenseCategories: updateExpenseCategory,
    incomeCategories: updateIncomeCategory,
    settings: updateSettings,
});