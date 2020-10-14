import configureStore from 'redux-mock-store';
import React from 'react';
import { within, render, fireEvent, screen, cleanup, getByRole } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../App';
import { addIngredient } from '../features/ingredient/ingredientSlice';

const middlewares = [];
const mockStore = configureStore(middlewares);

let store;

beforeEach(() => {
	store = mockStore({
		ingredient: {
			ingredients: []
		}
	});

	store.dispatch = jest.fn();
});

afterEach(() => {
	cleanup();
});

test('renders input box', () => {
	render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('if button clicked, adds ingredient to list.', async () => {
	const { getByRole } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	const inputField = getByRole('textbox');

	fireEvent.change(inputField, { target: { value: 'new ingredient'}})

	const button = getByRole('button', {name: /add ingredient/i})
	fireEvent.click(button)

	expect(store.dispatch).toHaveBeenCalledTimes(1);
	expect(store.dispatch).toHaveBeenCalledWith(addIngredient('new ingredient'));
});

test('ingredients are placed in a list', () => {
	store = mockStore({
		ingredient: {
			ingredients: ['new ingredient']
		}
	});

	const { getByRole } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	const resultList = getByRole('list');
	const items = within(resultList).getAllByRole('listitem');

	expect(items).toHaveLength(1);
	expect(items[0].textContent).toBe('new ingredient');
});

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
