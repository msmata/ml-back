import { ItemService } from '../services/ItemService';
import { ItemResponse } from '../types/ItemResponse';
import { ItemController } from './ItemController';

describe('Item Controller Unit Test', () => {
	let itemController = new ItemController();
	let listItemsMock = jest.fn();
	let controllerResponse;
	let mockRequest: any;
	let mockResponse: any;

	const givenItemServiceReturnsAnItemResponse = () => {
		listItemsMock.mockImplementation((_query: string) => {
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
						free_shipping: true
					}
				],
			};

			return itemResponse;
		});
		itemController.itemService.listItems = listItemsMock;
	};
	const whenItemControllerIsExecuted = () => {
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

		controllerResponse = itemController.listItems(mockRequest, mockResponse);
	};
	const thenResponseShouldBeSuccessful = () => {
		expect(mockResponse.statusCode).toBe(200);
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

	it('Should return a response with an array of items', () => {
		givenItemServiceReturnsAnItemResponse();
		whenItemControllerIsExecuted();
		thenResponseShouldBeSuccessful();
		thenResponseShouldContainAnArrayOfItems();
	});
});
