import { darkTheme } from './theme';

import { colorPickerData, TINTED_GREY } from './color';
import { currencyData } from './currency';

import { ThemeType } from '../types/color';
import { CategoryStore, SettingsType } from '../types/data';

export const defaultCategories: CategoryStore  = {
    expense: {
        '9ed0a04': {
            color: colorPickerData['blues']['a'].hex,
            icon: 'clipboard-text-outline',
            key: '9ed0a04',
            name: 'bills',
        },
        '7a3e8956': {
            color: colorPickerData['greens']['a'].hex,
            icon: 'food-variant',
            key: '7a3e8956',
            name: 'food',
        },
        '7295dbe6': {
            color: colorPickerData['yellows']['a'].hex,
            icon: 'cart-outline',
            key: '7295dbe6',
            name: 'groceries',
        },
        'ce94266d': {
            color: colorPickerData['oranges']['a'].hex,
            icon: 'gamepad-variant-outline',
            key: 'ce94266d',
            name: 'hobbies',
        },
        '8b941459': {
            color: colorPickerData['reds']['a'].hex,
            icon: 'movie-outline',
            key: '8b941459',
            name: 'leisure',
        },
        'b32699f2': {
            color: colorPickerData['violets']['a'].hex,
            icon: 'train-car',
            key: 'b32699f2',
            name: 'transport',
        },
        'C0000000': {
            color: TINTED_GREY,
            icon: 'image-outline',
            key: 'C0000000',
            name: 'other',
        },
    },
    income: {
        '4bf463c8': {
            color: colorPickerData['blues']['d'].hex,
            icon: 'wallet-plus-outline',
            key: '4bf463c8',
            name: 'allowance',
        },
        'a94590b3': {
            color: colorPickerData['greens']['d'].hex,
            icon: 'soccer',
            key: 'a94590b3',
            name: 'bets'
        },
        '573a577f': {
            color: colorPickerData['yellows']['d'].hex,
            icon: 'credit-card-plus-outline',
            key: '573a577f',
            name: 'investments',
        },
        '53ebaad5': {
            color: colorPickerData['oranges']['d'].hex,
            icon: 'bank-outline',
            key: '53ebaad5',
            name: 'loans',
        },
        '94827936': {
            color: colorPickerData['reds']['d'].hex,
            icon: 'receipt',
            key: '94827936',
            name: 'salary',
        },
        'C0000000': {
            color: TINTED_GREY,
            icon: 'image-outline',
            key: 'C0000000',
            name: 'other'
        },
    },
}

export const defaultSettings: SettingsType = {
    currency: currencyData['a983c65f'],
    darkMode: true,
    notif: true,
    notifTime: '11:00 PM',
    promptTrigger: {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
    },
}

export const defaultTheme: ThemeType = darkTheme;
