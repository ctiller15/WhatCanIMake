import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	ingredients: []
}

export const ingredientSlice = createSlice({
	name: 'ingredient',
	initialState,
	reducers: {
		addIngredient: (state, action) => {
			state.ingredients.push(action.payload);
		},
	},
});

export const { addIngredient } = ingredientSlice.actions;

export default ingredientSlice.reducer;
