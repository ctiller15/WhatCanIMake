import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRecipesByIngredient } from '../../api/client';

export const initialState = {
	ingredients: [],
	loading: 'idle',
	recipes: []
}

export const fetchRecipesByIngredients = createAsyncThunk('recipe/fetchByIngredient', async (ingredientString) => {
	const response = await fetchRecipesByIngredient(ingredientString);
	return response.data;
});

export const ingredientSlice = createSlice({
	name: 'ingredient',
	initialState,
	reducers: {
		addIngredient: (state, action) => {
			state.ingredients.push(action.payload);
		},
		removeIngredient: (state, action) => {
			state.ingredients.splice(action.payload, 1);
		},
	},
	extraReducers: {
		[fetchRecipesByIngredients.fulfilled]: (state, action) => {
			state.recipes = action.payload;
		}
	}
});

export const { addIngredient, removeIngredient } = ingredientSlice.actions;


export const ingredientList = state => state.ingredient.ingredients;
export const recipeList = state => state.ingredient.recipes;

export default ingredientSlice.reducer;
