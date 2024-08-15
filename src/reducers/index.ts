import { combineReducers } from 'redux';
import contactReducer from './contact.reducer';

const rootReducer = combineReducers({
  contact: contactReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
