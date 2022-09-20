import { ItemResponse } from '../types/ItemResponse';

export class ItemAdapter {

    private parsePriceDecimals(price: string): Number {
        const fractionalPart = (parseFloat(price) % 1);
        const fractionalPartWithOnlyTwoDecimals = fractionalPart.toFixed(2);
        const decimalsWithoutIntegerPart = fractionalPartWithOnlyTwoDecimals.substring(2);
        return parseInt(decimalsWithoutIntegerPart);
    }

    public queryItems(mercadoLibreResponse: any): ItemResponse {
        const categories = mercadoLibreResponse.results.map((r: { category_id: any; }) => r.category_id);
        const items = mercadoLibreResponse.results.map((r: any) => {
            return {
                id: r.id,
                title: r.title,
                price: {
                    currency: r.currency_id,
                    amount: Math.floor(r.price),
                    decimals: this.parsePriceDecimals(r.price)
                },
                picture: r.thumbnail,
                condition: r.condition,
                free_shipping: r.shipping.free_shipping
            };
        });

        return {
            author: {
                name: process.env.AUTHOR_NAME || '',
                lastname: process.env.AUTHOR_LASTNAME || ''
            },
            categories,
            items
        };
    }
}