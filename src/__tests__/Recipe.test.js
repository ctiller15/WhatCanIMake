import React from 'react';
import { render, screen, within } from '@testing-library/react';

describe('<Recipe />', () => {
	it('renders the recipe component', () => {
		render(<Recipe />);

		const image = screen.getByRole('img');
		expect(image).toHaveLength(1);

		const title = screen.getByText(recipe.text);
		expect(title).toBeInTheDocument();

		const existingIngredients = within(screen.getByText('have')).getAllByRole("listitem");
		const neededIngredients = within(screen.getByText('need')).getAllByRole("listItem");

		expect(existingIngredients.length).toBe(queriedIngredients.length);
		
		existingIngredients.forEach((ingredient, ind) => {
			expect(ingredient).toHaveTextContent(queriedIngredients[ind]);
		});

		expect(neededIngredients.length).toBe(addedIngredients.length);

		neededIngredients.forEach((ingredient, ind) => {
			expect(ingredient).toHaveTextContent(addedIngredients[ind]);
		});

		throw new Error("Finish the test!");
	});
});
