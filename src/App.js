import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

import Button from '@material-ui/core/Button'

function App() {
  return (
    <div className="App">
		<header>
			<Button color="primary">
				Search
			</Button>
      	</header>
    </div>
  );
}

export default App;
