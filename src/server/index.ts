import { createServer } from 'miragejs';
import { formModel } from '@/server/models';
import { formFactory } from '@/server/factories';
import { formRoutes } from '@/server/routes';
import { formFixtures } from '@/server/fixtures';

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
      try {
        const storedFormsData = localStorage.getItem('form-builder-forms');

        if (storedFormsData) {
          const storedForms = JSON.parse(storedFormsData);
          if (Array.isArray(storedForms) && storedForms.length > 0) {
            storedForms.forEach(form => {
              server.create('form', form);
            });
            return;
          }
        }

        formFixtures.forEach(form => {
          server.create('form', form);
        });
      } catch (error) {
        if (environment === 'development') {
          console.warn('Failed to load stored forms, using fixtures:', error);
        }

        formFixtures.forEach(form => {
          server.create('form', form);
        });
      }
    },
  });

  return server;
}
