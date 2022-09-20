import { Request, Response } from 'express';
import { ItemService } from '../services/ItemService';

export class ItemController {
	public itemService: ItemService;

	constructor() {
		this.itemService = new ItemService();
	}

	public listItems = (request: Request, response: Response) => {
		const query = request.query.query as string;

		try {
			const itemResponse = this.itemService.listItems(query);
			return response.status(200).send(itemResponse);
		} catch(error) {
			return response.status(500).send({errorMessage: 'Ocurrió un error al consultar la API de Mercado Libre'});
		}
	};
}
