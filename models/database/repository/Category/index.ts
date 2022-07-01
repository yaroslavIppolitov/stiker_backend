import dataSourse from '../../../../ormconfig';
import Category from '../../entity/Category';
import {
  ICategoryCreateParams,
  ICategoryFindParams,
  ICategoryUpdateParams,
  ICategorySoftDeleteParams,
} from './interfaces';
import * as Boom from '@hapi/boom';

const CategoryRepository = {
  create: async (params: ICategoryCreateParams) => {
    const { title } = params;
    const categoryRepo = dataSourse.getRepository(Category);
    const findCategory = await categoryRepo.findOne({
      where: { title: title },
    });
    if (findCategory) {
      return Boom.badData(`Category ${title} already exists.`);
    }
    const category = await categoryRepo.save({ title });

    if (!category) {
      return Boom.internal('Cant create category');
    }

    const response = await categoryRepo.findOne({
      where: { id: category.id },
    });
    return response;
  },

  find: async (params: ICategoryFindParams) => {
    const { offset, limit, id, title } = params;

    const conditions = dataSourse
      .createQueryBuilder()
      .select(['category.id', 'category.title'])
      .from(Category, 'category')
      .offset(offset)
      .limit(limit);

    conditions.where('true');
    if (id) {
      conditions.andWhere('category.id = :id', { id: id });
    }

    if (title) {
      conditions.andWhere('category.title ILIKE :title', {
        title: `%${title}%`,
      });
    }
    const response = await conditions.getMany();

    return response;
  },

  update: async (params: ICategoryUpdateParams) => {

    const { id, title } = params;
    const categoryRepo = dataSourse.getRepository(Category);

    const findCategory = await categoryRepo.findOne({
      where: { id }
    });

    if (!findCategory) {
      return Boom.badData(`Category with id=${id} not found`);
    }

    const category = await categoryRepo.save({
      id,
      title
    });

    if (!category) {
      return Boom.internal('Cant update category.');
    }

    const response = await categoryRepo.findOne({
      where: { id: category.id },
    });

    return response;
  },


  softDelete: async (params: ICategorySoftDeleteParams) => {
    const { id } = params;
    const categoryRepo = dataSourse.getRepository(Category);

    const findCategory = await categoryRepo.findOne({
      where: { id: id },
    });

    if (!findCategory) {
      return Boom.badData(`Category with id=${id} not found`);
    }

    const response = await categoryRepo.softRemove(findCategory);

    return response;
  },
};

export default CategoryRepository;
