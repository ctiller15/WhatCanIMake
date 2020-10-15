import ingredientReducer, {
	initialState,
	addIngredient,
	removeIngredient,
	fetchRecipesByIngredients
} from '../../../features/ingredient/ingredientSlice';
import { configureStore } from '@reduxjs/toolkit';

import { fetchRecipesByIngredient } from '../../../api/client'

jest.mock('../../../api/client');

describe('ingredientSlice', () => {
	describe('reducers', () => {
		it('returns initial state', () => {
			const nextState = ingredientReducer(undefined, {});
			expect(nextState).toBe(initialState);
		});

		it('adds an ingredient to the store', () => {
			const initialArray = [...initialState.ingredients];
			const newIngredient = 'garlic'
			initialArray.push(newIngredient);
			const nextState = ingredientReducer(initialState, addIngredient(newIngredient));
			expect(nextState.ingredients).toEqual(initialArray);
		});

		it('adds recipes to the store', () => {
			const store = configureStore({
				reducer: {
					ingredient: ingredientReducer,
				}
			});
			const mockPayload = [{title: "item1"}, {title: "item2"}, {title: "item3"}, {title: "item4"}];
			const expectedAction = fetchRecipesByIngredients.fulfilled(mockPayload);

			fetchRecipesByIngredient.mockReturnValue(Promise.resolve(mockPayload));

			const thunk = store.dispatch(fetchRecipesByIngredients("dummyString"));

			thunk.then(() => {
				const actionsCalled = store.getActions();
				expect(actionsCalled).toContainEqual(expectedAction);
			});
		});
	});
});
