import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addIngredient, removeIngredient, ingredientList, fetchRecipesByIngredients, recipeList } from './features/ingredient/ingredientSlice';
import { generateRecipesIngredientsQueryString } from './app/utils'
import { Recipe } from '../src/features/components/Recipe'
import { Footer } from '../src/features/components/Footer/Footer'
import './App.css';

import { Button, TextField, List, ListItem, ListItemText, Box, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

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
			<ListItemText>{item}</ListItemText><IconButton aria-label="delete" onClick={() => dispatch(removeIngredient(ind))}><DeleteIcon /></IconButton>
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
		<Box display="flex"
			justifyContent="center">
			<List>
				{ingredientDisplay}
			</List>
		</Box>
		{recipeDisplay.length > 0 ? <section>
			<h2>Results</h2>
			<List>
				{recipeDisplay}
			</List>
		</section> : null}
		<Footer />
    </div>
  );
}

export default App;
