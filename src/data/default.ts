import { darkTheme } from './theme';

import { colorPickerData, GREY } from './color';
import { currencyData } from './currency';

import { ThemeType } from '../types/color';
import { CategoryStatType, CategoryStore, DataStore, SettingsType } from '../types/data';
import { Goal, goals } from './goal';

export const clearCategories: { [index: number]: CategoryStatType } = {
    0: {
        tally: {

        },
        total: 0,
    },
    1: {
        tally: {

        },
        total: 0,
    },
}

export const defaultCategories: CategoryStore = {
    0: {
        '9ed0a04': {
            color: colorPickerData['blues']['a'].hex,
            fav: false,
            icon: 'clipboard-text-outline',
            key: '9ed0a04',
            name: 'bills',
        },
        '7a3e8956': {
            color: colorPickerData['greens']['a'].hex,
            fav: true,
            icon: 'food-variant',
            key: '7a3e8956',
            name: 'food',
        },
        '7295dbe6': {
            color: colorPickerData['yellows']['a'].hex,
            fav: true,
            icon: 'cart-outline',
            key: '7295dbe6',
            name: 'groceries',
        },
        'ce94266d': {
            color: colorPickerData['oranges']['a'].hex,
            fav: false,
            icon: 'gamepad-variant-outline',
            key: 'ce94266d',
            name: 'hobbies',
        },
        '8b941459': {
            color: colorPickerData['reds']['a'].hex,
            fav: false,
            icon: 'movie-outline',
            key: '8b941459',
            name: 'leisure',
        },
        'b32699f2': {
            color: colorPickerData['violets']['a'].hex,
            fav: true,
            icon: 'train-car',
            key: 'b32699f2',
            name: 'transport',
        },
        'C0000000': {
            color: GREY,
            fav: false,
            icon: 'image-outline',
            key: 'C0000000',
            name: 'other',
        },
    },
    1: {
        '4bf463c8': {
            color: colorPickerData['blues']['d'].hex,
            fav: true,
            icon: 'wallet-plus-outline',
            key: '4bf463c8',
            name: 'allowance',
        },
        'a94590b3': {
            color: colorPickerData['greens']['d'].hex,
            fav: false,
            icon: 'soccer',
            key: 'a94590b3',
            name: 'bets'
        },
        '573a577f': {
            color: colorPickerData['yellows']['d'].hex,
            fav: true,
            icon: 'credit-card-plus-outline',
            key: '573a577f',
            name: 'investments',
        },
        '53ebaad5': {
            color: colorPickerData['oranges']['d'].hex,
            fav: false,
            icon: 'bank-outline',
            key: '53ebaad5',
            name: 'loans',
        },
        '94827936': {
            color: colorPickerData['reds']['d'].hex,
            fav: false,
            icon: 'receipt',
            key: '94827936',
            name: 'salary',
        },
        'C0000000': {
            color: GREY,
            fav: false,
            icon: 'image-outline',
            key: 'C0000000',
            name: 'other'
        },
    },
}

export const defaultData: DataStore = {
    data: {

    },
    stats: {
        balance: 0,
        categories: clearCategories,
        goal: {
            config: {
                max: 1,
                type: Goal.NONE,
            },
            left: 1,
            used: 0,
        },
    }
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
