export const DEFAULT_EXPENSE_CATEGORY = 'DEFAULT_EXPENSE_CATEGORY';
export const DEFAULT_INCOME_CATEGORY = 'DEFAULT_INCOME_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export const defaultExpenseCategory = () => ({
    type: DEFAULT_EXPENSE_CATEGORY,
})

export const defaultIncomeCategory = () => ({
    type: DEFAULT_INCOME_CATEGORY,
})

export const updateCategory = payload => ({
    type: UPDATE_CATEGORY,
    payload: payload,
})