import { render, screen, fireEvent } from '@testing-library/react';
import { ConditionalLogicBuilder } from '../ConditionalLogicBuilder';
import type { ApiElement } from '@/types/api';

const mockTextElement: ApiElement = {
  id: 'text1',
  type: 'text',
  label: 'Text Field',
};

const mockCheckboxElement: ApiElement = {
  id: 'checkbox1',
  type: 'checkbox',
  label: 'Checkbox Field',
};

const mockAllElements: ApiElement[] = [
  mockTextElement,
  mockCheckboxElement,
  {
    id: 'checkbox2',
    type: 'checkbox',
    label: 'Another Checkbox',
  },
];

const mockOnUpdateConditionalLogic = vi.fn();

describe('ConditionalLogicBuilder', () => {
  beforeEach(() => {
    mockOnUpdateConditionalLogic.mockClear();
  });

  it('should display message when no checkboxes are available', () => {
    const elementsWithoutCheckboxes = [
      {
        id: 'text1',
        type: 'text' as const,
        label: 'Text Field',
      },
    ];

    render(
      <ConditionalLogicBuilder
        element={mockTextElement}
        allElements={elementsWithoutCheckboxes}
        onUpdateConditionalLogic={mockOnUpdateConditionalLogic}
      />
    );

    expect(
      screen.getByText('Add checkbox fields to enable conditional logic')
    ).toBeInTheDocument();
  });

  it('should render toggle switch', () => {
    render(
      <ConditionalLogicBuilder
        element={mockTextElement}
        allElements={mockAllElements}
        onUpdateConditionalLogic={mockOnUpdateConditionalLogic}
      />
    );

    expect(
      screen.getByLabelText('Enable conditional logic')
    ).toBeInTheDocument();
  });

  it('should enable conditional logic when toggle is clicked', () => {
    render(
      <ConditionalLogicBuilder
        element={mockTextElement}
        allElements={mockAllElements}
        onUpdateConditionalLogic={mockOnUpdateConditionalLogic}
      />
    );

    const toggle = screen.getByLabelText('Enable conditional logic');
    fireEvent.click(toggle);

    expect(mockOnUpdateConditionalLogic).toHaveBeenCalledWith({
      dependsOn: 'checkbox1',
      showWhen: true,
    });
  });

  it('should disable conditional logic when toggle is clicked off', () => {
    const elementWithConditionalLogic: ApiElement = {
      ...mockTextElement,
      conditionalLogic: {
        dependsOn: 'checkbox1',
        showWhen: true,
      },
    };

    render(
      <ConditionalLogicBuilder
        element={elementWithConditionalLogic}
        allElements={mockAllElements}
        onUpdateConditionalLogic={mockOnUpdateConditionalLogic}
      />
    );

    const toggle = screen.getByLabelText('Enable conditional logic');
    fireEvent.click(toggle);

    expect(mockOnUpdateConditionalLogic).toHaveBeenCalledWith(undefined);
  });

  it('should render conditional logic controls when enabled', () => {
    const elementWithConditionalLogic: ApiElement = {
      ...mockTextElement,
      conditionalLogic: {
        dependsOn: 'checkbox1',
        showWhen: true,
      },
    };

    render(
      <ConditionalLogicBuilder
        element={elementWithConditionalLogic}
        allElements={mockAllElements}
        onUpdateConditionalLogic={mockOnUpdateConditionalLogic}
      />
    );

    expect(screen.getByText('Conditional Logic')).toBeInTheDocument();
    expect(screen.getByLabelText('Enable conditional logic')).toBeChecked();
  });
});
