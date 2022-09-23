import axios from 'axios';

export class MercadoLibreConnector {

    private apiClient;

    constructor() {
        this.apiClient = axios.create({ baseURL: process.env.MERCADO_LIBRE_API_URL});
    }

    public async listItems(query: string) {
        const mercadoLibreResponse = await this.apiClient.get(`/sites/MLA/search?q=${query}`);
        return mercadoLibreResponse.data;
    }

    public async getItemById(id: string) {
        const mercadoLibreResponse = await this.apiClient.get(`items/${id}`);
        return mercadoLibreResponse.data;
    }

    public async getItemDescriptionById(id: string) {
        const mercadoLibreResponse = await this.apiClient.get(`items/${id}/description`);
        return mercadoLibreResponse.data;
    }
}