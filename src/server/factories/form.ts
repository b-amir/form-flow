import { Factory } from 'miragejs';
import { type FormData } from '../models';

export const formFactory = Factory.extend<FormData>({
  id() {
    return String(Math.floor(Math.random() * 10000));
  },

  name() {
    return `Sample Form ${Math.floor(Math.random() * 1000)}`;
  },

  elements() {
    return [
      {
        id: '1',
        type: 'text' as const,
        label: 'Full Name',
        isRequired: true,
      },
      {
        id: '2',
        type: 'checkbox' as const,
        label: 'Subscribe to newsletter',
        isRequired: false,
      },
      {
        id: '3',
        type: 'text' as const,
        label: 'Email Address',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '2',
          showWhen: true,
        },
      },
    ];
  },

  createdAt() {
    return new Date().toISOString();
  },

  updatedAt() {
    return new Date().toISOString();
  },
});
