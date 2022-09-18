import { ItemResponse } from '../types/ItemResponse';

export class ItemService {
	public listItems(_query: string): ItemResponse {
		const itemResponse: ItemResponse = {
			author: {
				name: 'Martin',
				lastname: 'Mata',
			},
			categories: [],
			items: [],
		};

		return itemResponse;
	}
}
