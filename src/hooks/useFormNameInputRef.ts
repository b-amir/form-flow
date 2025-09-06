import { createRef } from 'react';
import type { RefObject } from 'react';

const formNameInputRef = createRef<HTMLInputElement>();

export const useFormNameInputRef = (): RefObject<HTMLInputElement> => {
  return formNameInputRef as RefObject<HTMLInputElement>;
};
