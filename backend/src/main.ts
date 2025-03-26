import type {NestExpressApplication} from '@nestjs/platform-express';

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {ApplicationModule} from '@root/ApplicationModule';
import {config} from '@root/configuration';

const {host, port} = config;

async function bootstrap() {
    const logger = new Logger(bootstrap.name);
    const application = await NestFactory.create<NestExpressApplication>(ApplicationModule);

    application.listen(port, host, () => {
        logger.log(`Listening at http://${host}:${port}/`);
    });
}

bootstrap();
