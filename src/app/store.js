import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import ingredientReducer from '../features/ingredient/ingredientSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
	ingredient: ingredientReducer,
  },
});
