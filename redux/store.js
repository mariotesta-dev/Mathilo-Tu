import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import {createStore} from 'redux';
import scenariosReducer from './reducers';

//import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, scenariosReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
