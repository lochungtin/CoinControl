import { PromptTextMap } from '../types/data';

export enum Prompt {
    CLEAR_DATA,
    DELETE_CATEGORY,
    DELETE_RECORD,
    DEFAULT_SETTINGS,
    DEFAULT_CATEGORIES,
}

export const prompts: PromptTextMap = {
    0: 'clear all your data',
    1: 'delete a category',
    2: 'delete a record',
    3: 'revert to factory settings, your data will persist',
    4: 'revert to the default categories, your data will persist',
}
