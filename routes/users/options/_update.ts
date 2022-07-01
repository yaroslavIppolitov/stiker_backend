import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const update: RouteOptions = {
  description: 'Обновить пользователя',
  notes: 'Маршрут обновления пользователя',
  tags: ['api', 'user'],
  auth: false,
  validate: {
    payload: Joi.object({
      id: Joi.number().example(1).description('id пользователя').required(),
      firstName: Joi.string().example('Иван').description('имя пользователя'),
      lastName: Joi.string().example('Иванов').description('фамилия пользователя'),
      email: Joi.string().example('example@post.abc').description('email пользователя'),
      password: Joi.string().example('Qwerty132').description('пароль пользователя'),
      godMode: Joi.boolean().example(false).description('режим администратора'),
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
