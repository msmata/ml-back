import { ItemResponse } from '../types/ItemResponse';
import { SingleItemResponse } from '../types/SingleItemResponse';

export class ItemAdapter {
	private parsePriceDecimals(price: string): number {
		const fractionalPart = parseFloat(price) % 1;
		const fractionalPartWithOnlyTwoDecimals = fractionalPart.toFixed(2);
		const decimalsWithoutIntegerPart = fractionalPartWithOnlyTwoDecimals.substring(2);
		return parseInt(decimalsWithoutIntegerPart);
	}

	public queryItems(mercadoLibreResponse: any): ItemResponse {
		const results = mercadoLibreResponse.results.slice(0, 4);
		const categories = results.map((r: { category_id: any }) => r.category_id);
		const items = results.map((r: any) => {
			return {
				id: r.id,
				title: r.title,
				price: {
					currency: r.currency_id,
					amount: Math.floor(r.price),
					decimals: this.parsePriceDecimals(r.price),
				},
				picture: r.thumbnail,
				condition: r.condition,
				free_shipping: r.shipping.free_shipping,
				location: r.address.city_name,
			};
		});

		return {
			author: {
				name: process.env.AUTHOR_NAME || '',
				lastname: process.env.AUTHOR_LASTNAME || '',
			},
			breadcrumb: '',
			categories,
			items,
		};
	}

	public querySingleItems(singleItemResponse: any, singleItemDescriptionResponse: any): SingleItemResponse {
		const itemPicture = singleItemResponse.pictures
			? singleItemResponse.pictures[0].url
			: singleItemResponse.thumbnail;

		const itemCondition = singleItemResponse.condition === 'new' ? 'Nuevo' : 'Usado';

		return {
			author: {
				name: process.env.AUTHOR_NAME || '',
				lastname: process.env.AUTHOR_LASTNAME || '',
			},
			item: {
				id: singleItemResponse.id,
				title: singleItemResponse.title,
				price: {
					amount: Math.floor(singleItemResponse.price),
					currency: singleItemResponse.currency_id,
					decimals: this.parsePriceDecimals(singleItemResponse.price),
				},
				picture: itemPicture,
				condition: itemCondition,
				free_shipping: singleItemResponse.shipping.free_shipping,
				sold_quantity: singleItemResponse.sold_quantity,
				description: singleItemDescriptionResponse.plain_text,
			},
		};
	}

	public queryBreadcrumb(categoryDescriptionResponse: any) {
		const pathFromRoot = categoryDescriptionResponse.path_from_root;
		const fullPath = pathFromRoot.map((pfr:any) => pfr.name);
		const breadcrumb = fullPath.join(' > ');
		return breadcrumb;
	}
}
