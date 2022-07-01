import * as Hapi from '@hapi/hapi';
import * as options from './options';
import controllers from '../../controllers/images';

const routes: Hapi.ServerRoute[] = [
    {
        method: 'PUT',
        path: '/images',
        handler: controllers.changeImage,
        options: options.updateImage,
    },
    {
        method: 'GET',
        path: '/images',
        handler: controllers.findImage,
        options: options.findImage,
    },
    {
        method: 'POST',
        path: '/images',
        handler: controllers.createImage,
        options: options.createImage,
    },
    {
        method: 'DELETE',
        path: '/images/{id}',
        handler: controllers.softDeleteImage,
        options: options.softDeleteImage,
    },
];

export default routes;