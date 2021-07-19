import { ReduxActionType } from "../types/redux";

export enum Actions {
    ACCOUNT_SIGNIN,
    ACCOUNT_SIGNOUT,
    CLEAR_DATA,
    DEFAULT_CATEGORIES,
    DEFAULT_SETTINGS,
    PROMPT_SET_SHOW,
    SETTINGS_SET_DARKMODE,
    SETTINGS_SET_LIGHTMODE,
    THEME_ACCENT,
}

export const clearData = (): ReduxActionType => ({
    type: Actions.CLEAR_DATA,
});

export const setAccent = (payload: any): ReduxActionType => ({
    type: Actions.THEME_ACCENT,
    payload,
});

export const setDarkMode = (): ReduxActionType => ({
    type: Actions.SETTINGS_SET_DARKMODE,
});

export const setDefaultCategories = (): ReduxActionType => ({
    type: Actions.DEFAULT_CATEGORIES,
});

export const setDefaultSettings = (): ReduxActionType => ({
    type: Actions.DEFAULT_SETTINGS,
});

export const setLightMode = (): ReduxActionType => ({
    type: Actions.SETTINGS_SET_LIGHTMODE,
});

export const setPromptShow = (payload: any): ReduxActionType => ({
    type: Actions.PROMPT_SET_SHOW,
    payload,
});

export const signIn = (payload: any): ReduxActionType => ({
    type: Actions.ACCOUNT_SIGNIN,
    payload,
});

export const signOut = (): ReduxActionType => ({
    type: Actions.ACCOUNT_SIGNOUT,
});
