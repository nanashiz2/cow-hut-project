import mongoose from 'mongoose';
import config from './config/config';
import { Server } from 'http';
import app from './app';

let server: Server;

process.on('uncaughtException', err => {
	console.log(err);
	process.exit(1);
});

async function main() {
	try {
		mongoose.connect(config.db_url as string);
		console.log('Database connected.');

		server = app.listen(config.port, () => {
			console.log(`API listening on port ${config.port}`);
		});
	} catch (err) {
		console.log('Failed to connect to database', err);
	}

	process.on('unhandledRejection', err => {
		if (server) {
			console.log(err);
			process.exit(1);
		} else {
			process.exit(1);
		}
	});
}

main();

process.on('SIGTERM', () => {
	console.log('Sigterm recieved');
	if (server) {
		server.close();
	}
});
