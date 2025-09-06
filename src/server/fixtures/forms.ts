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
        label: 'Email Address',
        isRequired: true,
      },
      {
        id: '3',
        type: 'checkbox',
        label: 'I want to receive marketing updates',
        isRequired: false,
      },
      {
        id: '4',
        type: 'checkbox',
        label: 'I prefer phone contact',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '3',
          showWhen: true,
        },
      },
      {
        id: '5',
        type: 'text',
        label: 'Phone Number',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '4',
          showWhen: true,
        },
      },
      {
        id: '6',
        type: 'text',
        label: 'Best time to call',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '5',
          showWhen: true,
        },
      },
      {
        id: '7',
        type: 'checkbox',
        label: 'I prefer email contact',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '3',
          showWhen: true,
        },
      },
      {
        id: '8',
        type: 'text',
        label: 'Alternate Email',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '7',
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
        type: 'text',
        label: 'Confirm Password',
        isRequired: true,
      },
      {
        id: '4',
        type: 'checkbox',
        label: 'I am a business user',
        isRequired: false,
      },
      {
        id: '5',
        type: 'text',
        label: 'Company Name',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '4',
          showWhen: true,
        },
      },
      {
        id: '6',
        type: 'text',
        label: 'Business Email',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '4',
          showWhen: true,
        },
      },
      {
        id: '7',
        type: 'checkbox',
        label: 'I need multi-user access',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '4',
          showWhen: true,
        },
      },
      {
        id: '8',
        type: 'text',
        label: 'Number of users needed',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '7',
          showWhen: true,
        },
      },
      {
        id: '9',
        type: 'checkbox',
        label: 'I agree to terms and conditions',
        isRequired: true,
      },
    ],
  },
  {
    name: 'Event Registration Survey',
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
        label: 'Email Address',
        isRequired: true,
      },
      {
        id: '3',
        type: 'checkbox',
        label: 'I will attend in person',
        isRequired: false,
      },
      {
        id: '4',
        type: 'checkbox',
        label: 'I need accommodation',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '3',
          showWhen: true,
        },
      },
      {
        id: '5',
        type: 'text',
        label: 'Check-in date',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '4',
          showWhen: true,
        },
      },
      {
        id: '6',
        type: 'text',
        label: 'Check-out date',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '4',
          showWhen: true,
        },
      },
      {
        id: '7',
        type: 'checkbox',
        label: 'I will attend virtually',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '3',
          showWhen: false,
        },
      },
      {
        id: '8',
        type: 'text',
        label: 'Preferred video platform',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '7',
          showWhen: true,
        },
      },
      {
        id: '9',
        type: 'checkbox',
        label: 'I have dietary restrictions',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '3',
          showWhen: true,
        },
      },
      {
        id: '10',
        type: 'text',
        label: 'Please specify dietary needs',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '9',
          showWhen: true,
        },
      },
      {
        id: '11',
        type: 'checkbox',
        label: 'I will bring a guest',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '3',
          showWhen: true,
        },
      },
      {
        id: '12',
        type: 'text',
        label: 'Guest name',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '11',
          showWhen: true,
        },
      },
    ],
  },
  {
    name: 'Product Feedback Survey',
    elements: [
      {
        id: '1',
        type: 'text',
        label: 'Your Name',
        isRequired: true,
      },
      {
        id: '2',
        type: 'text',
        label: 'Email Address',
        isRequired: true,
      },
      {
        id: '3',
        type: 'checkbox',
        label: 'Have you used our product before?',
        isRequired: true,
      },
      {
        id: '4',
        type: 'checkbox',
        label: 'Did you purchase the product directly from us?',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '3',
          showWhen: true,
        },
      },
      {
        id: '5',
        type: 'text',
        label: 'Order Number',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '4',
          showWhen: true,
        },
      },
      {
        id: '6',
        type: 'text',
        label: 'Where did you purchase the product?',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '4',
          showWhen: false,
        },
      },
      {
        id: '7',
        type: 'checkbox',
        label: 'Are you satisfied with the product quality?',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '3',
          showWhen: true,
        },
      },
      {
        id: '8',
        type: 'text',
        label: 'What aspects did you like most?',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '7',
          showWhen: true,
        },
      },
      {
        id: '9',
        type: 'text',
        label: 'What issues did you encounter?',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '7',
          showWhen: false,
        },
      },
      {
        id: '10',
        type: 'checkbox',
        label: 'Would you recommend our product to others?',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '3',
          showWhen: true,
        },
      },
      {
        id: '11',
        type: 'text',
        label: 'Why would you recommend our product?',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '10',
          showWhen: true,
        },
      },
      {
        id: '12',
        type: 'text',
        label: 'Why would you not recommend our product?',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '10',
          showWhen: false,
        },
      },
      {
        id: '13',
        type: 'checkbox',
        label: 'Are you interested in our upcoming products?',
        isRequired: false,
      },
      {
        id: '14',
        type: 'text',
        label: 'Which product categories interest you most?',
        isRequired: false,
        conditionalLogic: {
          dependsOn: '13',
          showWhen: true,
        },
      },
    ],
  },
];
