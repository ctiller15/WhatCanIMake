import { Box } from '@material-ui/core';
import React from 'react';

import './Footer.css';

export const Footer = () => {
	return(
		<Box className="footer"
			alignSelf="stretch">
			<p>Check this project out on <a rel="noopener noreferrer" href="https://github.com/ctiller15/WhatCanIMake" target="_blank">github!</a></p>
			<p>Powered by <a href="https://spoonacular.com/food-api">spoonacular food api</a></p>
		</Box>
	);
}
