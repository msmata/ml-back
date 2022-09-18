import { Price } from './Price';

export type Item = {
	id: String;
	title: String;
	price: Price;
	picture: String;
	condition: String;
	free_shipping: Boolean;
};
