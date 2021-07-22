import { ThemeType } from './color';
import { AccountType, CategoryStore, DataStore, SettingsType } from './data';
import { DisplaySectionType } from './ui';

// action //
export interface ReduxActionType {
    type: number,
    payload?: any,
}

// component props //
export interface ReduxThemeType {
    account?: AccountType,
    categories?: CategoryStore,
    data?: DataStore,
    display?: Array<DisplaySectionType>,
    settings?: SettingsType,
    theme: ThemeType,
}
