import { ThemeType } from './color';

// action //
export interface ReduxActionType {
    type: number,
    payload?: number,
};

// component props //
export interface ReduxPropType {
    settings?: SettingsType,
    theme: ThemeType,
}

// default values //
export interface SettingsType {
    
};
