export const settingsPromptText = {
    '2': {
        key: 'rdc',
        title: 'Reset Default Categories',
        detail: 'All custom cateogies will be erased. Records that belong to custom categories will be changed to "other".',
    },
    '1': {
        key: 'rds',
        title: 'Reset Default Settings',
        detail: 'All settings will be resetted to default. Your records and custom categories will not be affected.',
    },
    '3': {
        key: 'cad',
        title: 'Clear All Data',
        detail: 'All data (records, synced records, categories, and settings) will be resetted to default.', 
    }
};

export const homePromptText = {
    dr: {
        key: 'dr',
        title: 'Detele Record',
        detail: 'You are about to delete a record. This step is irreversable.'
    }
};

export const categoryPromptText = {
    dc: {
        key: 'dc',
        title: 'Delete Category',
        detail: 'You are about to delete a category. Records that belong to custom categories will be changed to "other".',
    }
};

export const goalText = {
    none: 'No Goals Set',
    week: 'left for the week',
    month: 'left for the month',
}