import React from 'react';

export const Recipe = (props) => {
	const existingIngredients = props.existingIngredients || []
	const requiredIngredients = props.requiredIngredients || []

	const existingIngredientsDisplay = existingIngredients.map((ingredient, ind) => {
		return <li key={ind}>{ingredient.name}</li>
	});

	const requiredIngredientsDisplay = requiredIngredients.map((ingredient, ind) => {
		return <li key={ind}>{ingredient.name}</li>
	});

	return (
		<section data-testid='recipeDisplay'>
			<img src={props.imageSource} alt={props.text}/>	
			<h3>{props.text}</h3>
			<section>
				<section>
					<h4>have</h4>
					<ul>
						{existingIngredientsDisplay}
					</ul>
				</section>
				<section>
					<h4>need</h4>
					<ul>
						{requiredIngredientsDisplay}
					</ul>
				</section>
			</section>
		</section>
	);
}
