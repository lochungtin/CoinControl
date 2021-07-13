import { ReduxActionType } from "../types/redux";

export enum Actions {
    SETTINGS_SET_DARKMODE,
    SETTINGS_SET_LIGHTMODE,
};

export const setDarkMode = (): ReduxActionType => ({
    type: Actions.SETTINGS_SET_DARKMODE,
});

export const setLightMode = (): ReduxActionType => ({
    type: Actions.SETTINGS_SET_LIGHTMODE,
});
