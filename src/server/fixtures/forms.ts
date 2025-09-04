import { type FormData } from '../models';

export const formFixtures: Partial<FormData>[] = [
  {
    name: 'Contact Form',
    elements: [
      {
        id: '1',
        type: 'text',
        label: 'Full Name',
        isRequired: true,
      },
      {
        id: '2',
        type: 'text',
        label: 'Email',
        isRequired: true,
      },
      {
        id: '3',
        type: 'checkbox',
        label: 'I want to receive updates',
        isRequired: false,
      },
      {
        id: '4',
        type: 'text',
        label: 'Phone Number',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '3',
          showWhen: true,
        },
      },
    ],
  },
  {
    name: 'Registration Form',
    elements: [
      {
        id: '1',
        type: 'text',
        label: 'Username',
        isRequired: true,
      },
      {
        id: '2',
        type: 'text',
        label: 'Password',
        isRequired: true,
      },
      {
        id: '3',
        type: 'checkbox',
        label: 'I agree to terms',
        isRequired: true,
      },
    ],
  },
];
