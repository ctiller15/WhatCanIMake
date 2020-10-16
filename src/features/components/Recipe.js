import React from 'react';
import { List, ListItem, ListItemText, Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	header: {
		width: 345,
	},
	media: {
		height: 0,
		paddingTop: '56.25%',
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
				<ListItemText>{ingredient.name}</ListItemText>
			</ListItem>)
	});

	const requiredIngredientsDisplay = requiredIngredients.map((ingredient, ind) => {
		return (<ListItem 
			dense={true} 
			key={ind}>
				<ListItemText>{ingredient.name}</ListItemText>
			</ListItem>)
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
				justifyContent="space-around">
				<section>
					<h4>have</h4>
					<List>
						{existingIngredientsDisplay}
					</List>
				</section>
				<section>
					<h4>need</h4>
					<List>
						{requiredIngredientsDisplay}
					</List>
				</section>
			</Box>
		</Card>
	);
}
