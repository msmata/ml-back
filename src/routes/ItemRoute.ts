import express from 'express';
import { ItemController } from '../controllers/ItemController';

export class ItemRoute {
	private itemController: ItemController;

	constructor() {
		this.itemController = new ItemController();
	}

	public routes(application: express.Application) {
		application.route('/api/items').get(this.itemController.listItems);
		application.route('/api/items/:id').get(this.itemController.getSingleItem);
	}
}
