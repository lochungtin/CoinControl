import { ReduxActionType } from "../types/redux";

export enum Actions {
    ACCOUNT_SIGNIN,
    ACCOUNT_SIGNOUT,
    SETTINGS_SET_DARKMODE,
    SETTINGS_SET_LIGHTMODE,
};

export const setDarkMode = (): ReduxActionType => ({
    type: Actions.SETTINGS_SET_DARKMODE,
});

export const setLightMode = (): ReduxActionType => ({
    type: Actions.SETTINGS_SET_LIGHTMODE,
});

export const signIn = (payload: any): ReduxActionType => ({
    type: Actions.ACCOUNT_SIGNIN,
    payload,
});

export const signOut = (): ReduxActionType => ({
    type: Actions.ACCOUNT_SIGNOUT,
});
