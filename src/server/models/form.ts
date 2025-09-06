import { Model } from 'miragejs';
import type { ModelDefinition } from 'miragejs/-types';

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

export interface ConditionalRule {
  dependsOn: string;
  showWhen: boolean;
}

export interface ConditionalLogic {
  operator?: 'AND' | 'OR';
  rules: ConditionalRule[];
}

export const formModel: ModelDefinition<FormData> = Model.extend({});
