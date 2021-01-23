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
    '20012021-004001': {
        color: goldenBrown, name: 'Bills', iconName: 'text-box-outline'
    },
    '20012021-004002': {
        color: colorLabels[0], name: 'Entertainment', iconName: 'gamepad-variant-outline'
    },
    '20012021-004003': {
        color: colorLabels[1], name: 'Food', iconName: 'food-fork-drink'
    },
    '20012021-004004': {
        color: colorLabels[2], name: 'Groceries', iconName: 'cart-outline'
    },
    '20012021-004005': {
        color: colorLabels[3], name: 'Office', iconName: 'paperclip'
    },
    '20012021-004006': {
        color: colorLabels[4], name: 'Shopping', iconName: 'shopping-outline'
    },
    '20012021-004007': {
        color: colorLabels[5], name: 'Transport', iconName: 'train-car'
    },
};

export const defaultIncomeCategories = {
    '20012021-004008': {
        color: goldenBrown, name: 'Allowance', iconName: 'wallet-outline'
    },
    '20012021-004009': {
        color: colorLabels[0], name: 'Loan', iconName: 'bank'
    },
    '20012021-004010': {
        color: colorLabels[1], name: 'Returns', iconName: 'keyboard-backspace'
    },
    '20012021-004011': {
        color: colorLabels[2], name: 'Other', iconName: 'information-variant'
    },
    '20012021-004012': {
        color: colorLabels[3], name: 'Salary', iconName: 'cash'
    },
};

export const defaultExpenseSelection = ['20012021-004001', '20012021-004002', '20012021-004003', '20012021-004004', '20012021-004005', '20012021-004006', '20012021-004007'];

export const defaultIncomeSelection = ['20012021-004008', '20012021-004009', '20012021-004010', '20012021-004004', '20012021-004005', '20012021-004006', '20012021-004007'];

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