import { GET_SINGLE_ITEM_DESCRIPTION_MOCK_RESPONSE } from '../adapters/GetSingleItemDescriptionMockResponse';
import { GET_SINGLE_ITEM_MOCK_RESPONSE } from '../adapters/GetSingleItemMockResponse';
import { LIST_ITEM_MOCK_RESPONSE } from '../adapters/ListItemMockResponse';
import { ItemResponse } from '../types/ItemResponse';
import { SingleItemResponse } from '../types/SingleItemResponse';
import { ItemService } from './ItemService';

describe('Item Service Unit Test', () => {
	let query: string;
	let itemId: string;
	let itemService = new ItemService();
	let itemResponse: ItemResponse;
	let singleItemResponse: SingleItemResponse;

	const givenAQuery = () => {
		query = 'motog20';
	};

	const givenAnItemId = () => {
		itemId = 'MLA917400408';
	};

	const givenAQueryItemResponse = () => {
		const queryItemResponse = JSON.parse(LIST_ITEM_MOCK_RESPONSE);
		const connectorListItemsMock = jest.fn();
		connectorListItemsMock.mockImplementation(async (_query: string): Promise<any> => {
			return queryItemResponse;
		});
		itemService.mercadoLibreConnector.listItems = connectorListItemsMock;
	};

	const givenAQuerySingleItemResponse = () => {
		const querySingleItemResponse = JSON.parse(GET_SINGLE_ITEM_MOCK_RESPONSE);
		const connectorSingleItemMock = jest.fn();
		connectorSingleItemMock.mockImplementation(async (_itemId: string): Promise<any> => {
			return querySingleItemResponse;
		});
		itemService.mercadoLibreConnector.getItemById = connectorSingleItemMock;
	};

	const givenAQuerySingleItemDescriptionResponse = () => {
		const querySingleItemDescriptionResponse = JSON.parse(GET_SINGLE_ITEM_DESCRIPTION_MOCK_RESPONSE);
		const connectorSingleItemDescriptionMock = jest.fn();
		connectorSingleItemDescriptionMock.mockImplementation(async (_itemId: string): Promise<any> => {
			return querySingleItemDescriptionResponse;
		});
		itemService.mercadoLibreConnector.getItemDescriptionById = connectorSingleItemDescriptionMock;
	};

	const whenItemServiceIsExecuted = async () => {
		itemResponse = await itemService.listItems(query);
	};

	const whenSingleItemServiceIsExecuted = async () => {
		singleItemResponse = await itemService.getSingleItem(itemId);
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

	const thenResponseShouldBeASingleItemResponse = () => {
		expect(singleItemResponse.author.name).toBe('Martin');
		expect(singleItemResponse.author.lastname).toBe('Mata');
		expect(singleItemResponse.item.id).toBe('MLA917400408');
		expect(singleItemResponse.item.title).toBe('Soporte Para Estantes 5/5 100 Unid  Pituto Estante Muebles');
		expect(singleItemResponse.item.price.amount).toBe(540);
		expect(singleItemResponse.item.price.currency).toBe('ARS');
		expect(singleItemResponse.item.price.decimals).toBe(37);
		expect(singleItemResponse.item.picture).toBe('http://http2.mlstatic.com/D_654660-MLA45667151245_042021-O.jpg');
		expect(singleItemResponse.item.condition).toBe('Nuevo');
		expect(singleItemResponse.item.free_shipping).toBeFalsy();
		expect(singleItemResponse.item.sold_quantity).toBe(250);
		expect(singleItemResponse.item.description).toBe(
			'SOPORTE PARA ESTANTES 5/5 NIQUELADOS. CONSULTAR COMPRAS AL POR MAYOR BUELTOS DE 8000 UNIDADES. VALOR X 100 UNIDADES------FRACCIONES DE 100, 500, 1000 Y 8000 UNIDADES. SOMOS ROTECH HERRAJES, IMPORTADORES DIRECTOS DE INSUMOS PARA LA INDUSTRIA DEL MUEBLE. IMPORTAMOS: GUIAS OCULTAS, TELESCOPICAS, GUIA TANDEM LATERAL DE CHAPA, BISAGRAS CIERRE SUAVE LINEAS PESADAS, TORNILLOS Y ABRASIVOS. DISTRIBUIDORES OFICIALES DE KEKOL, TITEBON, SIA ABRASIVOS SUIZOS, TORX, BARIGUI, GRUPO EURO, ETC.',
		);
	};

	it('Should return an ItemResponse', async () => {
		givenAQuery();
		givenAQueryItemResponse();
		await whenItemServiceIsExecuted();
		thenResponseShouldBeAnItemResponse();
	});

	it('Should return a SingleItemResponse', async () => {
		givenAnItemId();
		givenAQuerySingleItemResponse();
		givenAQuerySingleItemDescriptionResponse();
		await whenSingleItemServiceIsExecuted();
		thenResponseShouldBeASingleItemResponse();
	});
});
