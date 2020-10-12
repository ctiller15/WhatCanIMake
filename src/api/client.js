import axios from 'axios';

export const API = 'https://api.spoonacular.com/recipes/';

export const fetchRecipesByIngredient = async query => {
	const url = `${API}/findByIngredients?${query}`;

	return await axios.get(url);
};
