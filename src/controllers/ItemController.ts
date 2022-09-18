import { Request, Response } from 'express';

export class ItemController {
	public listItems = (_request: Request, response: Response) => {
		return response.status(200).send([]);
	};
}
