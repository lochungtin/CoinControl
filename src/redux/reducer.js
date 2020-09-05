import { combineReducers } from 'redux';

import { DEFAULT_CATEGORY } from './action';
import { defaultCategories } from '../default';

const updateCategory = (state = {}, action) => {
    switch (action.type) {
        case DEFAULT_CATEGORY:
            return defaultCategories;
    }
    return state
}

export default combineReducers({
    categories: updateCategory
});