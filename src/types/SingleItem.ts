import { Item } from './Item';

export type SingleItem = Item & {
	sold_quantity: number;
	description: string;
};
