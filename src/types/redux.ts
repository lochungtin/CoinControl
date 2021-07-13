import { ThemeType } from './color';

// action //
export interface ReduxActionType {
    type: number,
    payload?: number,
};

// component props //
export interface ReduxPropType {
    settings: SettingsType,
}

// default values //
export interface SettingsType {
    theme: ThemeType,
};
