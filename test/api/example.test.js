import { describe } from 'ava-spec';
import request from 'supertest-as-promised';
import { getAllElements, loadFixtures } from '../helpers';
import app from '../../src/app';

const fixtures = [
    'examples'
];

const URI = '/examples';

let dbObjects;

describe.serial('Example API', it => {
    it.beforeEach(() =>
        loadFixtures(fixtures)
            .then(() => getAllElements('Example'))
            .then(response => {
                dbObjects = response;
            })
    );

    it('should reitrieve a list of all examples', async t => {
        const response = await request(app)
            .get(URI)
            .expect(200)
            .then(res => res.body);
        t.is(response.length, dbObjects.length);
    });

    it('should return a single example', async t => {
        const fixture = dbObjects[0];
        const response = await request(app)
            .get(`${URI}/${fixture.id}`)
            .expect(200);
        t.is(response.body.name, fixture.name);
    });

    it('should return ResourceNotFound when retrieving nonexisting example', async t => {
        const fixture = dbObjects[0];
        const response = await request(app)
            .get(`${URI}/${fixture.id + 10000}`)
            .expect(404);
        t.is(response.body.name, 'ResourceNotFoundError');
        t.is(response.body.message, 'Could not find resource of type example');
    });

    it('should add a new example', async t => {
        const content = {
            name: 'added example'
        };
        const response = await request(app)
            .post(URI)
            .send(content)
            .expect(201);

        t.is(response.body.name, content.name);
    });

    it('should be able to update an example', async () => {
        const example = dbObjects[0];
        await request(app)
            .put(`${URI}/${example.id}`)
            .send({ name: 'changed' })
            .expect(204);
    });

    it('should be able to delete an example', async () => {
        const example = dbObjects[0];
        await request(app)
            .delete(`${URI}/${example.id}`)
            .expect(204);
    });
});
