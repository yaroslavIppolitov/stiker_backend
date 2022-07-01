import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const updateImage: RouteOptions = {
    description: 'Обновить картинку',
    notes: 'Маршрут обновления картинки',
    tags: ['api', 'image'],
    auth: {
        strategy: 'userauth',
        scope: ['admin']
    },
    validate: {
        payload: Joi.object({
            id: Joi.number().example(1).description('id картинки').required(),
            title: Joi.string().max(128).required().example('Картинка моря').description('заголовок картинки'),
            link: Joi.string().max(264).example('www.example.com/img1.png'),
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
