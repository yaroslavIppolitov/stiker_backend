import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const find: RouteOptions = {
  description: 'Получить пользователей',
  notes: 'Маршрут получения пользователей',
  tags: ['api', 'user'],
  auth: {
    strategy: 'userauth',
  },
  validate: {
    query: Joi.object({
      id: Joi.number().example(1).description('id пользователя'),
      firstName: Joi.string().description('имя пользователя'),
      lastName: Joi.string().description('фамилия пользователя'),
      offset: Joi.number().description('смещение').default(0),
      limit: Joi.number().description('количество').default(10),
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
