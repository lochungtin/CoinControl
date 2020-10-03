import { goldenBrown } from './styles';

export const customCategoryIconList = [
    'alpha-a-circle-outline',
    'alpha-b-circle-outline',
    'alpha-c-circle-outline',
    'alpha-d-circle-outline',
    'alpha-e-circle-outline',
    'alpha-f-circle-outline',
    'alpha-g-circle-outline',
    'alpha-h-circle-outline',
    'alpha-i-circle-outline',
    'alpha-j-circle-outline',
    'alpha-k-circle-outline',
    'alpha-l-circle-outline',
    'alpha-m-circle-outline',
]

export const defaultExpenseCategories = [
    { default: 'true', key: 'Bills', iconName: 'text-box-outline' },
    { default: 'true', key: 'Entertainment', iconName: 'gamepad-variant-outline' },
    { default: 'true', key: 'Food', iconName: 'food-fork-drink' },
    { default: 'true', key: 'Groceries', iconName: 'cart-outline' },
    { default: 'true', key: 'Office', iconName: 'paperclip' },
    { default: 'true', key: 'Other', iconName: 'information-variant' },
    { default: 'true', key: 'Shopping', iconName: 'shopping-outline' },
    { default: 'true', key: 'Transport', iconName: 'train-car' },
]

export const defaultExpenseSelection = [
    'Bills',
    'Entertainment',
    'Food',
    'Groceries',
    'Office',
    'Other',
    'Shopping',
    'Transport',
]

export const defaultGoal = {
    amount: 0,
    type: 'none',
}

export const defaultIncomeCategories = [
    { default: 'true', key: 'Allowance', iconName: 'wallet-outline' },
    { default: 'true', key: 'Loan', iconName: 'bank' },
    { default: 'true', key: 'Returns', iconName: 'keyboard-backspace' },
    { default: 'true', key: 'Other', iconName: 'information-variant' },
    { default: 'true', key: 'Salary', iconName: 'cash' },
]

export const defaultIncomeSelection = [
    'Allowance',
    'Loan',
    'Returns',
    'Other',
    'Salary',
]

export const defaultSettings = {
    accent: goldenBrown,
    compactView: true,
    currency: 'usd',
    darkMode: true,
    notification: true,
    notifSchedule: '23:00',
}