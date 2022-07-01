import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const createImage: RouteOptions = {
    description: 'Создать новую картинку',
    notes: 'Маршрут создания картинки',
    tags: ['api', 'image'],
    auth: {
        strategy: 'userauth',
    },
    validate: {
        payload: Joi.object({
            title: Joi.string().max(128).required().example('Картинка моря').description('заголовок'),
            link: Joi.string().max(264).required().example('www.example.com/img1.png').description('ссылка на картинку'),
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
