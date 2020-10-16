import ingredientReducer, {
	initialState,
	addIngredient,
	removeIngredient,
	fetchRecipesByIngredients
} from '../../../features/ingredient/ingredientSlice';

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
			const mockPayload = [{title: "item1"}, {title: "item2"}, {title: "item3"}, {title: "item4"}];
			const expectedAction = fetchRecipesByIngredients.fulfilled(mockPayload);

			expect(ingredientReducer({}, expectedAction).recipes).toEqual(mockPayload);
		});
	});
});
