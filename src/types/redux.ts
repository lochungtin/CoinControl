import { ThemeType } from './color';
import { CategoryStore, SettingsType } from './data';

// action //
export interface ReduxActionType {
    type: number,
    payload?: number,
}

// component props //
export interface ReduxPropType {
    categories?: CategoryStore,
    settings?: SettingsType,
    theme: ThemeType,
}
