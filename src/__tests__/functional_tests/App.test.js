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
		const { getByRole, getAllByRole } = render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		const inputfield = getByRole('textbox')

		fireEvent.change(inputfield, { target: { value: 'new ingredient'}})

		const button = getByRole('button', {name: /add ingredient/i})
		fireEvent.click(button)

		const resultList = getAllByRole('list')[0];
		const items = within(resultList).getAllByRole('listitem');

		expect(items).toHaveLength(1);
		expect(items[0].textContent).toBe('new ingredient');
	});

	it('removes ingredients from a list', () => {
		const { getByRole, getAllByRole } = render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		const inputfield = getByRole('textbox')

		fireEvent.change(inputfield, { target: { value: 'new ingredient'}})

		const button = getByRole('button', {name: /add ingredient/i})
		fireEvent.click(button)

		fireEvent.change(inputfield, { target: { value: 'new ingredient 2'}})

		fireEvent.click(button)

		const resultList = getAllByRole('list')[0];
		const items = within(resultList).getAllByRole('listitem');

		expect(items).toHaveLength(2);

		const itemToDeleteButton = within(items[1]).getByRole('button');

		fireEvent.click(itemToDeleteButton);

		expect(items).toHaveLength(1);

		throw new Error('finish the test!');
	});

	it('renders new data if successful query', async () => {
		
		const data = {
			data: [
				{
					image: 'https://dummyImage.png',
					title: "Blackberry-Apple Pie Filling",
					usedIngredients: ['item 1', 'item 2'],
					missedIngredients: ['item 3', 'item 4']
				},
				{
					image: 'https://dummyImage.png',
					title: "Second food item.",
					usedIngredients: ['item 1', 'item 2'],
					missedIngredients: ['item 3', 'item 4']
				},
				{
					image: 'https://dummyImage.png',
					title: "Third foooooood item.",
					usedIngredients: ['item 1', 'item 2'],
					missedIngredients: ['item 3', 'item 4']

				},
				{
					image: 'https://dummyImage.png',
					title: "Fourth delicious food item.",
					usedIngredients: ['item 1', 'item 2'],
					missedIngredients: ['item 3', 'item 4']

				}
			]
		}

		axios.get.mockImplementationOnce(() => Promise.resolve(data));

		const {getByRole, findAllByTestId } = render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		const inputfield = getByRole('textbox')

		fireEvent.change(inputfield, { target: { value: 'new ingredient'}})

		const button = getByRole('button', {name: /add ingredient/i})
		fireEvent.click(button)

		fireEvent.click(getByRole('button', {name: /Search/i}))

		const resultList = await findAllByTestId('recipeDisplay')

		expect(resultList).toHaveLength(data.data.length)
	})
});
