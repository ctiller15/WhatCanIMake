import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addIngredient, ingredientList, fetchRecipesByIngredients } from './features/ingredient/ingredientSlice';
import { generateRecipesIngredientsQueryString } from './app/utils'
import './App.css';

import { Button, Input } from '@material-ui/core'

function App() {
	const ingredients = useSelector(ingredientList);
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
    </div>
  );
}

export default App;
