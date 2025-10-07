import { Server } from "http";
import app from "./app";
import prisma from "./client";
import { env } from "./config";


let server: Server

prisma.$connect().then(() => {
    console.log('Connected to SQL Database');
    server = app.listen(env.PORT, () => {
        console.info(`Listening to port ${env.PORT}`);
    });
});


const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    console.info('SIGTERM received');
    if (server) {
        server.close();
    }
});

