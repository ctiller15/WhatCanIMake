import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addIngredient, removeIngredient, ingredientList, fetchRecipesByIngredients, recipeList } from './features/ingredient/ingredientSlice';
import { generateRecipesIngredientsQueryString } from './app/utils'
import { Recipe } from '../src/features/components/Recipe'
import { Footer } from '../src/features/components/Footer/Footer'
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import './App.css';

import { Button, TextField, List, ListItem, ListItemText, Box, IconButton, Grid, Switch, FormControlLabel, Tooltip, ClickAwayListener} from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import DeleteIcon from '@material-ui/icons/Delete'

	const theme = createMuiTheme({
		palette: {
			primary: deepPurple
		}
	});

	const inputStyles = makeStyles(() => ({
		root: {
			background: "white"
		},
		focused: {
			color: "#222222",
		},
		labelFocused: {
			color: "#CCCCCC"
		}
	}));

function App() {
	const inputClasses = inputStyles();

	const ingredients = useSelector(ingredientList);
	const recipes = useSelector(recipeList);
	const dispatch = useDispatch();
	const [ingredient, setIngredient] = useState('');
	const [ranking, setRanking] = useState(false);
	const [open, setOpen] =  useState(false);

	const handleTooltipClose = () => { setOpen(false) }
	const handleTooltipOpen = () => { setOpen(true) }

	const onIngredientChanged = e => setIngredient(e.target.value)

	const onIngredientSubmitted = () => {
		dispatch((addIngredient(ingredient)))
		setIngredient('');
	}

	const ingredientDisplay = ingredients.map((item, ind) => {
		return (
		<Box display="flex"
			flexWrap="wrap"
			component={ListItem}
			dense={true} 
			key={ind}>
			<ListItemText>{item}</ListItemText><IconButton aria-label="delete" onClick={() => dispatch(removeIngredient(ind))}><DeleteIcon /></IconButton>
			</Box>
		);
	});

	const recipeDisplay = recipes.map((recipe, ind) => {
		return <Grid item 
			component={ListItem} 
			xs={12} 
			sm={6} 
			md={3} 
			lg={3} 
			xl={3} 
			key={`Recipe-${ind}`}
			style={{justifyContent: 'center'}}>
			<Recipe 
			imageSource={recipe.image} 
			text={recipe.title}
			existingIngredients={recipe.usedIngredients}
			requiredIngredients={recipe.missedIngredients}
		/>
		</Grid>
	});

	const getRecipes = () => {
		const ingredientString = generateRecipesIngredientsQueryString(ingredients, ranking);
		dispatch((fetchRecipesByIngredients(ingredientString)));
	}


  return (
	  <ThemeProvider theme={theme}>
	  <Box className="App"
		display="flex"
		flexDirection="column"
	  	alignItems="center">
		  <h1>Recipe Search</h1>
		  <h2>(By Ingredient!)</h2>
		  <Box className="searchBox"
		  	display="flex"
		  	flexDirection="column">
				<TextField
					label="Ingredient(s)"
					variant="outlined"
					placeholder="Input an ingredient!"
					value={ingredient}
					onChange={onIngredientChanged}
					InputProps={{
						classes: {
							root: inputClasses.root,
							focused: inputClasses.focused,
						}
					}}
					InputLabelProps={{
						classes: {
							root: inputClasses.labelFocused,
							focused: inputClasses.labelFocused,
						}
					}}
				/>
			  <Box display="flex"
			  	justifyContent="space-between"> 
				  <FormControlLabel
					  control={<Switch 
						  color="primary"
							data-testid="ranking"
							name="ranking"
							id="ranking"
							value={ranking}
							onChange={(e) => setRanking(e.target.value)}
					  />}
					  label="Min ingrd."
					  labelPlacement="start"
				  />

				  <ClickAwayListener onClickAway={handleTooltipClose}>
					  <div>
						  <Tooltip
							  title="When toggled off, will maximize the used ingredients from your ingredients list. When toggled on, will try to minimize the number of missing ingredients"
							  placement="right-start"
							  	onClose={handleTooltipClose}
							  	open={open}
							  	disableFocusListener
						  >
							<IconButton 
							  	onClick={handleTooltipOpen} 
							  	color="primary"><HelpIcon /></IconButton>
						  </Tooltip>
					  </div>
				  </ClickAwayListener>
			  </Box>

			  <Box display="flex"
				  justifyContent="space-between">
				<Button 
					disabled={!ingredient}
					variant="contained"
					onClick={onIngredientSubmitted}>
					Add Ingredient	
				</Button>
				<Button 
					disabled={ingredients.length === 0}
					variant="contained"
					color="primary"
					onClick={getRecipes}>
					Search
				</Button>
			  </Box>
		</Box>
		<Box display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center">
			<h3>Ingredient(s)</h3>
			<List>
				{ingredientDisplay}
			</List>
		</Box>
		{recipeDisplay.length > 0 ? <Box flexGrow={1}>
			<h2>Results</h2>
			<Grid 
				container 
				spacing={0} 
				component={List}
				alignItems='stretch'>
				{recipeDisplay}
			</Grid>
		</Box> : <Box flexGrow={1}></Box>}
		  <Footer/>
    </Box>
	  </ThemeProvider>
  );
}

export default App;
