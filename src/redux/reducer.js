import moment from 'moment';
import { combineReducers } from 'redux';

import {
    ADD_CARD,
    ADD_EXPENSE_CATEGORY,
    ADD_INCOME_CATEGORY,
    ADD_RECORD,
    DEFAULT_CARDS,
    DEFAULT_EXPENSE_CATEGORY,
    DEFAULT_GOAL,
    DEFAULT_INCOME_CATEGORY,
    DEFAULT_LOGIN,
    DEFAULT_SETTINGS,
    DELETE_EXPENSE_CATEGORY,
    DELETE_INCOME_CATEGORY,
    DELETE_RECORD,
    DELETE_HISTORY,
    EDIT_EXPENSE_CATEGORY,
    EDIT_INCOME_CATEGORY,
    EDIT_RECORD,
    HIDE_CARD,
    MAKE_ALL_NULL,
    MAKE_NULL_KEY,
    UPDATE_GOAL,
    UPDATE_LOGIN, 
    UPDATE_SETTINGS,
    DEFAULT_ACCOUNT_SETTINGS,
    UPDATE_ACCOUNT_SETTINGS,
} from './action';
import {
    defaultCardConfig,
    defaultData,
    defaultExpenseCategories,
    defaultIncomeCategories,
    defaultLogin,
    defaultSettings,
    NULL_KEY,
} from '../data/default';
import { RNKey } from '../functions/GenKey';

const addRecord = (base, datekey, rnkey, payload) => {
    // create new date object
    if (base.data[datekey] === undefined)
        base.data[datekey] = {};

    // add payload to data
    base.data[datekey][rnkey] = payload;

    // find index of section object
    const index = base.display.findIndex(obj => obj.title === datekey);
    if (index == -1)
        base.display.push({ title: datekey, data: [datekey + ':' + rnkey] });
    else
        base.display[index].data.push(datekey + ':' + rnkey)

    // sort display array by date
    base.display.sort((a, b) => (a.title < b.title) * 1 + (a.title > b.title) * -1);

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

const makeAllNull = (base) => {
    const defaultList = [...Object.keys(defaultExpenseCategories), Object.keys(defaultIncomeCategories)];
    Object.keys(base.data).forEach(datekey => Object.keys(base.data[datekey]).forEach(recordKey => {
        let record = base.data[datekey][recordKey];
        if (!defaultList.includes(record.catKey)) {
            console.log('clear: ' + recordKey);
            record.catKey = NULL_KEY;
        }
    }));
}

const makeNullKey = (base, key) => {
    Object.keys(base.data).forEach(datekey => Object.keys(base.data[datekey]).forEach(recordKey => {
        console.log('clear: ' + key);
        let record = base.data[datekey][recordKey];
        if (record.catKey === key)
            record.catKey = NULL_KEY;
    }));
}

const updateCards = (cards = defaultCardConfig, action) => {
    let temp = { ...cards }
    switch (action.type) {
        case DEFAULT_CARDS:
            return defaultCardConfig;

        case ADD_CARD:
            temp[action.payload] = true;
            break;

        case HIDE_CARD:
            temp[action.payload] = false;
            break;
    }
    return temp;
}

const updateData = (data = defaultData, action) => {
    let temp = { ...data };
    switch (action.type) {
        case DELETE_HISTORY:
            return defaultData;

        case ADD_RECORD:
            let rnkey = RNKey();
            var datekey = action.payload.date;

            addRecord(temp, datekey, rnkey, { ...action.payload, key: datekey + ':' + rnkey });
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

        case UPDATE_GOAL:
            temp.goalSettings = action.payload;
            break;

        case DEFAULT_GOAL:
            temp.goalSettings = defaultData.goalSettings;
            break;

        case MAKE_ALL_NULL:
            makeAllNull(temp);
            break;

        case MAKE_NULL_KEY:
            makeNullKey(temp, action.payload);
            break;

        default:
            return data;
    }

    updateGoal(temp);
    return temp;
}

const updateGoal = base => {
    switch (base.goalSettings.type) {
        case 'none':
            base.goal = defaultData.goal;
            return;
        case 'week':
            var week = moment().week();
            var dates = Object.keys(base.data).filter(date => moment(date, "YYYY-MM-DD").week() === week);
            break;

        case 'month':
            var thisMonth = moment().format("YYYY-MM");
            var dates = Object.keys(base.data).filter(date => date.startsWith(thisMonth));
            break;
    }

    let totalExpense = 0;
    dates.forEach(date => {
        Object.keys(base.data[date]).forEach(key => {
            const record = base.data[date][key];
            totalExpense += (record.type === 'Expense') * record.value;
        });
    });

    base.goal.remaining = base.goalSettings.amount - totalExpense;
    base.goal.percentage = 1 - ((base.goalSettings.amount - totalExpense) / base.goalSettings.amount);
}

const updateExpenseCategories = (categories = defaultExpenseCategories, action) => {
    let temp = { ...categories };
    switch (action.type) {
        case DEFAULT_EXPENSE_CATEGORY:
            return defaultExpenseCategories;

        case ADD_EXPENSE_CATEGORY:
            temp[RNKey()] = action.payload;
            return temp;

        case DELETE_EXPENSE_CATEGORY:
            delete temp[action.payload];
            return temp;

        case EDIT_EXPENSE_CATEGORY:
            return { ...categories, ...action.payload }
    }
    return categories;
}

const updateIncomeCategories = (categories = defaultIncomeCategories, action) => {
    let temp = { ...categories };
    switch (action.type) {
        case DEFAULT_INCOME_CATEGORY:
            return defaultIncomeCategories;

        case ADD_INCOME_CATEGORY:
            temp[RNKey()] = action.payload;
            return temp;

        case DELETE_INCOME_CATEGORY:
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
            let newSettings = { ...settings };
            newSettings[action.payload.key] = action.payload.update;
            return newSettings;
    }
    return settings;
}

const updateLogin = (isLogin = defaultLogin, action) => {
    
    switch (action.type) {
        case DEFAULT_LOGIN:
            return false;
        case UPDATE_LOGIN:
            return action.payload.isLogin;
    }
    return isLogin;
}

const updateAccountSettings = (settings = {}, action) => {
    switch (action.type) {
        case DEFAULT_ACCOUNT_SETTINGS:
            return defaultAccountSettings;
        case UPDATE_ACCOUNT_SETTINGS:
            var newSettings = { ...settings };
            newSettings = action.payload;
            return newSettings;
    }
    return settings;
}

export default combineReducers({
    cards: updateCards,
    data: updateData,
    expenseCategories: updateExpenseCategories,
    incomeCategories: updateIncomeCategories,
    settings: updateSettings,
    isLogin: updateLogin,
    accountSettings: updateAccountSettings,
});