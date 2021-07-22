import { CurrencyType, DataType, GoalConfigType } from "../types/data";
import { ReduxActionType } from "../types/redux";

export enum Actions {
    // account
    ACCOUNT_SIGNIN,
    ACCOUNT_SIGNOUT,
    // category
    CATEGORY_ADD,
    CATEGORY_DELETE,
    CATEGORY_EDIT,
    CATEGORY_SET_DEFAULT,
    // data
    DATA_ADD,
    DATA_CLEAR,
    DATA_DELETE,
    DATA_EDIT,
    DATA_SET_GOAL,
    DATA_TO_CAT_OTHER,
    DATA_TO_CAT_OTHER_ALL,
    // display
    DISPLAY_ADD,
    DISPLAY_CLEAR,
    DISPLAY_DELETE,
    DISPLAY_EDIT,
    // settings
    SETTINGS_SET_CURRENCY,
    SETTINGS_SET_DARKMODE,
    SETTINGS_SET_DEFAULT,
    SETTINGS_SET_LIGHTMODE,
    SETTINGS_SET_PROMPT_SHOW,
    SETTINGS_SET_NOTIF_ON,
    SETTINGS_SET_NOTIF_TIME,
    // theme
    THEME_SET_ACCENT,
    THEME_SET_DARKMODE,
    THEME_SET_LIGHTMODE,
}

// account
export const accountSignIn = (payload: any): ReduxActionType => ({
    type: Actions.ACCOUNT_SIGNIN,
    payload,
});

export const accountSignOut = (): ReduxActionType => ({
    type: Actions.ACCOUNT_SIGNOUT,
});


// cateogies
export const categoryAdd = (payload: any): ReduxActionType => ({
    type: Actions.CATEGORY_ADD,
    payload,
});

export const categoryDelete = (payload: any): ReduxActionType => ({
    type: Actions.CATEGORY_DELETE,
    payload,
});

export const categoryEdit = (payload: any): ReduxActionType => ({
    type: Actions.CATEGORY_EDIT,
    payload,
});

export const categorySetDefault = (): ReduxActionType => ({
    type: Actions.CATEGORY_SET_DEFAULT,
});


// data
export const dataAdd = (payload: DataType): ReduxActionType => ({
    type: Actions.DATA_ADD,
    payload,
});

export const dataClear = (): ReduxActionType => ({
    type: Actions.DATA_CLEAR,
});

export const dataDelete = (payload: DataType): ReduxActionType => ({
    type: Actions.DATA_DELETE,
    payload,
});

export const dataEdit = (payload: { new: DataType, old: DataType }): ReduxActionType => ({
    type: Actions.DATA_EDIT,
    payload,
});

export const dataSetGoal = (payload: GoalConfigType): ReduxActionType => ({
    type: Actions.DATA_SET_GOAL,
    payload,
});

export const dataSetRecordCatToOther = (payload: any): ReduxActionType => ({
    type: Actions.DATA_TO_CAT_OTHER,
    payload,
});

export const dataSetAllRecordCatToOther = (): ReduxActionType => ({
    type: Actions.DATA_TO_CAT_OTHER_ALL,
});


// display
export const displayAdd = (payload: DataType): ReduxActionType => ({
    type: Actions.DISPLAY_ADD,
    payload,
});

export const displayClear = (): ReduxActionType => ({
    type: Actions.DISPLAY_CLEAR,
});

export const displayDelete = (payload: DataType): ReduxActionType => ({
    type: Actions.DISPLAY_DELETE,
    payload,
});

export const displayEdit = (payload: { new: DataType, old: DataType }): ReduxActionType => ({
    type: Actions.DISPLAY_EDIT,
    payload,
});


// settings
export const settingsSetCurrency = (payload: CurrencyType): ReduxActionType => ({
    type: Actions.SETTINGS_SET_CURRENCY,
    payload,
});

export const settingsSetDarkMode = (): ReduxActionType => ({
    type: Actions.SETTINGS_SET_DARKMODE,
});

export const settingsSetDefault = (): ReduxActionType => ({
    type: Actions.SETTINGS_SET_DEFAULT,
});

export const settingsSetLightMode = (): ReduxActionType => ({
    type: Actions.SETTINGS_SET_LIGHTMODE,
});

export const settingsSetNotifOn = (payload: boolean): ReduxActionType => ({
    type: Actions.SETTINGS_SET_NOTIF_ON,
    payload,
});

export const settingsSetNotifTime = (payload: string): ReduxActionType => ({
    type: Actions.SETTINGS_SET_NOTIF_TIME,
    payload,
});

export const settingsSetPromptShow = (payload: any): ReduxActionType => ({
    type: Actions.SETTINGS_SET_PROMPT_SHOW,
    payload,
});


// themes
export const themeSetAccent = (payload: string): ReduxActionType => ({
    type: Actions.THEME_SET_ACCENT,
    payload,
});

export const themeSetDarkMode = (): ReduxActionType => ({
    type: Actions.THEME_SET_DARKMODE,
});

export const themeSetLightMode = (): ReduxActionType => ({
    type: Actions.THEME_SET_LIGHTMODE,
});
