import { type Form, type BaseElement } from './form';

export interface ConditionalRule {
  dependsOn: string;
  showWhen: boolean;
}

export interface ConditionalLogic {
  operator?: 'AND' | 'OR';
  rules: ConditionalRule[];
}

export interface ApiElement extends BaseElement {
  conditionalLogic?: ConditionalLogic;
}

export interface ApiForm extends Form {
  elements: ApiElement[];
  createdAt: string;
  updatedAt: string;
}

export type FormListResponse = ApiForm[];

export type SingleFormResponse = ApiForm;

export interface CreateFormRequest {
  name: string;
  elements: ApiElement[];
}

export interface UpdateFormRequest {
  name?: string;
  elements?: ApiElement[];
}
export interface ApiError {
  error: string;
}
