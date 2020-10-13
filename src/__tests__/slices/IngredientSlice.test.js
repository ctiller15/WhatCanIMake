import ingredientReducer, {
	initialState,
	addIngredient,
	removeIngredient
} from '../../features/ingredient/ingredientSlice';

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
	});
});
