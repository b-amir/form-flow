import { Response } from 'miragejs';
import type { Server, Request, Registry } from 'miragejs';
import type Schema from 'miragejs/orm/schema';
import { formModel } from '../models';
import { formFactory } from '../factories';
import type { Form } from '@/types/form';

const STORAGE_KEY = 'form-builder-forms';

const saveFormsToStorage = (forms: Form[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
  } catch (error) {
    console.error('Failed to save forms to localStorage:', error);
  }
};

const syncStorageWithSchema = (schema: Schema<AppRegistry>) => {
  const forms = schema.all('form').models.map(form => form.attrs);
  saveFormsToStorage(forms);
};

type Models = {
  form: typeof formModel;
};

type Factories = {
  form: typeof formFactory;
};

type AppRegistry = Registry<Models, Factories>;

export function formRoutes(this: Server<AppRegistry>) {
  this.get('/forms', (schema: Schema<AppRegistry>) => {
    try {
      const forms = schema.all('form');
      return forms;
    } catch {
      return new Response(500, {}, { error: 'Internal server error' });
    }
  });

  this.get('/forms/:id', (schema: Schema<AppRegistry>, request: Request) => {
    const id = request.params.id;
    if (!id) {
      return new Response(400, {}, { error: 'ID is required' });
    }
    const form = schema.find('form', id);

    if (!form) {
      return new Response(404, {}, { error: 'Form not found' });
    }

    return form;
  });

  this.post('/forms', (schema: Schema<AppRegistry>, request: Request) => {
    const attrs = JSON.parse(request.requestBody);

    if (!attrs.name || !attrs.elements) {
      return new Response(
        400,
        {},
        {
          error: 'Name and elements are required',
        }
      );
    }

    const form = schema.create('form', {
      ...attrs,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    syncStorageWithSchema(schema);

    return form;
  });

  this.put('/forms/:id', (schema: Schema<AppRegistry>, request: Request) => {
    const id = request.params.id;
    if (!id) {
      return new Response(400, {}, { error: 'ID is required' });
    }
    const attrs = JSON.parse(request.requestBody);
    const form = schema.find('form', id);

    if (!form) {
      return new Response(404, {}, { error: 'Form not found' });
    }

    form.update({
      ...attrs,
      updatedAt: new Date().toISOString(),
    });

    syncStorageWithSchema(schema);

    return form;
  });

  this.delete('/forms/:id', (schema: Schema<AppRegistry>, request: Request) => {
    const id = request.params.id;
    if (!id) {
      return new Response(400, {}, { error: 'ID is required' });
    }
    const form = schema.find('form', id);

    if (!form) {
      return new Response(404, {}, { error: 'Form not found' });
    }

    form.destroy();

    syncStorageWithSchema(schema);

    return new Response(204);
  });
}
