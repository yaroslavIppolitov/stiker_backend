import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';
import routes from './routes';
import dataSource from './ormconfig';
import * as HapiNowAuth from '@now-ims/hapi-now-auth';
import controllers from './controllers/users';

(async () => {
  try {
    const server = Hapi.server({
      port: 8888,
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });

    // add plugins
    await server.register([Inert, Vision, HapiNowAuth]);
    await server.register({
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'API Documentation',
          description: 'API Documentation',
        },
        jsonPath: '/documentation.json',
        documentationPath: '/documentation',
        schemes: ['http', 'https'],
        debug: true,
        securityDefinitions: {
          Bearer: {
            type: 'apiKey',
          },
        },
      },
    });

    //auth
    server.auth.strategy('userauth', 'hapi-now-auth', {
      validate: async (request, token, h) => {
        const scopes: string[] = [];
        try {
          const session = await controllers.getSession(token);
          if (session?.user.godMode) {
            scopes.push('admin');
          }
          return {
            isValid: true,
            credentials: {
              session,
              scope: scopes
            }
          };
        }
        catch (error) {
          return {
            isValid: false,
            credentials: {}
          };
        }
      }
    });

    // для отладки
    // server.auth.strategy('userauth', 'hapi-now-auth', {
    //   validate: async (request, token, h) => {
    //     const scopes: string[] = [];
    //     scopes.push('admin');

    //     return {
    //       isValid: true,
    //       credentials: {
    //         scope: scopes
    //       }
    //     };
    //   }});

    // default auth
    server.auth.default('userauth');

    // routes
    server.route(routes);

    // start
    await server.start();

    console.log(
      'Server running on %s://%s:%s',
      server.info.protocol,
      server.info.address,
      server.info.port
    );

    console.log(
      'Documentation running on %s://%s:%s/documentation',
      server.info.protocol,
      server.info.address,
      server.info.port
    );

    // data sourse
    await dataSource.initialize();
    await dataSource.runMigrations();
  } catch (error) {
    console.log(error);
  }
})();
