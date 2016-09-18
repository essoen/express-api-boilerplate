/**
 * Main application file, contains all the bootstrapping and boilerplating
 * for creating a rest server with express
 * @module app
 */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from 'errorhandler';
import bodyParser from 'body-parser';
import raven from 'raven';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import config from './config';
import routes from './routes';
import { sentryClient } from './components/errors';

const app = express();

if (config.env === 'production' || config.env === 'staging') {
    app.use(raven.middleware.express.requestHandler(sentryClient));
    sentryClient.patchGlobal(() => {
        process.exit(1);
    });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));

if (app.get('env') === 'development') {
    app.use(errorHandler());
}


app.use('/', routes);

export default app;
