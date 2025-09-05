export type ElementType = 'text' | 'checkbox';

export interface BaseElement {
  id: string;
  type: ElementType;
  label: string;
  isRequired?: boolean;
}

export interface TextElement extends BaseElement {
  type: 'text';
}

export interface CheckboxElement extends BaseElement {
  type: 'checkbox';
}

export type Element = TextElement | CheckboxElement;

export interface Form {
  id: string;
  name: string;
  elements: Element[];
}
