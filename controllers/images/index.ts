import * as Boom from '@hapi/boom';
import ImageRepository from '../../models/database/repository/Image';
import {
  CreateImageRequest,
  FindImageRequest,
  UpdateImageRequest,
  SoftDeleteImageRequest
} from './interfaces';

export default {
  createImage: async (request: CreateImageRequest) => {
    try {
      return await ImageRepository.create(request.payload);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },

  findImage: async (request: FindImageRequest) => {
    try {
      return ImageRepository.find(request.query);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },

  changeImage: async (request: UpdateImageRequest) => {
    try {
      return await ImageRepository.update(request.payload);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },

  softDeleteImage: async (request: SoftDeleteImageRequest) => {
    try {
      return ImageRepository.softDelete(request.params);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },
};
