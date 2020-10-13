import React from 'react';

export const Recipe = (props) => {
	const existingIngredients = props.existingIngredients.map((ingredient, ind) => {
		return <li key={ind}>{ingredient}</li>
	});

	const requiredIngredients = props.requiredIngredients.map((ingredient, ind) => {
		return <li key={ind}>{ingredient}</li>
	});

	return (
		<section>
			<img src={props.imageSource} />	
			<h3>{props.text}</h3>
			<section>
				<section>
					<h4>have</h4>
					<ul>
						{existingIngredients}
					</ul>
				</section>
				<section>
					<h4>need</h4>
					<ul>
						{requiredIngredients}
					</ul>
				</section>
			</section>
		</section>
	);
}
