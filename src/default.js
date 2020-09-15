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

export const defaultExpenseSelection = {
    selection1: 'Bills',
    selection2: 'Entertainment',
    selection3: 'Food',
    selection4: 'Groceries',
    selection5: 'Office',
    selection6: 'Other',
    selection7: 'Shopping',
    selection8: 'Transport',
}

export const defaultGoal = {
    amount: 0,
    type: 'none',
}

export const defaultIncomeCategories = [
    { key: 'Allowance', iconName: 'wallet-outline'},
    { key: 'Loan', iconName: 'bank' },
    { key: 'Returns', iconName: 'keyboard-backspace'},
    { key: 'Salary', iconName: 'cash' },   
]

export const defaultIncomeSelection = {
    selection1: 'Allowance',
    selection2: 'Loan',
    selection3: 'Returns',
    selection4: 'Salary',
    selection5: '',
    selection6: '',
    selection7: '',
    selection8: '',
}

export const defaultSettings = {
    accent: goldenBrown,
    compactView: true,
    currency: 'usd',
    darkMode: true,
    notification: true,
    notifSchedule: '23:00',
}