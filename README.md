# express-api-boilerplate


## Setup
### Database
To setup the project locally install Postgres and set `PG_URL ` to your database. The format should `postgres://USERNAME:PASSWORD@localhost/DB`. The capitalized words should be replaced with your own values.

To export your variable on a Unix-system, simply use the `export` command, i.e. `export PG_URL=your value`.

### Local production environment
Run `npm run build` to get a transpiled version of the API, then start with `npm start`.

### Local development environment
If you're gonna develop:

1. Install nodemon `npm install -g nodemon`
2. Run  `npm run start:dev` Remember that you can run it with environment variables in before the command, i.e. `PG_URL=value npm run start:dev`.

This will watch for changes and keep the application open for you.

## Usage

1. Create your models with Sequelize and place in `models/`. Look at the example for inspiration.
2. Create a controller for the new entity by extending the common CRUD controller. See `controllers/example.controller.js`
3. Create routes for the entity, see `routes/example.routes.js`.
4. Rename the namespace in line 7 of `models/index.js`

That's about it.

## Tests

### Single run

* Run unit tests & code lint with `npm test`. This will use your local database.
* Run just unit tests with `npm run tests` with `NODE_ENV=test`. This will use your local database.

### Watch

Run the unit tests continuously with `npm run test:watch`, only the tests currently worked on will run when updated.
All tests will run when a server file is updated. This will use your local database.

## Credit
Thanks to [Larsen](https://github.com/larseen) for inspiration and support.
