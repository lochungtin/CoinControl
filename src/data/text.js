export const settingsPromptText = {
    '2': {
        key: 'rdc',
        title: 'Reset Default Categories',
        detail: 'All custom cateogies will be erased. Records that belong to custom categories will changed to "other".',
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
    goalPrmpt: {
        key: 'tg',
        title: 'Terminate Goal',
        detail: 'The current goal will be set to 0 and progress will be lost.',
    },
    itemPrmpt: {
        key: 'dr',
        title: 'Detele Record',
        detail: 'You are about to delete a record. This step is irreversable.'
    }
}