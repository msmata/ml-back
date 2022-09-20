import { ItemAdapter } from '../adapters/ItemAdapter';
import { MercadoLibreConnector } from '../connectors/MercadoLibreConnector';
import { ItemResponse } from '../types/ItemResponse';

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
}
