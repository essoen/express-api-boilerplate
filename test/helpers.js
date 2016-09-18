import sequelizeFixtures from 'sequelize-fixtures';
import path from 'path';
import db from '../src/models';
import { syncDB } from '../src/db-helpers';


export function loadFixtures(fixtures) {
    const f = fixtures || [
        'examples'
    ];
    const fixturePaths = f.map(file => `${path.resolve(__dirname)}/fixtures/${file}.json`);
    return syncDB({ force: true })
        .then(() => sequelizeFixtures.loadFiles(fixturePaths, db));
}

/**
 * getAllElements - Gives you one of the fixture elements of a given type
 *
 * @param {model} - Model you want to get elements from
 * @return {Array}  - All fixture elements form db
 */
export function getAllElements(model) {
    return db[model].findAll()
        .then(objects => objects.map(object => object.toJSON()));
}
