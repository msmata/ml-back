import { Request, Response } from 'express';
import { ItemService } from '../services/ItemService';

export class ItemController {
	public itemService: ItemService;

	constructor() {
		this.itemService = new ItemService();
	}

	public listItems = (request: Request, response: Response) => {
		const query = request.query.query as string;
		const itemResponse = this.itemService.listItems(query);
		return response.status(200).send(itemResponse);
	};
}
