import { ThemeType } from './color';

// action //
export interface ReduxActionType {
    type: number,
    payload?: any,
}

// component props //
export interface ReduxThemeType {
    theme: ThemeType,
}
