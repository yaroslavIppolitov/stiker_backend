import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const createCategory: RouteOptions = {
    description: 'Создать новую категорию',
    notes: 'Маршрут создания категории',
    tags: ['api', 'category'],
    auth: {
        strategy: 'userauth',
    },
    validate: {
        payload: Joi.object({
            title: Joi.string().max(128).required().example('Одежда').description('заголовок'),
        })
    },

    plugins: {
        'hapi-swagger': {
            '200': {
                description: 'OK',
            },
        },
    },
};
