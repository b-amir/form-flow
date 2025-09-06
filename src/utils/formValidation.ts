import * as yup from 'yup';
import type { Form } from '@/types/form';

type ValidationSchema = Record<string, yup.AnySchema>;

export function createValidationSchema(
  form: Form
): yup.ObjectSchema<Record<string, unknown>> {
  const schemaFields = form.elements.reduce<ValidationSchema>(
    (acc, element) => {
      let fieldSchema: yup.AnySchema;

      switch (element.type) {
        case 'text':
          fieldSchema = yup.string();

          if (element.validation) {
            const validation = element.validation as {
              minLength?: number;
              maxLength?: number;
            };

            if (validation.minLength) {
              fieldSchema = (fieldSchema as yup.StringSchema).min(
                validation.minLength,
                `${element.label} must be at least ${validation.minLength} characters`
              );
            }

            if (validation.maxLength) {
              fieldSchema = (fieldSchema as yup.StringSchema).max(
                validation.maxLength,
                `${element.label} must be at most ${validation.maxLength} characters`
              );
            }
          }
          break;

        case 'checkbox':
          fieldSchema = yup.boolean();
          break;

        default:
          fieldSchema = yup.mixed();
          break;
      }

      if (element.isRequired) {
        fieldSchema = fieldSchema.required(`${element.label} is required`);
      }

      acc[element.id] = fieldSchema;
      return acc;
    },
    {}
  );

  return yup.object().shape(schemaFields);
}

export function createDefaultValues(form: Form): Record<string, unknown> {
  return form.elements.reduce(
    (acc, element) => ({
      ...acc,
      [element.id]: element.type === 'checkbox' ? false : '',
    }),
    {}
  );
}
