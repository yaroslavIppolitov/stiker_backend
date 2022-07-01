import dataSourse from '../../../../ormconfig';
import Image from '../../entity/Image';
import {
  IIMageCreateParams,
  IIMageFindParams,
  IIMageUpdateParams,
  IIMageSoftDeleteParams,
} from './interfaces';
import * as Boom from '@hapi/boom';

const ImageRepository = {
  create: async (params: IIMageCreateParams) => {
    const { title, link } = params;
    const imageRepo = dataSourse.getRepository(Image);
    const findImage = await imageRepo.findOne({
      where: { link: link },
    });
    if (findImage) {
      return Boom.badData(`Image with link ${link} already exists.`);
    }
    const image = await imageRepo.save({ title, link });

    if (!image) {
      return Boom.internal('Cant create image');
    }

    const response = await imageRepo.findOne({
      where: { id: image.id },
    });
    return response;
  },

  find: async (params: IIMageFindParams) => {
    const { offset, limit, id, title, link } = params;

    const conditions = dataSourse
      .createQueryBuilder()
      .select(['image.id', 'image.title', 'image.link'])
      .from(Image, 'image')
      .offset(offset)
      .limit(limit);

    conditions.where('true');
    if (id) {
      conditions.andWhere('image.id = :id', { id: id });
    }

    if (title) {
      conditions.andWhere('image.title ILIKE :title', {
        title: `%${title}%`,
      });
    }

    if (link) {
      conditions.andWhere('image.link = :link', { link: link });
    }
    console.log(conditions.getQueryAndParameters());
    const response = await conditions.getMany();

    return response;
  },

  update: async (params: IIMageUpdateParams) => {

    const { id, title, link } = params;
    const imageRepo = dataSourse.getRepository(Image);

    const findImage = await imageRepo.findOne({
      where: { id }
    });

    if (!findImage) {
      return Boom.badData(`Image with id=${id} not found`);
    }

    const image = await imageRepo.save({
      id,
      title,
      link
    });

    if (!image) {
      return Boom.internal('Cant update image.');
    }

    const response = await imageRepo.findOne({
      where: { id: image.id },
    });

    return response;
  },


  softDelete: async (params: IIMageSoftDeleteParams) => {
    const { id } = params;
    const ImageRepo = dataSourse.getRepository(Image);

    const findImage = await ImageRepo.findOne({
      where: { id: id },
    });

    if (!findImage) {
      return Boom.badData(`Image with id=${id} not found`);
    }
    const response = await ImageRepo.softRemove(findImage);

    return response;
  },
};

export default ImageRepository;
