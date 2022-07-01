import dataSourse from '../../../../ormconfig';
import User from '../../entity/User';
import { IUserCreateParams, IUserFindParams, IUserUpdateParams, IUserSoftDeleteParams, IUserLoginParams } from './interfaces';
// import { v4 as uuidv4 } from 'uuid';
import { Md5 } from 'ts-md5/dist/md5';
import * as Boom from '@hapi/boom';
import Session from '../../entity/Session';


const UserRepository = {
  create: async (params: IUserCreateParams) => {
    const { firstName, lastName, email, password } = params;
    const userRepo = dataSourse.getRepository(User);

    const findUser = await userRepo.findOne({
      where: { email: email },
    });

    if (findUser) {
      return Boom.badData(`Пользователь с таким email уже существует`);
    }
    const md5pass = Md5.hashStr(password);
    const user = await userRepo.save({
      firstName,
      lastName,
      email,
      password: md5pass
    });

    const response = await userRepo.findOne({
      where: { id: user.id }
    });

    if (!response) {
      return Boom.internal('Cant create User');
    }

    return response;
  },

  find: async (params: IUserFindParams) => {
    const { offset, limit, firstName, lastName } = params;

    const conditions = dataSourse
      .createQueryBuilder(User, 'user')
      .skip(offset)
      .take(limit);
    conditions.where('true');
    if (firstName) {
      conditions.andWhere('user.firstName ILIKE :firstName', {
        firstName: `%${firstName}%`,
      });
    }
    if (lastName) {
      conditions.andWhere('user.lastName ILIKE :lastName', {
        lastName: `%${lastName}%`,
      });
    }
    return await conditions.getMany();
  },
  update: async (params: IUserUpdateParams) => {
    const { id, firstName, lastName, email, password, godMode } = params;
    const userRepo = dataSourse.getRepository(User);

    const findUser = await userRepo.findOne({
      where: { id }
    });
    if (!findUser) {
      return Boom.badData(`User with id=${id} not found`);
    }

    const { password: oldMd5Pass } = findUser;
    let userFields;
    if (password) {
      const newmd5pass = Md5.hashStr(password);
      if (newmd5pass === oldMd5Pass) {
        userFields = {
          id,
          firstName,
          lastName,
          email
        };
      }
      else {
        userFields = {
          id,
          firstName,
          lastName,
          email,
          password: newmd5pass
        };
      }

    }
    else {
      userFields = {
        id,
        firstName,
        lastName,
        email
      };
    };
    const user = await userRepo.save(userFields);

    if (!user) {
      return Boom.internal('Cant update user.');
    }

    const response = await userRepo.findOne({
      where: { id: user.id },
    });

    return response;
  },

  softDelete: async (params: IUserSoftDeleteParams) => {
    const { id } = params;
    const userRepo = dataSourse.getRepository(User);

    const findUser = await userRepo.findOne({
      where: { id: id },
    });

    if (!findUser) {
      return Boom.badData(`User with id=${id} not found`);
    }

    const response = await userRepo.softRemove(findUser);

    return response;
  },

  login: async (params: IUserLoginParams) => {
    const { email, password } = params;
    const userRepo = dataSourse.getRepository(User);

    const conditions = dataSourse.createQueryBuilder(User, 'user').where('user.email = :email', { email: email, });
    const findUserWithEmail = await conditions.getMany();

    if (!findUserWithEmail) {
      return Boom.badData(`Пользователем с указанным email не существует`);
    }

    const md5pass = Md5.hashStr(password);
    const findUserWithEmailAndPass = await userRepo.findOne({
      where: { email: email, password: md5pass },
    });

    if (!findUserWithEmailAndPass) {
      return Boom.badData(`Некорректный пароль`);
    }

    const sessionRepo = dataSourse.getRepository(Session);

    const session = await sessionRepo.save({
      user: findUserWithEmailAndPass
    });

    if (!session) {
      return Boom.badData(`При авторизации произошла ошибка.`);
    }

    return session;
  },

  getSession: async (token: string) => {
    console.log('token-->', token);
    const sessionRepo = dataSourse.getRepository(Session);
    const session = await sessionRepo.findOne({
      where: { token: token },
      relations: ['user'],
    });

    if (!session) {
      throw new Error(`При авторизации произошла ошибка.`);
    }
    return session;
  },
};

export default UserRepository;
