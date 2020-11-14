export const generateRecipesIngredientsQueryString = (ingredients, rank=false) => {
	const ranking = !rank ? 1 : 2;
	return `ingredients=${ingredients.join(",+")}&number=4&ranking=${ranking}`;
}
