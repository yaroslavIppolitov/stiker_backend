import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const create: RouteOptions = {
  description: 'Создать нового пользователя',
  notes: 'Маршрут создания нового пользователя',
  tags: ['api', 'user'],
  auth: false,
  validate: {
    payload: Joi.object({
      firstName: Joi.string().required().example('Иван').description('имя пользователя'),
      lastName: Joi.string().required().example('Иванов').description('фамилия пользователя'),
      email: Joi.string().required().example('example@post.abc').description('email пользователя'),
      password: Joi.string().required().example('Qwerty132').description('пароль пользователя'),
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
