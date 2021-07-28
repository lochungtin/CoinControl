import { darkTheme } from './theme';

import { colorPickerData, GREY } from './color';
import { currencyData } from './currency';
import { Goal } from './goal';

import { ThemeType } from '../types/color';
import { CategoryStatType, CategoryStore, DataStore, SettingsType } from '../types/data';

export const clearCategories: { [index: number]: CategoryStatType } = Object.freeze({
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
});

export const defaultCategoryKeys: Array<string> = [
    'C0000000',
    '9ed01a04',
    '7a3e8956',
    '7295dbe6',
    'ce94266d',
    '8b941459',
    'b32699f2',
    '4bf463c8',
    'a94590b3',
    '573a577f',
    '53ebaad5',
    '94827936',
];

export const defaultCategories: CategoryStore = {
    0: {
        '9ed01a04': {
            color: colorPickerData['blues']['a'].hex,
            def: true,
            fav: false,
            icon: 'clipboard-text-outline',
            key: '9ed01a04',
            lmt: '2021-07-24T12:56:14.083Z',
            name: 'bills',
        },
        '7a3e8956': {
            color: colorPickerData['greens']['a'].hex,
            def: true,
            fav: true,
            icon: 'food-variant',
            key: '7a3e8956',
            lmt: '2021-07-24T12:56:14.083Z',
            name: 'food',
        },
        '7295dbe6': {
            color: colorPickerData['yellows']['a'].hex,
            def: true,
            fav: true,
            icon: 'cart-outline',
            key: '7295dbe6',
            lmt: '2021-07-24T12:56:14.083Z',
            name: 'groceries',
        },
        'ce94266d': {
            color: colorPickerData['oranges']['a'].hex,
            def: true,
            fav: false,
            icon: 'gamepad-variant-outline',
            key: 'ce94266d',
            lmt: '2021-07-24T12:56:14.083Z',
            name: 'hobbies',
        },
        '8b941459': {
            color: colorPickerData['reds']['a'].hex,
            def: true,
            fav: false,
            icon: 'movie-outline',
            key: '8b941459',
            lmt: '2021-07-24T12:56:14.083Z',
            name: 'leisure',
        },
        'b32699f2': {
            color: colorPickerData['violets']['a'].hex,
            def: true,
            fav: true,
            icon: 'train-car',
            key: 'b32699f2',
            lmt: '2021-07-24T12:56:14.083Z',
            name: 'transport',
        },
        'C0000000': {
            color: GREY,
            def: true,
            fav: false,
            icon: 'image-outline',
            key: 'C0000000',
            lmt: '2021-07-24T12:56:14.083Z',
            name: 'other',
        },
    },
    1: {
        '4bf463c8': {
            color: colorPickerData['blues']['d'].hex,
            def: true,
            fav: true,
            icon: 'wallet-plus-outline',
            key: '4bf463c8',
            lmt: '2021-07-24T12:56:14.083Z',
            name: 'allowance',
        },
        'a94590b3': {
            color: colorPickerData['greens']['d'].hex,
            def: true,
            fav: false,
            icon: 'soccer',
            key: 'a94590b3',
            lmt: '2021-07-24T12:56:14.083Z',
            name: 'bets'
        },
        '573a577f': {
            color: colorPickerData['yellows']['d'].hex,
            def: true,
            fav: true,
            icon: 'credit-card-plus-outline',
            key: '573a577f',
            lmt: '2021-07-24T12:56:14.083Z',
            name: 'investments',
        },
        '53ebaad5': {
            color: colorPickerData['oranges']['d'].hex,
            def: true,
            fav: false,
            icon: 'bank-outline',
            key: '53ebaad5',
            lmt: '2021-07-24T12:56:14.083Z',
            name: 'loans',
        },
        '94827936': {
            color: colorPickerData['reds']['d'].hex,
            def: true,
            fav: false,
            icon: 'receipt',
            key: '94827936',
            lmt: '2021-07-24T12:56:14.083Z',
            name: 'salary',
        },
        'C0000000': {
            color: GREY,
            def: true,
            fav: false,
            icon: 'image-outline',
            key: 'C0000000',
            lmt: '2021-07-24T12:56:14.083Z',
            name: 'other'
        },
    },
}

export const defaultData: DataStore = Object.freeze({
    data: {

    },
    stats: {
        balance: 0,
        categories: clearCategories,
        goal: {
            config: {
                max: 10,
                type: Goal.NONE,
            },
            left: 10,
            used: 0,
        },
    }
});

export const defaultSettings: SettingsType = Object.freeze({
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
        5: true,
    },
});

export const defaultTheme: ThemeType = darkTheme;
