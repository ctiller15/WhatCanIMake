import React from 'react';
import { Footer } from '../../features/components/Footer/Footer';
import { render } from '@testing-library/react';

describe('Footer', () => {
	it('renders the footer component', () => {
		const { getByRole } = render(<Footer />);

		const githublink = getByRole('link', {name: /github/i});
		expect(githublink).toBeInTheDocument();

		const spoonacularLink = getByRole('link', { name: /spoonacular/i });
		expect(spoonacularLink).toBeInTheDocument();
	});
});
