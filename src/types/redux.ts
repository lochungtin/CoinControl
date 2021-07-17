import { ThemeType } from './color';
import { SettingsType } from './data';

// action //
export interface ReduxActionType {
    type: number,
    payload?: number,
}

// component props //
export interface ReduxPropType {
    settings?: SettingsType,
    theme: ThemeType,
}
