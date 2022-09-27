import { Author } from './Author';
import { SingleItem } from './SingleItem';

export type SingleItemResponse = {
	author: Author;
	item: SingleItem;
	breadcrumb: string;
};
