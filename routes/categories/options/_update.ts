import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const updateCategory: RouteOptions = {
    description: 'Обновить категории',
    notes: 'Маршрут обновления категории',
    tags: ['api', 'category'],
    auth: {
        strategy: 'userauth',
        scope: ['admin']
    },
    validate: {
        payload: Joi.object({
            id: Joi.number().example(1).description('id категории').required(),
            title: Joi.string().max(128).required().example('Одежда').description('заголовок категории'),
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
