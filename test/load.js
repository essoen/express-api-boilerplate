/* eslint-disable no-console */
import { loadFixtures } from './helpers';

// verify that we are not in production
if (process.env.NODE_ENV === 'production') {
    console.log('Unable to load database in production (NODE_ENV==\'production\')');
    process.exit(1);
}

loadFixtures()
    .then(() => {
        console.log('Loaded fixtures!');
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
});
