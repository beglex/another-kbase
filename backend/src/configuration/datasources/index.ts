import {z} from 'zod';

import {postgres, postgresSchema} from './postgres';

export const dataSourcesSchema = z.object({
    postgres: postgresSchema,
});

export const dataSources = {
    postgres,
} as const;
