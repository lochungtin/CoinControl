export const DEFAULT_CATEGORY = 'DEFAULT_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export const defaultCategory = () => ({
    type: DEFAULT_CATEGORY,
})

export const updateCategory = payload => ({
    type: UPDATE_CATEGORY,
    payload: payload,
})