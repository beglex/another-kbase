import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {config} from '@root/configuration';
import * as controllers from '@root/controllers';
import * as entities from '@root/entities';
import * as guards from '@root/guards';
import {AuthenticationMiddleware} from '@root/middleware';
import * as services from '@root/services';

const {dataSources: {postgres}} = config;

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: postgres.host,
            port: postgres.port,
            username: postgres.user,
            password: postgres.password,
            database: postgres.database,
            logging: true,
            synchronize: true,
            entities: Object.values(entities),
        }),
        TypeOrmModule.forFeature(Object.values(entities)),
    ],
    controllers: Object.values(controllers),
    providers: [...Object.values(services), ...Object.values(guards)],
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthenticationMiddleware)
            .forRoutes(
                controllers.ArticleController,
            );
    }
}
