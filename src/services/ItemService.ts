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
		const mercadoLibreSingleItemResponsePromise = this.mercadoLibreConnector.getItemById(itemId);
		const mercadoLibreSingleItemDescriptionResponsePromise = this.mercadoLibreConnector.getItemDescriptionById(itemId);
		const [mercadoLibreSingleItemResponse, mercadoLibreSingleItemDescriptionResponse] = await Promise.all([mercadoLibreSingleItemResponsePromise, mercadoLibreSingleItemDescriptionResponsePromise]);
		const singleItemResponse: SingleItemResponse = this.itemAdapter.querySingleItems(mercadoLibreSingleItemResponse, mercadoLibreSingleItemDescriptionResponse);
		return singleItemResponse;
	}
}
