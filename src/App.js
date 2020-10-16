import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addIngredient, ingredientList, fetchRecipesByIngredients, recipeList } from './features/ingredient/ingredientSlice';
import { generateRecipesIngredientsQueryString } from './app/utils'
import { Recipe } from '../src/features/components/Recipe'
import './App.css';

import { Button, Input, TextField, List, ListItem, ListItemText } from '@material-ui/core'

function App() {
	const ingredients = useSelector(ingredientList);
	const recipes = useSelector(recipeList);
	const dispatch = useDispatch();
	const [ingredient, setIngredient] = useState('');

	const onIngredientChanged = e => setIngredient(e.target.value)

	const onIngredientSubmitted = () => {
		dispatch((addIngredient(ingredient)))
		setIngredient('');
	}

	const ingredientDisplay = ingredients.map((item, ind) => {
		return (
		<ListItem 
			dense={true} 
			key={ind}>
				<ListItemText>{item}</ListItemText>
		</ListItem>
		);
	});

	const recipeDisplay = recipes.map((recipe, ind) => {
		return <ListItem key={`Recipe-${ind}`}>
			<Recipe 
			imageSource={recipe.image} 
			text={recipe.title}
			existingIngredients={recipe.usedIngredients}
			requiredIngredients={recipe.missedIngredients}
		/>
		</ListItem>
	});

	const getRecipes = () => {
		const ingredientString = generateRecipesIngredientsQueryString(ingredients);
		dispatch((fetchRecipesByIngredients(ingredientString)));
	}

  return (
    <div className="App">
		<section>
			<TextField
				label="Ingredient"
				variant="outlined"
				placeholder="Input an ingredient!"
				value={ingredient}
				onChange={onIngredientChanged}
			/>
			<Button 
				variant="contained"
				onClick={onIngredientSubmitted}>
				Add Ingredient	
			</Button>
			<Button 
				variant="contained"
				color="primary"
				onClick={getRecipes}>
				Search
			</Button>
		</section>
		<section>
			<List>
				{ingredientDisplay}
			</List>
		</section>
		{recipeDisplay.length > 0 ? <section>
			<h2>Results</h2>
			<List>
				{recipeDisplay}
			</List>
		</section> : null}
    </div>
  );
}

export default App;
