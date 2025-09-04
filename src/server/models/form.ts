import { Model } from 'miragejs';
import { type ModelDefinition } from 'miragejs/-types';

export interface FormData {
  id: string;
  name: string;
  elements: ElementData[];
  createdAt: string;
  updatedAt: string;
}

export interface ElementData {
  id: string;
  type: 'text' | 'checkbox';
  label: string;
  isRequired: boolean;
  conditionalLogic?: ConditionalLogic;
}

export interface ConditionalLogic {
  dependsOn: string;
  showWhen: boolean;
}

export const formModel: ModelDefinition<FormData> = Model.extend({});
