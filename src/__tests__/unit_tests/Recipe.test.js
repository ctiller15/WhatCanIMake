import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Recipe } from '../../features/components/Recipe';

describe('<Recipe />', () => {
	it('renders the recipe component', () => {
		const recipe = {
			imageSource: "https://www.fakeimage.com/fakeimage.jpg",
			text: "This is a recipe title",
			existingIngredients: [{name: 'garlic'}, {name: 'lemon juice'}, {name: 'chicken'}],
			requiredIngredients: [{name: 'onion'}, {name: 'bowtie pasta'}]
		};

		const { debug } = render(<Recipe {...recipe}/>);

		const image = screen.getByRole('img');
		expect(image).toBeInTheDocument();

		const title = screen.getByText(recipe.text);
		expect(title).toBeInTheDocument();

		const lists = screen.getAllByRole('list');

		const existingIngredients = within(lists[0]).getAllByRole("listitem");
		const neededIngredients = within(lists[1]).getAllByRole("listitem");

		expect(existingIngredients.length).toBe(recipe.existingIngredients.length);
		
		existingIngredients.forEach((ingredient, ind) => {
			expect(ingredient).toHaveTextContent(recipe.existingIngredients[ind].name);
		});

		expect(neededIngredients.length).toBe(recipe.requiredIngredients.length);

		neededIngredients.forEach((ingredient, ind) => {
			expect(ingredient).toHaveTextContent(recipe.requiredIngredients[ind].name);
		});
	});
});
