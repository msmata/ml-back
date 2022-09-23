import { Price } from './Price';

export type Item = {
	id: string;
	title: string;
	price: Price;
	picture: string;
	condition: string;
	free_shipping: Boolean;
	location?: string;
};
