import { createStore, Store } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default is localStorage for web
import { PersistConfig } from 'redux-persist';
import reducer from '../reducers/contact.reducer';

const persistConfig: PersistConfig<ContactsState> = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store: Store<ContactsState, Action> = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;
