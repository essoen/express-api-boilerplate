import CRUD from './CRUD';
import db from '../models';

class ExampleController extends CRUD {
    constructor() {
        super(db.Example, 'example');
    }
}

export default ExampleController;
