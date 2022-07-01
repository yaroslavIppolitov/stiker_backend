import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const softDeleteImage: RouteOptions = {
    description: 'Удалить картинку',
    notes: 'Маршрут удаления картинки',
    tags: ['api', 'image'],
    auth: {
        strategy: 'userauth',
        scope: ['admin']
    },
    validate: {
        params: Joi.object({
            id: Joi.number().example(1).description('id картинки').required(),
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
