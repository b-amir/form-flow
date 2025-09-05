import * as yup from 'yup';
import { type Element } from './form';

export type TextFieldValidation = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
};

export type CheckboxFieldValidation = {
  required?: boolean;
};

export type FieldValidation = TextFieldValidation | CheckboxFieldValidation;

export type ValidationSchemaMap = {
  text: yup.StringSchema;
  checkbox: yup.BooleanSchema;
};

export type ValidationSchemaFor<T extends Element['type']> =
  ValidationSchemaMap[T];

export type FormValidationSchema = yup.ObjectSchema<
  Record<string, yup.AnySchema>
>;

export type ValidationError = {
  path: string;
  message: string;
};
