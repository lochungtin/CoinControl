import { ThemeType } from './color';
import { AccountType, CategoryStore, SettingsType } from './data';

// action //
export interface ReduxActionType {
    type: number,
    payload?: number,
}

// component props //
export interface ReduxPropType {
    account?: AccountType,
    categories?: CategoryStore,
    settings?: SettingsType,
    theme: ThemeType,
}
