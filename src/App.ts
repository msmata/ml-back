import express from 'express';
import cors from 'cors';
import { ItemRoute } from './routes/ItemRoute';

class App {
	public app: express.Application;
	private itemRoutes: ItemRoute;

	constructor() {
		this.app = express();
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cors());
		this.itemRoutes = new ItemRoute();
		this.itemRoutes.routes(this.app);
	}
}

export default new App().app;
