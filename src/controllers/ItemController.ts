import { Request, Response } from 'express';
import { ItemService } from '../services/ItemService';

export class ItemController {
	public itemService: ItemService;

	constructor() {
		this.itemService = new ItemService();
	}

	public listItems = async (request: Request, response: Response) => {
		const query = request.query.query as string;

		try {
			const itemResponse = await this.itemService.listItems(query);
			return response.status(200).send(itemResponse);
		} catch (error) {
			console.error('ERROR');
			console.error(error);
			return response.status(500).send({ errorMessage: 'Ocurrió un error al consultar la API de Mercado Libre' });
		}
	};

	public getSingleItem = async (request: Request, response: Response) => {
		const itemId = request.params.id;

		try {
			const singleItemResponse = await this.itemService.getSingleItem(itemId);
			return response.status(200).send(singleItemResponse);
		} catch (error) {
			console.error('ERROR');
			console.error(error);
			return response.status(500).send({ errorMessage: 'Ocurrió un error al consultar la API de Mercado Libre' });
		}
	};
}
