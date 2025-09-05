import { type Form, type Element } from './form';

export interface ConditionalLogic {
  dependsOn: string;
  showWhen: boolean;
}

export interface ApiElement extends Element {
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
