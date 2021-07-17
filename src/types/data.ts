// categories
export interface CategoryMap {
    [key: string]: CategoryType,
}

export interface CategoryType {
    color: string,
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

// goals
export interface GoalMap {
    [key: string]: GoalType,
}

export interface GoalType {
    key: string,
    name: string,
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
