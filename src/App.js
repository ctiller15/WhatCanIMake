import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addIngredient, ingredientList, fetchRecipesByIngredients, recipeList } from './features/ingredient/ingredientSlice';
import { generateRecipesIngredientsQueryString } from './app/utils'
import { Recipe } from '../src/features/components/Recipe'
import './App.css';

import { Button, Input } from '@material-ui/core'

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
		return <li key={ind}>{item}</li>
	});

	const recipeDisplay = recipes.map((recipe, ind) => {
		return <li key={`Recipe-${ind}`}>
			<Recipe 
			imageSource={recipe.image} 
			text={recipe.title}
			existingIngredients={recipe.usedIngredients}
			requiredIngredients={recipe.missedIngredients}
		/>
		</li>
	});

	const getRecipes = () => {
		const ingredientString = generateRecipesIngredientsQueryString(ingredients);
		dispatch((fetchRecipesByIngredients(ingredientString)));
	}

  return (
    <div className="App">
		<section>
			<Input
				type="text" 
				placeholder="Input an ingredient!"
				value={ingredient}
				onChange={onIngredientChanged}
			/>
			<Button onClick={onIngredientSubmitted}>
				Add Ingredient	
			</Button>
			<Button color="primary"
				onClick={getRecipes}>
				Search
			</Button>
		</section>
		<section>
			<ul>
				{ingredientDisplay}
			</ul>
		</section>
		{recipeDisplay.length > 0 ? <section>
			<h2>Results</h2>
			<ul >
				{recipeDisplay}
			</ul>
		</section> : null}
    </div>
  );
}

export default App;
