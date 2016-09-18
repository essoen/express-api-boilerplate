import child from 'child_process';
import { loadFixtures } from './helpers';

loadFixtures()
    .then(() => child.execSync('node dist/index.js'));
