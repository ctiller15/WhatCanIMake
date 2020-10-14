import axios from 'axios';

import { fetchRecipesByIngredient } from '../../api/client';

jest.mock('axios');

// Unneeded, but hey! Practice project!

describe('fetchData', () => {
	it('fetches data from the external API', async () => {
		const data = {
		  data: {
			hits: [
			  {
				objectID: '1',
				title: 'a',
			  },
			  {
				objectID: '2',
				title: 'b',
			  },
			],
		  },
		};

		axios.get.mockImplementationOnce(() => Promise.resolve(data));
		
		await expect(fetchRecipesByIngredient('food')).resolves.toEqual(data);
	});

	it('fails to fetch data from the external API', async () => {
		const errorMessage = 'Network Error';

		axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

		await expect(fetchRecipesByIngredient('nofood')).rejects.toThrow(errorMessage);
	});
});
