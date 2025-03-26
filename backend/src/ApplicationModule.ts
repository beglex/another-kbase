import {Module, NestModule} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {config} from '@root/configuration';

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
        }),
        TypeOrmModule.forFeature([]),
    ],
    controllers: [],
    providers: [],
})
export class ApplicationModule implements NestModule {
    configure() {
    }
}
