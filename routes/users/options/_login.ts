import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

export const login: RouteOptions = {
  description: 'Авторизация пользователя',
  notes: 'Маршрут авторизации пользователя',
  tags: ['api', 'user'],
  auth: false,
  validate: {
    payload: Joi.object({
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
