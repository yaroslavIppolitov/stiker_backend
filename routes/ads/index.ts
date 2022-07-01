import controllers from '../../controllers/ads';
import * as Hapi from '@hapi/hapi';
import * as options from '../ads/options';

const routes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/ads',
    handler: controllers.create,
    options: options.create,
  },

  {
    method: 'GET',
    path: '/ads',
    handler: controllers.find,
    options: options.find,
  },

  {
    method: 'PUT',
    path: '/ads',
    handler: controllers.update,
    options: options.update,
  },

  {
    method: 'DELETE',
    path: '/ads/{id}',
    handler: controllers.softDelete,
    options: options.softDelete,
  },
];

export default routes;
