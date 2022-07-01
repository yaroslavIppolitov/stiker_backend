import * as Boom from '@hapi/boom';
import dataSourse from '../../../../ormconfig';
import Ad from '../../entity/Ad';
import Category from '../../entity/Category';
import Image from '../../entity/Image';
import {
  IAdCreateParams,
  IAdFindParams,
  IAdSoftDeleteParams,
  IAdUpdateParams,
} from './interfaces';

const AdRepository = {
  create: async (params: IAdCreateParams) => {
    const { categoryIds, imageIds, title, description, cost, phone, address, viewCount, isVisible } = params;
    const adRepo = dataSourse.getRepository(Ad);
    const categoryRepo = dataSourse.getRepository(Category);
    const imageRepo = dataSourse.getRepository(Image);


    let categories: Category[] = [];
    if (categoryIds) {
      categories = await categoryRepo
        .createQueryBuilder('category')
        .where('category.id IN (:...ids)', { ids: categoryIds })
        .getMany();
    }
    if (!categories || categories.length === 0) {
      return Boom.badData(`Category not found`);
    }

    let images: Image[] = [];
    if (imageIds) {
      images = await imageRepo
        .createQueryBuilder('image')
        .where('image.id IN (:...ids)', { ids: imageIds })
        .getMany();
    }

    if (!images || images.length === 0) {
      return Boom.badData(`Image not found`);
    }
    let publicDate;
    if (isVisible === true) {
      publicDate = new Date();
    }

    const ad = await adRepo.save({ title, description, cost, phone, address, viewCount, publicDate, isVisible, categories, images });

    if (!ad) {
      return Boom.internal('Cant create ad');
    }
    const response = await adRepo.findOne({
      where: { id: ad.id },
    });

    return response;
  },

  find: async (params: IAdFindParams) => {
    const { description, title, categoryIds, limit, offset, ...otherFields } = params;
    const adRepo = dataSourse.getRepository(Ad);


    const conditions = adRepo.createQueryBuilder('ad').skip(offset).take(limit);
    conditions.where(`true`);//helper for future wheres

    if (title) {
      conditions.andWhere(`ad.title = :title`, { title });
    }

    if (description) {
      conditions.andWhere(`ad.description = :description`, { description });
    }

    if (categoryIds) {
      conditions.andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('ad.id')
          .from(Ad, 'ad')
          .leftJoin('ad.categories', 'category')
          .andWhere('category.id IN (:...categoryIds)', {
            categoryIds,
          })
          .groupBy('ad.id')
          .having('COUNT(ad.id) = :countCategories', {
            countCategories: categoryIds === undefined ? 0 : categoryIds.length,
          });

        return `ad.id IN ${subQuery.getQuery()}`;
      });
    }

    const [data, totalCount] = await Promise.all([
      conditions.getMany(),
      conditions.getCount(),
    ]);

    return { data, totalCount };
  },

  update: async (params: IAdUpdateParams) => {
    const { id, categoryIds, ...rest } = params;

    const adRepo = dataSourse.getRepository(Ad);
    const ad = await adRepo.findOne({ where: { id } });

    if (!ad) {
      return Boom.badData(`Объявление с id=${id} не найдено`);
    }

    const categoryRepo = dataSourse.getRepository(Category);

    if (categoryIds) {
      let categories: Category[] = [];

      if (categoryIds.length) {
        categories = await categoryRepo
          .createQueryBuilder('category')
          .where('category.id IN (:...categoryIds)', { categoryIds })
          .getMany();
      }

      adRepo.merge(ad, { categories });
    }

    adRepo.merge(ad, { ...rest });

    await adRepo.save(ad);

    const response = await adRepo.findOne({
      select: ['id', 'title', 'description', 'cost', 'phone', 'address'],
      relations: ['categories'],
      where: { id: ad.id },
    });

    if (!response) {
      return Boom.internal('Не удалось обновить объявление');
    }

    return response;
  },

  softDelete: async (params: IAdSoftDeleteParams) => {
    const { id } = params;

    const adRepo = dataSourse.getRepository(Ad);

    const conditions = adRepo
      .createQueryBuilder('ad')
      .select(['ad.id'])
      .where('ad.id = :id', { id });

    const foundAd = await conditions.getOne();

    if (!foundAd) {
      return Boom.badData(`Объявление с id=${id} не найдено`);
    }

    const response = await adRepo.softDelete(foundAd);

    return response;
  },
};

export default AdRepository;
