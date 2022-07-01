import * as Hapi from '@hapi/hapi';
import * as options from './options';
import controllers from '../../controllers/categories';

const routes: Hapi.ServerRoute[] = [
    {
        method: 'PUT',
        path: '/categories',
        handler: controllers.changeCategory,
        options: options.updateCategory,
    },
    {
        method: 'GET',
        path: '/categories',
        handler: controllers.findCategory,
        options: options.findCategory,
    },
    {
        method: 'POST',
        path: '/categories',
        handler: controllers.createCategory,
        options: options.createCategory,
    },
    {
        method: 'DELETE',
        path: '/categories/{id}',
        handler: controllers.softDeleteCategory,
        options: options.softDeleteCategory,
    },
];

export default routes;