import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const softDelete: RouteOptions = {
  description: 'Удалить пользователя',
  notes: 'Маршрут удаления пользователя',
  tags: ['api', 'user'],
  auth: {
    strategy: 'userauth',
    scope: ['admin']
  },
  validate: {
    payload: Joi.object({
      id: Joi.number().example(1).description('id пользователя'),
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
