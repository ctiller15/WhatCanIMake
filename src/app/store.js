import { configureStore } from '@reduxjs/toolkit';
import ingredientReducer from '../features/ingredient/ingredientSlice';

export default configureStore({
  reducer: {
	ingredient: ingredientReducer,
  },
});
