import React, { useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

import { Button, Input } from '@material-ui/core'

function App() {
	const [ingredient, setIngredient] = useState('')

	const onIngredientChanged = e => setIngredient(e.target.value)

  return (
    <div className="App">
		<section>
			<Input
				type="text" 
				placeholder="Input an ingredient!"
				value={ingredient}
				onChange={onIngredientChanged}
			/>
			<Button>
				Add Ingredient	
			</Button>
			<Button color="primary">
				Search
			</Button>
		</section>
    </div>
  );
}

export default App;
