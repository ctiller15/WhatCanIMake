import { configureStore } from '@reduxjs/toolkit'
import React from 'react';

import { Provider } from 'react-redux'
import { render, fireEvent, within } from '@testing-library/react'
import ingredientReducer from '../../features/ingredient/ingredientSlice'

import App from '../../App'

let store;

beforeEach(() => {
	store = configureStore({
		reducer: {
			ingredient: ingredientReducer,
		}
	});
});

describe('<App', () => {
	it('places ingredients in a list', () => {
		const { getByRole } = render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		const inputField = getByRole('textbox')

		fireEvent.change(inputField, { target: { value: 'new ingredient'}})

		const button = getByRole('button', {name: /add ingredient/i})
		fireEvent.click(button)

		const resultList = getByRole('list');
		const items = within(resultList).getAllByRole('listitem');

		expect(items).toHaveLength(1);
		expect(items[0].textContent).toBe('new ingredient');
	});

	it('renders new data if successful query', async () => {
		
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
});
