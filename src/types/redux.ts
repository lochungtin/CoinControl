import { ThemeType } from './color';
import { AccountType, CategoryStore, DataStore, GoalDataType, SettingsType } from './data';
import { DisplaySectionType } from './ui';

// action //
export interface ReduxActionType {
    type: number,
    payload?: any,
}

// component props //
export interface ReduxPropType {
    account?: AccountType,
    categories?: CategoryStore,
    data?: DataStore,
    display?: Array<DisplaySectionType>,
    goal?: GoalDataType,
    settings?: SettingsType,
    theme: ThemeType,
}
