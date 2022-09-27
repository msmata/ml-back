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

	private getModeCategory(categories: string[]) {
		const sortedCategories = [...categories].sort();
		let maxMode = 0;
		let maxModeCategory = '';

		for (let i = 0;i < sortedCategories.length;i++) {
			let categoryQuantity = 0;
			let j = i;

			while (j < sortedCategories.length && sortedCategories[i] === sortedCategories[j]) {
				categoryQuantity++;
				j++;
			}

			if (categoryQuantity > maxMode) {
				maxMode = categoryQuantity;
				maxModeCategory = sortedCategories[i];
			}
		}

		return maxModeCategory;
	}

	public async listItems(query: string): Promise<ItemResponse> {
		const queryListResponse = await this.mercadoLibreConnector.listItems(query);
		const itemResponse: ItemResponse = this.itemAdapter.queryItems(queryListResponse);
		const maxModeCategory = this.getModeCategory(itemResponse.categories);
		const categoryDescriptionResponse = await this.mercadoLibreConnector.getCategoryDescription(maxModeCategory);
		const breadcrumb = this.itemAdapter.queryBreadcrumb(categoryDescriptionResponse);
		itemResponse.breadcrumb = breadcrumb;
		return itemResponse;
	}

	public async getSingleItem(itemId: string): Promise<SingleItemResponse> {
		const mercadoLibreSingleItemResponsePromise = this.mercadoLibreConnector.getItemById(itemId);
		const mercadoLibreSingleItemDescriptionResponsePromise =
			this.mercadoLibreConnector.getItemDescriptionById(itemId);
		const [mercadoLibreSingleItemResponse, mercadoLibreSingleItemDescriptionResponse] = await Promise.all([
			mercadoLibreSingleItemResponsePromise,
			mercadoLibreSingleItemDescriptionResponsePromise,
		]);
		const singleItemResponse: SingleItemResponse = this.itemAdapter.querySingleItems(
			mercadoLibreSingleItemResponse,
			mercadoLibreSingleItemDescriptionResponse,
		);
		return singleItemResponse;
	}
}
