import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core'

export const IngredientDisplay = (props) => {
	return props.ingredients.map((ingredient, ind) => {
			return (
				<ListItem 
					dense={true} 
					key={ind}>
					<ListItemText className={props.classes.ingredient}>{ingredient.name}</ListItemText>
					<ListItemAvatar>
						<Avatar 
							alt={ingredient.name}
							src={ingredient.image}
						/>
					</ListItemAvatar>
				</ListItem>
			);
	});
}
