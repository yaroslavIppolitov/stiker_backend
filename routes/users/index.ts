import controllers from '../../controllers/users';
import * as Hapi from '@hapi/hapi';
import * as options from '../users/options';

const routes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/users',
    handler: controllers.createUser,
    options: options.create,
  },
  {
    method: 'GET',
    path: '/users',
    handler: controllers.findUser,
    options: options.find,
  },
  {
    method: 'PUT',
    path: '/users',
    handler: controllers.updateUser,
    options: options.update,
  },
  {
    method: 'DELETE',
    path: '/users',
    handler: controllers.softDeleteUser,
    options: options.softDelete,
  },
  {
    method: 'POST',
    path: '/users/login',
    handler: controllers.loginUser,
    options: options.login,
  },
];

export default routes;
