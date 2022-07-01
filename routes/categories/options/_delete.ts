import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const softDeleteCategory: RouteOptions = {
    description: 'Удалить категорию',
    notes: 'Маршрут удаления категории',
    tags: ['api', 'category'],
    auth: {
        strategy: 'userauth',
        scope: ['admin']
    },
    validate: {
        params: Joi.object({
            id: Joi.number().example(1).description('id категории').required(),
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
