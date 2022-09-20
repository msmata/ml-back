import { LIST_ITEM_MOCK_RESPONSE } from "../adapters/ListItemMockResponse";
import { ItemResponse } from "../types/ItemResponse";
import { ItemService } from "./ItemService";

describe('Item Service Unit Test', () => {

    let query: string;
    let itemService = new ItemService();
    let itemResponse: ItemResponse;
    
    const givenAQuery = () => {
        query = 'motog20';
    };
    
    const givenAQueryItemResponse = () => {
        const queryItemResponse = JSON.parse(LIST_ITEM_MOCK_RESPONSE);
        const connectorListItemsMock = jest.fn();
        connectorListItemsMock.mockImplementation(async (_query: string): Promise<any> => {
            return queryItemResponse;
        });
        itemService.mercadoLibreConnector.listItems = connectorListItemsMock;
    };
    const whenItemServiceIsExecuted = async () => {
        itemResponse = await itemService.listItems(query);
    };
    const thenResponseShouldBeAnItemResponse = () => {
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
    };

    it('Should return an ItemResponse', async () => {
        givenAQuery();
        givenAQueryItemResponse();
        await whenItemServiceIsExecuted();
        thenResponseShouldBeAnItemResponse();
    });
});