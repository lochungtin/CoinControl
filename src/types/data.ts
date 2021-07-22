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
export interface DataStore {
    data: DataMap,
    stats: StatType,
}

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

export interface StatType {
    balance: number,
    categories: {
        [index: number]: CategoryStatType,
    },
    goal: {
        config: GoalConfigType,
        left: number,
        used: number,
    },
}

export interface CategoryStatType {
    tally: {
        [key: string]: {
            amount: number,
            count: number
        },
    },
    total: number,
}

// goals
export interface GoalConfigType {
    max: number,
    type: number,
}

export interface GoalMap {
    [index: number]: GoalType,
}

export interface GoalType {
    name: string,
    text: string,
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
