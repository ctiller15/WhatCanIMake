import React from 'react';
import Footer from '../../features/components/Footer/Footer';
import { render } from '@testing-library/react';

describe('Footer', () => {
	it('renders the footer component', () => {
		render(<Footer />);

		const githublink = screen.getByRole('link', 'github');
		expect(githublink).toBeInTheDocument();

		throw new Error('Finish the test!');
	});
});
