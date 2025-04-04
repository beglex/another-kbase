import {z} from 'zod';
import 'dotenv/config';

import {dataSources, dataSourcesSchema} from './datasources';

const schema = z.object({
    host: z.string().ip().or(z.literal('localhost')),
    port: z.number().int(),

    session: z.object({
        secret: z.string(),
        lifetime: z.number().int(),
    }),

    dataSources: dataSourcesSchema,
});

export const config = schema.parse({
    host: process.env.HOST || 'localhost',
    port: Number(process.env.PORT || 3000),

    session: {
        secret: process.env.SESSION_SECRET || '',
        lifetime: Number(process.env.SESSION_LIFETIME || 1800),
    },

    dataSources,
});
