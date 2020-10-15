import { configureStore } from '@reduxjs/toolkit'
import React from 'react';
import axios from 'axios';

import { Provider } from 'react-redux'
import { render, fireEvent, within } from '@testing-library/react'
import ingredientReducer from '../../features/ingredient/ingredientSlice'

import App from '../../App'

jest.mock('axios');

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

		const inputfield = getByRole('textbox')

		fireEvent.change(inputfield, { target: { value: 'new ingredient'}})

		const button = getByRole('button', {name: /add ingredient/i})
		fireEvent.click(button)

		const resultList = getByRole('list');
		const items = within(resultList).getAllByRole('listitem');

		expect(items).toHaveLength(1);
		expect(items[0].textContent).toBe('new ingredient');
	});

	it('renders new data if successful query', async () => {
		
		const data = {
			data: [
				{
					title: "Blackberry-Apple Pie Filling"
				},
				{
					title: "Second food item."
				},
				{
					title: "Third foooooood item."
				},
				{
					title: "Fourth delicious food item."
				}
			]
		}

		axios.get.mockImplementationOnce(() => Promise.resolve(data));

		const { getByText, getByRole } = render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		const inputfield = getByRole('textbox')

		fireEvent.change(inputfield, { target: { value: 'new ingredient'}})

		const button = getByRole('button', {name: /add ingredient/i})
		fireEvent.click(button)

		fireEvent.click(getByText('Search'))

		const resultElement = getByRole('list')

		const results = within(resultElement).findAllByRole('listitem')

		expect(results).toHaveLength(4)

		throw new Error('Finish the test!');
	})
});
