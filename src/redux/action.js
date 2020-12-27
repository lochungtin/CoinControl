// Record Related
export const ADD_RECORD = 'ADD_RECORD';
export const addRecord = payload => ({
    type: ADD_RECORD,
    payload: payload,
});

export const EDIT_RECORD = 'EDIT_RECORD';
export const editRecord = payload => ({
    type: EDIT_RECORD,
    payload: payload,
});

export const DELETE_HISTORY = 'DELETE_HISTORY';
export const deleteHistory = () => ({
    type: DELETE_HISTORY,
});

export const DELETE_RECORD = 'DELETE_RECORD';
export const deleteRecord = payload => ({
    type: DELETE_RECORD,
    payload: payload,
});

export const RESET_KEY = 'RESET_KEY';
export const resetKey = payload => ({
    type: RESET_KEY,
    payload: payload,
});

export const RESET_ALLKEYS = 'RESET_ALLKEYS';
export const resetAllKeys = () => ({
    type: RESET_ALLKEYS,
});

// Expense Category Related
export const ADD_EXPENSE_CATEGORY = 'ADD_EXPENSE_CATEGORY';
export const addExpenseCategory = payload => ({
    type: ADD_EXPENSE_CATEGORY,
    payload: payload,
});

export const DEFAULT_EXPENSE_CATEGORY = 'DEFAULT_EXPENSE_CATEGORY';
export const defaultExpenseCategory = () => ({
    type: DEFAULT_EXPENSE_CATEGORY,
});

export const DELETE_EXPENSE_CATEGORY = 'DELETE_EXPENSE_CATEGORY';
export const deleteExpenseCategory = payload => ({
    type: DELETE_EXPENSE_CATEGORY,
    payload: payload,
});

// Goal Related
export const DEFAULT_GOAL = 'DEFAULT_GOAL';
export const defaultGoal = () => ({
    type: DEFAULT_GOAL,
});

export const UPDATE_GOAL = 'UPDATE_GOAL';
export const updateGoal = payload => ({
    type: UPDATE_GOAL,
    payload: payload,
});

// Income Category Related
export const ADD_INCOME_CATEGORY = 'ADD_INCOME_CATEGORY';
export const addIncomeCategory = payload => ({
    type: ADD_INCOME_CATEGORY,
    payload: payload,
});

export const DEFAULT_INCOME_CATEGORY = 'DEFAULT_INCOME_CATEGORY';
export const defaultIncomeCategory = () => ({
    type: DEFAULT_INCOME_CATEGORY,
});

export const DELETE_INCOME_CATEGORY = 'DELETE_INCOME_CATEGORY';
export const deleteIncomeCategory = payload => ({
    type: DELETE_INCOME_CATEGORY,
    payload: payload,
});

// Selection Related
export const DEFAULT_EXPENSE_SELECTION = 'DEFAULT_EXPENSE_SELECTION';
export const defaultExpenseSelection = () => ({
    type: DEFAULT_EXPENSE_SELECTION,
});

export const DEFAULT_INCOME_SELECTION = 'DEFAULT_INCOME_SELECTION';
export const defaultIncomeSelection = () => ({
    type: DEFAULT_INCOME_SELECTION,
});

export const UPDATE_INCOME_SELECTION = 'UPDATE_INCOME_SELECTION';
export const updateIncomeSelection = payload => ({
    type: UPDATE_INCOME_SELECTION,
    payload: payload
});

export const UPDATE_EXPENSE_SELECTION = 'UPDATE_EXPENSE_SELECTION';
export const updateExpenseSelection = payload => ({
    type: UPDATE_EXPENSE_SELECTION,
    payload: payload
});

// Settings Related
export const DEFAULT_SETTINGS = 'DEFAULT_SETTINGS';
export const defaultSettings = () => ({
    type: DEFAULT_SETTINGS,
});

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const updateSettings = payload => ({
    type: UPDATE_SETTINGS,
    payload: payload,
});

export const DEFAULT_LOGIN = 'DEFAULT_LOGIN';
export const defaultLogin = () => ({
    type: DEFAULT_LOGIN,
});

export const UPDATE_LOGIN = 'UPDATE_LOGIN';
export const updateLogin = payload => ({
    type: UPDATE_LOGIN,
    payload:payload
});
