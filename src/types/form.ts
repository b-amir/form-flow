export interface Element {
  id: string;
  type: 'text' | 'checkbox';
  label: string;
  isRequired?: boolean;
}

export interface Form {
  id: string;
  name: string;
  elements: Element[];
}
