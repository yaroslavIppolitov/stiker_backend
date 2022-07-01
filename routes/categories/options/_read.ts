import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const findCategory: RouteOptions = {
    description: 'Получить категории',
    tags: ['api', 'category'],
    auth: false,
    validate: {
        query: Joi.object({
            id: Joi.number().example(1).description('id категории'),
            title: Joi.string().max(128).example('Одежда'),
            offset: Joi.number().description('offset').default(0),
            limit: Joi.number().description('limit').default(10),
        }),

    },
    plugins: {
        'hapi-swagger': {
            '200': {
                description: 'OK',
            },
        },
    },
};
