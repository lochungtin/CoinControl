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

