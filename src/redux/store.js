import AsyncStorage from '@react-native-community/async-storage';
import { createStore } from 'redux';
import { persistReducer, persistStore, } from 'redux-persist';

import Reactotron from '../debug/ReactotronConfig';

import reducer from './reducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, Reactotron.createEnhancer());
export const persistor = persistStore(store);