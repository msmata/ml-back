import { ItemResponse } from "../types/ItemResponse";
import { ItemAdapter } from "./ItemAdapter";
import { LIST_ITEM_MOCK_RESPONSE } from "./ListItemMockResponse";

describe('Item Adapter Unit Test', () => {

    let queryItemResponse: any;
    let itemAdapter = new ItemAdapter();
    let itemResponse: ItemResponse;

    const givenAQueryItemResponse = () => {
        queryItemResponse = JSON.parse(LIST_ITEM_MOCK_RESPONSE);
    };

    const whenItemAdapterIsExecuted = () => {
        itemResponse = itemAdapter.queryItems(queryItemResponse);
    };

    const thenAnItemResponseShouldBeReturned = () => {
        expect(itemResponse.author.name).toBe('Martin');
        expect(itemResponse.author.lastname).toBe('Mata');
        expect(itemResponse.categories.length).toBe(3);
        expect(itemResponse.categories[0]).toBe('MLA1055');
        expect(itemResponse.items.length).toBe(3);
        const firstItem = itemResponse.items[0];
        expect(firstItem.id).toBe('MLA1163559608');
        expect(firstItem.title).toBe(' Moto G20 64 Gb  Azul Cielo 4 Gb Ram');
        const price = firstItem.price;
        expect(price.currency).toBe('ARS');
        expect(price.amount).toBe(82999);
        expect(price.decimals).toBe(99);
        expect(firstItem.picture).toBe('http://http2.mlstatic.com/D_852458-MLA48270995220_112021-I.jpg');
        expect(firstItem.condition).toBe('new');
        expect(firstItem.free_shipping).toBe(false);
        expect(firstItem.location).toBe('Palermo');
    };

    it('Should return an ItemResponse', () => {
        givenAQueryItemResponse();
        whenItemAdapterIsExecuted();
        thenAnItemResponseShouldBeReturned();
    });
});