import { ItemAdapter } from '../adapters/ItemAdapter';
import { MercadoLibreConnector } from '../connectors/MercadoLibreConnector';
import { ItemResponse } from '../types/ItemResponse';
import { SingleItemResponse } from '../types/SingleItemResponse';

export class ItemService {

	public mercadoLibreConnector: MercadoLibreConnector;
	private itemAdapter: ItemAdapter;

	constructor() {
		this.mercadoLibreConnector = new MercadoLibreConnector();
		this.itemAdapter = new ItemAdapter();
	}

	public async listItems(query: string): Promise<ItemResponse> {
		const mercadoLibreResponse = await this.mercadoLibreConnector.listItems(query);
		const itemResponse: ItemResponse = this.itemAdapter.queryItems(mercadoLibreResponse);
		return itemResponse;
	}

	public async getSingleItem(itemId: string): Promise<SingleItemResponse> {
		const mercadoLibreSingleItemResponse = await this.mercadoLibreConnector.getItemById(itemId);
		const mercadoLibreSingleItemDescriptionResponse = await this.mercadoLibreConnector.getItemDescriptionById(itemId);
		const singleItemResponse: SingleItemResponse = this.itemAdapter.querySingleItems(mercadoLibreSingleItemResponse, mercadoLibreSingleItemDescriptionResponse);
		return singleItemResponse;
	}
}
