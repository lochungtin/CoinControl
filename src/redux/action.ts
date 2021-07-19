import { CurrencyType } from "../types/data";
import { ReduxActionType } from "../types/redux";

export enum Actions {
    ACCOUNT_SIGNIN,
    ACCOUNT_SIGNOUT,
    CLEAR_DATA,
    DEFAULT_CATEGORIES,
    DEFAULT_SETTINGS,
    SETTINGS_SET_CURRENCY,
    SETTINGS_SET_DARKMODE,
    SETTINGS_SET_LIGHTMODE,
    SETTINGS_SET_PROMPT_SHOW,
    THEME_ACCENT,
}

// data
export const clearData = (): ReduxActionType => ({
    type: Actions.CLEAR_DATA,
});

// set defaults
export const setDefaultCategories = (): ReduxActionType => ({
    type: Actions.DEFAULT_CATEGORIES,
});

export const setDefaultSettings = (): ReduxActionType => ({
    type: Actions.DEFAULT_SETTINGS,
});

// set themes
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

// set prompt show
export const setPromptShow = (payload: any): ReduxActionType => ({
    type: Actions.SETTINGS_SET_PROMPT_SHOW,
    payload,
});

// set currency
export const setCurrency = (payload: CurrencyType): ReduxActionType => ({
    type: Actions.SETTINGS_SET_CURRENCY,
    payload,
});

// account
export const signIn = (payload: any): ReduxActionType => ({
    type: Actions.ACCOUNT_SIGNIN,
    payload,
});

export const signOut = (): ReduxActionType => ({
    type: Actions.ACCOUNT_SIGNOUT,
});
