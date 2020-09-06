import { combineReducers } from 'redux';

import { DEFAULT_EXPENSE_CATEGORY, DEFAULT_INCOME_CATEGORY } from './action';
import { defaultExpenseCategories, defaultIncomeCategories } from '../default';

const updateExpenseCategory = (state = {}, action) => {
    switch (action.type) {
        case DEFAULT_EXPENSE_CATEGORY:
            return defaultExpenseCategories;
    }
    return state
}

const updateIncomeCategory = (state = {}, action) => {
    switch (action.type) {
        case DEFAULT_INCOME_CATEGORY:
            return defaultIncomeCategories
    }
    return state
}

export default combineReducers({
    expenseCategories: updateExpenseCategory,
    incomeCategories: updateIncomeCategory,
});