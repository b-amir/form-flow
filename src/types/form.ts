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

export type ConditionOperator = 'equals' | 'not_equals';

export interface Condition {
  fieldId: string;
  operator: ConditionOperator;
  value: boolean;
}

export interface ConditionalLogic {
  conditions: Condition[];
  action: 'show' | 'hide';
}

export interface BaseElementWithConditions extends BaseElement {
  conditionalLogic?: ConditionalLogic;
}

export interface TextElementWithConditions extends BaseElementWithConditions {
  type: 'text';
}

export interface CheckboxElementWithConditions
  extends BaseElementWithConditions {
  type: 'checkbox';
}

export type ElementWithConditions =
  | TextElementWithConditions
  | CheckboxElementWithConditions;

export interface Form {
  id: string;
  name: string;
  elements: Element[];
}
