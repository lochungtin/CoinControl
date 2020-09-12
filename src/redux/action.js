export const ADD_RECORD = 'ADD_RECORD';
export const DEFAULT_EXPENSE_CATEGORY = 'DEFAULT_EXPENSE_CATEGORY';
export const DEFAULT_GOAL = 'DEFAULT_GOAL';
export const DEFAULT_INCOME_CATEGORY = 'DEFAULT_INCOME_CATEGORY';
export const DEFAULT_SETTINGS = 'DEFAULT_SETTINGS';
export const DELETE_HISTORY = 'DELETE_HISTORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_GOAL = 'UPDATE_GOAL';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

export const addRecord = payload => ({
    type: ADD_RECORD,
    payload: payload,
});

export const defaultExpenseCategory = () => ({
    type: DEFAULT_EXPENSE_CATEGORY,
});

export const defaultGoal = () => ({
    type: DEFAULT_GOAL,
})

export const defaultIncomeCategory = () => ({
    type: DEFAULT_INCOME_CATEGORY,
});

export const defaultSettings = () => ({
    type: DEFAULT_SETTINGS,
});

export const deleteHistory = () => ({
    type: DELETE_HISTORY,
});

export const updateCategory = payload => ({
    type: UPDATE_CATEGORY,
    payload: payload,
});

export const updateGoal = payload => ({
    type: UPDATE_GOAL,
    payload: payload,
})

export const updateSettings = payload => ({
    type: UPDATE_SETTINGS,
    payload: payload,
})