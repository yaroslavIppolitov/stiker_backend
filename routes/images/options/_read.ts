import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const findImage: RouteOptions = {
    description: 'Получить картинки',
    tags: ['api', 'image'],
    auth: false,
    validate: {
        query: Joi.object({
            id: Joi.number().example(1).description('id картинки'),
            title: Joi.string().max(128).example('Картинка моря'),
            link: Joi.string().max(264).example('www.example.com/img1.png'),
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
