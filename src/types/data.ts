// account
export interface AccountType {
    email: string,
    uid: string,
}

// categories
export enum Categories {
    EXPENSE,
    INCOME,
}

export interface CategoryStore {
    [index: number]: CategoryMap,
}

export interface CategoryMap {
    [key: string]: CategoryType,
}

export interface CategoryType {
    color: string,
    fav: boolean,
    icon: string,
    key: string,
    name: string,
}

// currency
export interface CurrencyMap {
    [key: string]: CurrencyType,
}

export interface CurrencyType {
    icon: string,
    key: string,
    name: string,
}

// data
export interface DataMap {
    [key: string]: DataType,
}

export interface DataType {
    categoryKey: string,
    categoryType: Categories,
    date: string,
    key: string,
    title: string,
    value: number,
}

// goals
export interface GoalMap {
    [key: string]: GoalType,
}

export interface GoalType {
    key: string,
    name: string,
}

// icons 
export interface IconSection {
    header: string,
    data: Array<Array<string | null>>
}

// prompts
export interface PromptTextMap {
    [index: number]: string,
}

export interface PromptTriggerMap {
    [index: number]: boolean,
}

// settings
export interface SettingsType {
    currency: CurrencyType,
    darkMode: boolean,
    notif: boolean,
    notifTime: string,
    promptTrigger: PromptTriggerMap,
}
