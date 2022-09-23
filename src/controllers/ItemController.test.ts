import { ItemResponse } from '../types/ItemResponse';
import { SingleItemResponse } from '../types/SingleItemResponse';
import { ItemController } from './ItemController';

describe('Item Controller Unit Tests', () => {
	let itemController = new ItemController();
	let listItemsMock = jest.fn();
	let getSingleItemMock = jest.fn();
	let mockRequest: any;
	let mockResponse: any;

	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetAllMocks();
	});

	const thenResponseShouldBeSuccessful = () => {
		expect(mockResponse.statusCode).toBe(200);
	};

	const thenResponseShouldAnErrorMessage = () => {
		const response = mockResponse.sendMessage;
		expect(response.errorMessage).toBe("Ocurrió un error al consultar la API de Mercado Libre");
	};

	const thenResponseShouldBeInternalError = () => {
		expect(mockResponse.statusCode).toBe(500);
	};

	describe('List items Unit Tests', () => {
		const givenItemServiceReturnsAnItemResponse = () => {
			listItemsMock.mockImplementation(async (_query: string) => {
				const itemResponse: ItemResponse = {
					author: {
						name: 'Martin',
						lastname: 'Mata',
					},
					categories: ['MLA1055'],
					items: [
						{
							id: '01',
							title: 'Motorola G20',
							price: {
								"currency": 'ARS',
								"amount": 44999,
								"decimals": 99
							},
							picture: 'http://http2.mlstatic.com/D_852458-MLA48270995220_112021-I.jpg',
							condition: 'new',
							free_shipping: true,
							location: 'Tristan Suarez'
						}
					],
				};

				return itemResponse;
			});
			itemController.itemService.listItems = listItemsMock;
		};
		const givenListItemsServiceThrowsAnError = () => {
			listItemsMock.mockImplementation((_query: string) => {throw new Error('MercadoLibre Internal Error')});
			itemController.itemService.listItems = listItemsMock;
		};
		const whenListItemsIsExecuted = async () => {
			mockRequest = {};
			mockRequest.query = {};
			mockRequest.query.query = 'moto g20';
			mockResponse = {
				statusCode: 200,
				sendMessage: '',
				status: function (code: number) {
					this.statusCode = code;
					return mockResponse;
				},
				send: function (message: string) {
					this.sendMessage = message;
					return mockResponse;
				},
			};

			await itemController.listItems(mockRequest, mockResponse);
		};

		const thenResponseShouldContainAnArrayOfItems = () => {
			const response = mockResponse.sendMessage;
			expect(response.author.lastname).toBe("Mata");
			expect(response.author.name).toBe("Martin");
			expect(response.categories.length).toBe(1);
			const category = response.categories[0];
			expect(category).toBe("MLA1055");
			expect(response.items.length).toBe(1);
			const item = response.items[0];
			expect(item.title).toBe("Motorola G20");
		};

		it('Should return a response with an array of items', async () => {
			givenItemServiceReturnsAnItemResponse();
			await whenListItemsIsExecuted();
			thenResponseShouldBeSuccessful();
			thenResponseShouldContainAnArrayOfItems();
		});

		it('Should return a response with an error', async () => {
			givenListItemsServiceThrowsAnError();
			await whenListItemsIsExecuted();
			thenResponseShouldBeInternalError();
			thenResponseShouldAnErrorMessage();
		});
	});

	describe('Get single item Unit Tests', () => {

		const givenItemServiceReturnsASingleItemResponse = () => {
			getSingleItemMock.mockImplementation(async (_itemId: string) => {
				const itemResponse: SingleItemResponse = {
					author: {
						name: 'Martin',
						lastname: 'Mata'
					},
					item: {
						id:  'MLA917400408',
						title:  'Soporte Para Estantes 5/5 100 Unid  Pituto Estante Muebles',
						price:  {
							currency: 'ARS',
							amount: 540,
							decimals: 37,
						},
						picture: 'http://http2.mlstatic.com/D_654660-MLA45667151245_042021-I.jpg',
						condition: 'new',
						free_shipping: false,
						sold_quantity: 250,
						description: 'SOPORTE PARA ESTANTES 5/5 NIQUELADOS. CONSULTAR COMPRAS AL POR MAYOR BUELTOS DE 8000 UNIDADES. VALOR X 100 UNIDADES------FRACCIONES DE 100, 500, 1000 Y 8000 UNIDADES. SOMOS ROTECH HERRAJES, IMPORTADORES DIRECTOS DE INSUMOS PARA LA INDUSTRIA DEL MUEBLE. IMPORTAMOS: GUIAS OCULTAS, TELESCOPICAS, GUIA TANDEM LATERAL DE CHAPA, BISAGRAS CIERRE SUAVE LINEAS PESADAS, TORNILLOS Y ABRASIVOS. DISTRIBUIDORES OFICIALES DE KEKOL, TITEBON, SIA ABRASIVOS SUIZOS, TORX, BARIGUI, GRUPO EURO, ETC.'
					}
				};

				return itemResponse;
			});
			itemController.itemService.getSingleItem = getSingleItemMock;
		};

		const givenItemServiceThrowsAnError = () => {
			getSingleItemMock.mockImplementation((_itemId: string) => {throw new Error('MercadoLibre Internal Error')});
			itemController.itemService.getSingleItem = getSingleItemMock;
		};

		const whenGetSingleItemIsExecuted = async () => {
			mockRequest = {};
			mockRequest.params = {};
			mockRequest.params.id = 'MLA917400408';
			mockResponse = {
				statusCode: 200,
				sendMessage: '',
				status: function (code: number) {
					this.statusCode = code;
					return mockResponse;
				},
				send: function (message: string) {
					this.sendMessage = message;
					return mockResponse;
				},
			};

			await itemController.getSingleItem(mockRequest, mockResponse);
		};

		const thenResponseShouldContainASingleItem = () => {
			const response = mockResponse.sendMessage;
			expect(response.author.name).toBe('Martin');
			expect(response.author.lastname).toBe('Mata');
			expect(response.item.id).toBe('MLA917400408');
			expect(response.item.title).toBe('Soporte Para Estantes 5/5 100 Unid  Pituto Estante Muebles');
			expect(response.item.price.amount).toBe(540);
			expect(response.item.price.currency).toBe('ARS');
			expect(response.item.price.decimals).toBe(37);
			expect(response.item.picture).toBe('http://http2.mlstatic.com/D_654660-MLA45667151245_042021-I.jpg');
			expect(response.item.condition).toBe('new');
			expect(response.item.free_shipping).toBeFalsy();
			expect(response.item.sold_quantity).toBe(250);
			expect(response.item.description).toBe('SOPORTE PARA ESTANTES 5/5 NIQUELADOS. CONSULTAR COMPRAS AL POR MAYOR BUELTOS DE 8000 UNIDADES. VALOR X 100 UNIDADES------FRACCIONES DE 100, 500, 1000 Y 8000 UNIDADES. SOMOS ROTECH HERRAJES, IMPORTADORES DIRECTOS DE INSUMOS PARA LA INDUSTRIA DEL MUEBLE. IMPORTAMOS: GUIAS OCULTAS, TELESCOPICAS, GUIA TANDEM LATERAL DE CHAPA, BISAGRAS CIERRE SUAVE LINEAS PESADAS, TORNILLOS Y ABRASIVOS. DISTRIBUIDORES OFICIALES DE KEKOL, TITEBON, SIA ABRASIVOS SUIZOS, TORX, BARIGUI, GRUPO EURO, ETC.');
		};

		it('Should return a response with a single item', async () => {
			givenItemServiceReturnsASingleItemResponse();
			await whenGetSingleItemIsExecuted();
			thenResponseShouldBeSuccessful();
			thenResponseShouldContainASingleItem();
		});

		it('Should return a response with an error', async () => {
			givenItemServiceThrowsAnError();
			await whenGetSingleItemIsExecuted();
			thenResponseShouldBeInternalError();
			thenResponseShouldAnErrorMessage();
		});
	});
});
