import { CurrencyType, DataType, GoalConfigType, GoalType } from "../types/data";
import { ReduxActionType } from "../types/redux";

export enum Actions {
    ACCOUNT_SIGNIN,
    ACCOUNT_SIGNOUT,
    CATEGORY_ADD,
    CATEGORY_DELETE,
    CATEGORY_EDIT,
    CLEAR_DATA,
    DEFAULT_CATEGORIES,
    DEFAULT_SETTINGS,
    GOAL_SET,
    RECORD_ADD,
    RECORD_DELETE,
    RECORD_EDIT,
    SETTINGS_SET_CURRENCY,
    SETTINGS_SET_DARKMODE,
    SETTINGS_SET_LIGHTMODE,
    SETTINGS_SET_PROMPT_SHOW,
    SETTINGS_SET_NOTIF_ON,
    SETTINGS_SET_NOTIF_TIME,
    THEME_ACCENT,
}

// account
export const signIn = (payload: any): ReduxActionType => ({
    type: Actions.ACCOUNT_SIGNIN,
    payload,
});

export const signOut = (): ReduxActionType => ({
    type: Actions.ACCOUNT_SIGNOUT,
});


// cateogies
export const addCategory = (payload: any): ReduxActionType => ({
    type: Actions.CATEGORY_ADD,
    payload,
});

export const deleteCategory = (payload: any): ReduxActionType => ({
    type: Actions.CATEGORY_DELETE,
    payload,
});

export const editCategory = (payload: any): ReduxActionType => ({
    type: Actions.CATEGORY_EDIT,
    payload,
});

// data
export const clearData = (): ReduxActionType => ({
    type: Actions.CLEAR_DATA,
});

// defaults
export const setDefaultCategories = (): ReduxActionType => ({
    type: Actions.DEFAULT_CATEGORIES,
});

export const setDefaultSettings = (): ReduxActionType => ({
    type: Actions.DEFAULT_SETTINGS,
});

// goals
export const setGoal = (payload: GoalConfigType): ReduxActionType => ({
    type: Actions.GOAL_SET,
    payload,
});

// records
export const addRecord = (payload: DataType): ReduxActionType => ({
    type: Actions.RECORD_ADD,
    payload,
});

export const deleteRecord = (payload: DataType): ReduxActionType => ({
    type: Actions.RECORD_DELETE,
    payload,
});

export const editRecord = (payload: { new: DataType, old: DataType }): ReduxActionType => ({
    type: Actions.RECORD_EDIT,
    payload,
});

// settings
export const setPromptShow = (payload: any): ReduxActionType => ({
    type: Actions.SETTINGS_SET_PROMPT_SHOW,
    payload,
});

export const setCurrency = (payload: CurrencyType): ReduxActionType => ({
    type: Actions.SETTINGS_SET_CURRENCY,
    payload,
});

export const setNotifOn = (payload: boolean): ReduxActionType => ({
    type: Actions.SETTINGS_SET_NOTIF_ON,
    payload,
});

export const setNotifTime = (payload: string): ReduxActionType => ({
    type: Actions.SETTINGS_SET_NOTIF_TIME,
    payload,
});

// themes
export const setAccent = (payload: string): ReduxActionType => ({
    type: Actions.THEME_ACCENT,
    payload,
});

export const setDarkMode = (): ReduxActionType => ({
    type: Actions.SETTINGS_SET_DARKMODE,
});

export const setLightMode = (): ReduxActionType => ({
    type: Actions.SETTINGS_SET_LIGHTMODE,
});
