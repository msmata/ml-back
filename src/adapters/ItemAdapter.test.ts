import { ItemResponse } from "../types/ItemResponse";
import { SingleItemResponse } from "../types/SingleItemResponse";
import { GET_SINGLE_ITEM_DESCRIPTION_MOCK_RESPONSE } from "./GetSingleItemDescriptionMockResponse";
import { GET_SINGLE_ITEM_MOCK_RESPONSE } from "./GetSingleItemMockResponse";
import { ItemAdapter } from "./ItemAdapter";
import { LIST_ITEM_MOCK_RESPONSE } from "./ListItemMockResponse";

describe('Item Adapter Unit Test', () => {

    let queryItemResponse: any;
    let querySingleItemResponse: any;
    let querySingleItemDescriptionResponse: any;
    let itemAdapter = new ItemAdapter();
    let itemResponse: ItemResponse;
    let singleItemResponse: SingleItemResponse;

    const givenAQueryItemResponse = () => {
        queryItemResponse = JSON.parse(LIST_ITEM_MOCK_RESPONSE);
    };

    const givenAQuerySingleItemResponse = () => {
        querySingleItemResponse = JSON.parse(GET_SINGLE_ITEM_MOCK_RESPONSE);
    };

    const givenAQuerySingleItemDescriptionResponse = () => {
        querySingleItemDescriptionResponse = JSON.parse(GET_SINGLE_ITEM_DESCRIPTION_MOCK_RESPONSE);
    };

    const whenItemAdapterIsExecuted = () => {
        itemResponse = itemAdapter.queryItems(queryItemResponse);
    };

    const whenSingleItemAdapterIsExecuted = () => {
        singleItemResponse = itemAdapter.querySingleItems(querySingleItemResponse, querySingleItemDescriptionResponse);
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

    const thenASingleItemResponseShouldBeReturned = () => {
        expect(singleItemResponse.author.name).toBe('Martin');
        expect(singleItemResponse.author.lastname).toBe('Mata');
        expect(singleItemResponse.item.id).toBe('MLA917400408');
        expect(singleItemResponse.item.title).toBe('Soporte Para Estantes 5/5 100 Unid  Pituto Estante Muebles');
        expect(singleItemResponse.item.price.amount).toBe(540);
        expect(singleItemResponse.item.price.currency).toBe('ARS');
        expect(singleItemResponse.item.price.decimals).toBe(37);
        expect(singleItemResponse.item.picture).toBe('http://http2.mlstatic.com/D_654660-MLA45667151245_042021-I.jpg');
        expect(singleItemResponse.item.condition).toBe('new');
        expect(singleItemResponse.item.free_shipping).toBeFalsy();
        expect(singleItemResponse.item.sold_quantity).toBe(250);
        expect(singleItemResponse.item.description).toBe('SOPORTE PARA ESTANTES 5/5 NIQUELADOS. CONSULTAR COMPRAS AL POR MAYOR BUELTOS DE 8000 UNIDADES. VALOR X 100 UNIDADES------FRACCIONES DE 100, 500, 1000 Y 8000 UNIDADES. SOMOS ROTECH HERRAJES, IMPORTADORES DIRECTOS DE INSUMOS PARA LA INDUSTRIA DEL MUEBLE. IMPORTAMOS: GUIAS OCULTAS, TELESCOPICAS, GUIA TANDEM LATERAL DE CHAPA, BISAGRAS CIERRE SUAVE LINEAS PESADAS, TORNILLOS Y ABRASIVOS. DISTRIBUIDORES OFICIALES DE KEKOL, TITEBON, SIA ABRASIVOS SUIZOS, TORX, BARIGUI, GRUPO EURO, ETC.');
    };

    it('Should return an ItemResponse', () => {
        givenAQueryItemResponse();
        whenItemAdapterIsExecuted();
        thenAnItemResponseShouldBeReturned();
    });

    it('Should return a SingleItemResponse', () => {
        givenAQuerySingleItemResponse();
        givenAQuerySingleItemDescriptionResponse();
        whenSingleItemAdapterIsExecuted();
        thenASingleItemResponseShouldBeReturned();
    });
});