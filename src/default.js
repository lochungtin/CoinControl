import { goldenBrown } from './styles';

export const defaultExpenseCategories = [
    { key: 'Bills', iconName: 'text-box-outline' },
    { key: 'Entertainment', iconName: 'gamepad-variant-outline' },
    { key: 'Food', iconName: 'food-fork-drink' },
    { key: 'Groceries', iconName: 'cart-outline' },
    { key: 'Office', iconName: 'paperclip' },
    { key: 'Other', iconName: 'information-variant' },
    { key: 'Shopping', iconName: 'shopping-outline' },
    { key: 'Transport', iconName: 'train-car' },
]

export const defaultIncomeCategories = [
    { key: 'Allowance', iconName: 'wallet-outline'},
    { key: 'Loan', iconName: 'bank' },
    { key: 'Returns', iconName: 'keyboard-backspace'},
    { key: 'Salary', iconName: 'cash' },   
]

export const defaultSettings = {
    accent: goldenBrown,
    compactView: true,
    currency: 'usd',
    lightMode: false,
    notification: true,
    notifSchedule: '23:00',
}