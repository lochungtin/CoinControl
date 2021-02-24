// Card Related
export const ADD_CARD = 'ADD_CARD';
export const addCard = payload => ({
    type: ADD_CARD,
    payload,
});

export const HIDE_CARD = 'HIDE_CARD';
export const hideCard = payload => ({
    type: HIDE_CARD,
    payload,
});

export const DEFAULT_CARDS = 'DEFAULT_CARDS';
export const defaultCards = () => ({
    type: DEFAULT_CARDS,
});

// Data Related
export const ADD_RECORD = 'ADD_RECORD';
export const addRecord = payload => ({
    type: ADD_RECORD,
    payload,
});

export const EDIT_RECORD = 'EDIT_RECORD';
export const editRecord = payload => ({
    type: EDIT_RECORD,
    payload,
});

export const DELETE_HISTORY = 'DELETE_HISTORY';
export const deleteHistory = () => ({
    type: DELETE_HISTORY,
});

export const DELETE_RECORD = 'DELETE_RECORD';
export const deleteRecord = payload => ({
    type: DELETE_RECORD,
    payload,
});

export const DEFAULT_GOAL = 'DEFAULT_GOAL';
export const defaultGoal = () => ({
    type: DEFAULT_GOAL,
});

export const UPDATE_GOAL = 'UPDATE_GOAL';
export const updateGoal = payload => ({
    type: UPDATE_GOAL,
    payload,
});

// Expense Category Related
export const ADD_EXPENSE_CATEGORY = 'ADD_EXPENSE_CATEGORY';
export const addExpenseCategory = payload => ({
    type: ADD_EXPENSE_CATEGORY,
    payload,
});

export const DEFAULT_EXPENSE_CATEGORY = 'DEFAULT_EXPENSE_CATEGORY';
export const defaultExpenseCategory = () => ({
    type: DEFAULT_EXPENSE_CATEGORY,
});

export const DELETE_EXPENSE_CATEGORY = 'DELETE_EXPENSE_CATEGORY';
export const deleteExpenseCategory = payload => ({
    type: DELETE_EXPENSE_CATEGORY,
    payload,
});

export const EDIT_EXPENSE_CATEGORY = 'EDIT_EXPENSE_CATEGORY';
export const editExpenseCategory = payload => ({
    type: EDIT_EXPENSE_CATEGORY,
    payload,
});

// Income Category Related
export const ADD_INCOME_CATEGORY = 'ADD_INCOME_CATEGORY';
export const addIncomeCategory = payload => ({
    type: ADD_INCOME_CATEGORY,
    payload,
});

export const DEFAULT_INCOME_CATEGORY = 'DEFAULT_INCOME_CATEGORY';
export const defaultIncomeCategory = () => ({
    type: DEFAULT_INCOME_CATEGORY,
});

export const DELETE_INCOME_CATEGORY = 'DELETE_INCOME_CATEGORY';
export const deleteIncomeCategory = payload => ({
    type: DELETE_INCOME_CATEGORY,
    payload,
});

export const EDIT_INCOME_CATEGORY = 'EDIT_INCOME_CATEGORY';
export const editIncomeCategory = payload => ({
    type: EDIT_INCOME_CATEGORY,
    payload,
});

// General Categories Related

export const MAKE_ALL_NULL = 'MAKE_ALL_NULL';
export const makeAllNull = () => ({
    type: MAKE_ALL_NULL,
});

export const MAKE_NULL_KEY = 'MAKE_NULL_KEY';
export const makeNullKey = payload => ({
    type: MAKE_NULL_KEY,
    payload,
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
    payload
});
