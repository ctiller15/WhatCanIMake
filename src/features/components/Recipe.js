import React from 'react';
import { List, ListItem, ListItemText, Card, CardHeader, CardMedia, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 320,
	},
	header: {
		width: '100%',
		boxSizing: 'border-box',
	},
	media: {
		height: 0,
		paddingTop: '56.25%',
	},
	ingredientColumns: {
		width: '50%'
	},
	columnHeader: {
		textAlign: 'center'
	},
	ingredient: {
		textAlign: 'center'
	}
}));

export const Recipe = (props) => {
	const classes = useStyles();
	const existingIngredients = props.existingIngredients || []
	const requiredIngredients = props.requiredIngredients || []

	const existingIngredientsDisplay = existingIngredients.map((ingredient, ind) => {
		return (
			<ListItem 
				dense={true} 
				key={ind}>
				<ListItemText className={classes.ingredient}>{ingredient.name}</ListItemText>
			</ListItem>)
	});

	const requiredIngredientsDisplay = requiredIngredients.map((ingredient, ind) => {
		return <ListItem
			dense={true} 
			key={ind}>
			<ListItemText className={classes.ingredient}>{ingredient.name}</ListItemText>
		</ListItem>
	});

	return (
		<Card className={classes.root} data-testid='recipeDisplay'>
			<CardHeader
				className={classes.header}
				title={props.text}
			/>
			<CardMedia 
				className={classes.media}
				image={props.imageSource}
				title={props.text}
			/>
			<Box display="flex"
				justifyContent="space-between"
				alignItems="flex-start">
				<Box className={classes.ingredientColumns}
					display="flex"
					flexDirection="column"
				justifyContent="center">
					<h4 className={classes.columnHeader}>have</h4>
					<List>
						{existingIngredientsDisplay}
					</List>
				</Box>
				<Box className={classes.ingredientColumns} display="flex"
					flexDirection="column"
					justifyContent="center">
					<h4 className={classes.columnHeader}>need</h4>
					<List>
						{requiredIngredientsDisplay}
					</List>
				</Box>
			</Box>
		</Card>
	);
}
