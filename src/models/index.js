import cls from 'continuation-local-storage';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config';

const namespace = cls.createNamespace('express-api-boilerplate');
const logging = config.nodeEnv === 'development' ? console.log : false; // eslint-disable-line
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

// create sequelize instance with continuation local storage
Sequelize.cls = namespace;
const sequelize = new Sequelize(config.pgUrl, { logging });


const db = fs
    .readdirSync(__dirname)
    .filter(filename => /model.js$/.test(filename))
    .reduce((total, filename) => {
        const model = sequelize.import(path.resolve(__dirname, filename));
        total[capitalize(model.name)] = model; // eslint-disable-line
        return total;
    }, {});

/**
 * Sets up the associations for each model.
 * @param  {string} modelName
 */
Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

const total = {
    namespace,
    sequelize,
    Sequelize,
    ...db
};

export default total;
