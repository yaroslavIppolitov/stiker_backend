import { RouteOptions } from '@hapi/hapi';
import Joi from 'joi';

export const create: RouteOptions = {
  description: 'Создать новое объявление',
  notes: 'Маршрут создания нового объявления',
  tags: ['api', 'ad'],
  auth: {
    strategy: 'userauth',
  },
  validate: {
    payload: Joi.object({
      title: Joi.string().required().description('заголовок'),
      description: Joi.string().required().description('описание'),
      cost: Joi.string().required().description('стоимость'),
      phone: Joi.string().required().description('номер телефона'),
      address: Joi.string().required().description('адрес'),
      viewCount: Joi.number().description('количество просмотров'),
      isVisible: Joi.boolean().example(false).description('отображать объявление'),
      categoryIds: Joi.array()
        .items(Joi.number().required().example(1))
        .description('категории фильтров'),
      imageIds: Joi.array()
        .items(Joi.number().required().example(1))
        .description('картинки'),
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
