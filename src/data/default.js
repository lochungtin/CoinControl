import { goldenBrown, colorLabels } from './color';

export const defaultData = {
    display: [],
    data: {},
    goal: {
        remaining: 0,
        percentage: 0,
    },
    goalSettings: {
        amount: 0,
        type: 'none',
    },
    total: "0.00",
}

export const defaultExpenseCategories = {
    '20012021-4001': {
        color: goldenBrown, name: 'Bills', iconName: 'text-box-outline'
    },
    '20012021-4002': {
        color: colorLabels[0], name: 'Entertainment', iconName: 'gamepad-variant-outline'
    },
    '20012021-4003': {
        color: colorLabels[1], name: 'Food', iconName: 'food-fork-drink'
    },
    '20012021-4004': {
        color: colorLabels[2], name: 'Groceries', iconName: 'cart-outline'
    },
    '20012021-4005': {
        color: colorLabels[3], name: 'Office', iconName: 'paperclip'
    },
    '20012021-4006': {
        color: colorLabels[4], name: 'Shopping', iconName: 'shopping-outline'
    },
    '20012021-4007': {
        color: colorLabels[5], name: 'Transport', iconName: 'train-car'
    },
};

export const defaultIncomeCategories = {
    '20012021-4008': {
        color: goldenBrown, name: 'Allowance', iconName: 'wallet-outline'
    },
    '20012021-4009': {
        color: colorLabels[0], name: 'Loan', iconName: 'bank'
    },
    '20012021-4010': {
        color: colorLabels[1], name: 'Returns', iconName: 'keyboard-backspace'
    },
    '20012021-4011': {
        color: colorLabels[2], name: 'Other', iconName: 'information-variant'
    },
    '20012021-4012': {
        color: colorLabels[3], name: 'Salary', iconName: 'cash'
    },
};

export const defaultSettings = {
    accent: goldenBrown,
    compactView: true,
    currency: 'usd',
    darkMode: true,
    notification: true,
    notifSchedule: '23:00',
    prompt: {
        rdc: false,
        rds: false,
        cad: false,
        dc: false,
        dr: false,
    }
};

export const defaultWatchlist = {
    expense: [],
    income: [],
}