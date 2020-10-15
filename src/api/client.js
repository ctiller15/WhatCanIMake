import axios from 'axios';

export const API = 'https://api.spoonacular.com/recipes';

export const fetchRecipesByIngredient = async query => {
	const url = `${API}/findByIngredients?${query}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`;

	return await axios.get(url);
};
