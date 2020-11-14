import configureStore from 'redux-mock-store';
import React from 'react';
import { within, render, fireEvent, screen, cleanup} from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../../App';
import { addIngredient } from '../../features/ingredient/ingredientSlice';

const middlewares = [];
const mockStore = configureStore(middlewares);

let store;

beforeEach(() => {
	store = mockStore({
		ingredient: {
			ingredients: [],
			recipes: []
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

test('if button clicked, calls method to add ingredient', async () => {
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
			ingredients: ['new ingredient'],
			recipes: []
		}
	});

	const { getAllByRole } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	const resultList = getAllByRole('list')[0];
	const items = within(resultList).getAllByRole('listitem');

	expect(items).toHaveLength(1);
	expect(items[0].textContent).toBe('new ingredient');
});

test('If text is empty, add ingredient button is disabled', () => {
	const { getByRole } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	const button = getByRole('button', {name: /add ingredient/i})
	expect(button).toBeDisabled();
})

test('If text is not empty, add ingredient button is enabled', () => {
	const { getByRole } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	const inputField = getByRole('textbox');

	fireEvent.change(inputField, { target: { value: 'new ingredient'}})

	const button = getByRole('button', {name: /add ingredient/i})
	expect(button).not.toBeDisabled();
})

test('renders search button', () => {
	const { getByText } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	expect(getByText('Search')).toBeInTheDocument();
});

test('If ingredients are empty, search button is disabled', () => {
	store = mockStore({
		ingredient: {
			ingredients: [],
			recipes: []
		}
	});

	const { getByRole } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	const searchButton = getByRole('button', {name: /search/i});

	expect(searchButton).toBeDisabled();
})

test('If ingredients are not empty, search button is enabled', () => {
	store = mockStore({
		ingredient: {
			ingredients: ['new ingredient'],
			recipes: []
		}
	});

	const { getByRole } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	const searchButton = getByRole('button', {name: /search/i});

	expect(searchButton).not.toBeDisabled();
});

test('It renders ranking switch', () => {
	
	const {getByTestId } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	const rankingSwitch = getByTestId('ranking');
	expect(rankingSwitch).toBeInTheDocument();
});
