import { ThemeType } from './color';

// action //
export interface ReduxActionType {
    type: number,
    payload?: number,
};

// default values //
export interface SettingsType {
    theme: ThemeType,
};
