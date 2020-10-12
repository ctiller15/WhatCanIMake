import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../app/store';
import App from '../App';

test('renders search button', () => {
	const { getByText } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	expect(getByText('Search')).toBeInTheDocument();
});

test('Upon search button being clicked, component renders new data if successful query', async () => {
	
	const { getByText } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	fireEvent.click(getByText('Search'))

	const results = await screen.findAllByRole('listitem')

	expect(results).toHaveLength(10)

	throw new Error('Finish the test!');
})
