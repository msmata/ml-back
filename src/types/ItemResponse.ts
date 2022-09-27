import { Author } from './Author';
import { Item } from './Item';

export type ItemResponse = {
	author: Author;
	categories: string[];
	breadcrumb: string;
	items: Item[];
};
