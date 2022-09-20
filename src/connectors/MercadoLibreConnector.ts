import axios from 'axios';

export class MercadoLibreConnector {

    private apiClient;

    constructor() {
        this.apiClient = axios.create({ baseURL: 'https://api.mercadolibre.com'});
    }

    public async listItems(query: String) {
        const mercadoLibreResponse = await this.apiClient.get(`/sites/MLA/search?q=${query}`);
        return mercadoLibreResponse.data;
    }
}