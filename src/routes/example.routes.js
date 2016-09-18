import ExampleController from '../controllers/example.controller';
import bindControllerToCRUDRoutes from './helpers';

const controller = new ExampleController();
export default bindControllerToCRUDRoutes(controller);
