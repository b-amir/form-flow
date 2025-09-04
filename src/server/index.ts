import { createServer } from 'miragejs';
import { formModel } from './models';
import { formFactory } from './factories';
import { formRoutes } from './routes';
import { formFixtures } from './fixtures';

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      form: formModel,
    },

    factories: {
      form: formFactory,
    },

    routes() {
      this.namespace = 'api';
      this.timing = environment === 'development' ? 400 : 0;

      formRoutes.call(this);

      this.passthrough();
    },

    seeds(server) {
      if (environment === 'development') {
        formFixtures.forEach(formData => {
          server.create('form', formData);
        });
      }
    },
  });

  return server;
}
