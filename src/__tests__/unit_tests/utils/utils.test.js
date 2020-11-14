import { generateRecipesIngredientsQueryString } from '../../../app/utils';

describe('generateRecipesIngredientsQueryString', () => {
	it('correctly generates the ingredients arguments for the querystring from a list of ingredients.', () => {

		const ingredients = ['apples', 'flour', 'sugar']

		expect(generateRecipesIngredientsQueryString(ingredients)).toBe('ingredients=apples,+flour,+sugar&number=4&ranking=1');
	});
});
