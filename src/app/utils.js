export const generateRecipesIngredientsQueryString = (ingredients) => {
	return `ingredients=${ingredients.join(",+")}&number=4`
}
