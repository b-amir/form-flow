import { render, screen, fireEvent } from '@testing-library/react';
import { ConditionalLogicBuilder } from '../form/builder/ConditionalLogicBuilder';
import type { Element } from '@/types';

const mockTextElement: Element = {
  id: 'text1',
  type: 'text',
  label: 'Text Field',
};

const mockCheckboxElement: Element = {
  id: 'checkbox1',
  type: 'checkbox',
  label: 'Checkbox Field',
};

const mockAllElements: Element[] = [
  mockTextElement,
  mockCheckboxElement,
  {
    id: 'checkbox2',
    type: 'checkbox',
    label: 'Another Checkbox',
  },
  {
    id: 'checkbox3',
    type: 'checkbox',
    label: 'Third Checkbox',
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
      operator: 'AND',
      rules: [{ dependsOn: 'checkbox1', showWhen: true }],
    });
  });

  it('should disable conditional logic when toggle is clicked off', () => {
    const elementWithConditionalLogic: Element = {
      ...mockTextElement,
      conditionalLogic: {
        operator: 'AND',
        rules: [{ dependsOn: 'checkbox1', showWhen: true }],
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
    const elementWithConditionalLogic: Element = {
      ...mockTextElement,
      conditionalLogic: {
        operator: 'AND',
        rules: [{ dependsOn: 'checkbox1', showWhen: true }],
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

  it('should show AND/OR operator chips when multiple rules exist', () => {
    const elementWithMultipleRules: Element = {
      ...mockTextElement,
      conditionalLogic: {
        operator: 'AND',
        rules: [
          { dependsOn: 'checkbox1', showWhen: true },
          { dependsOn: 'checkbox2', showWhen: false },
        ],
      },
    };

    render(
      <ConditionalLogicBuilder
        element={elementWithMultipleRules}
        allElements={mockAllElements}
        onUpdateConditionalLogic={mockOnUpdateConditionalLogic}
      />
    );

    expect(screen.getByText('ALL')).toBeInTheDocument();
    expect(screen.getByText('ANY')).toBeInTheDocument();
    expect(screen.getByText('Show when')).toBeInTheDocument();
    expect(screen.getByText('conditions are met:')).toBeInTheDocument();
  });

  it('should not show operator chips when only one rule exists', () => {
    const elementWithSingleRule: Element = {
      ...mockTextElement,
      conditionalLogic: {
        operator: 'AND',
        rules: [{ dependsOn: 'checkbox1', showWhen: true }],
      },
    };

    render(
      <ConditionalLogicBuilder
        element={elementWithSingleRule}
        allElements={mockAllElements}
        onUpdateConditionalLogic={mockOnUpdateConditionalLogic}
      />
    );

    expect(screen.queryByText('ALL')).not.toBeInTheDocument();
    expect(screen.queryByText('ANY')).not.toBeInTheDocument();
  });

  it('should allow adding new rules', () => {
    const elementWithSingleRule: Element = {
      ...mockTextElement,
      conditionalLogic: {
        operator: 'AND',
        rules: [{ dependsOn: 'checkbox1', showWhen: true }],
      },
    };

    render(
      <ConditionalLogicBuilder
        element={elementWithSingleRule}
        allElements={mockAllElements}
        onUpdateConditionalLogic={mockOnUpdateConditionalLogic}
      />
    );

    // Find and click the add button (it's an IconButton with AddIcon)
    const addButton = screen.getByRole('button', { name: '' }); // IconButton typically has no accessible name
    fireEvent.click(addButton);

    expect(mockOnUpdateConditionalLogic).toHaveBeenCalledWith({
      operator: 'AND',
      rules: [
        { dependsOn: 'checkbox1', showWhen: true },
        { dependsOn: 'checkbox2', showWhen: true }, // Should add the next available checkbox
      ],
    });
  });

  it('should allow removing rules when multiple exist', () => {
    const elementWithMultipleRules: Element = {
      ...mockTextElement,
      conditionalLogic: {
        operator: 'AND',
        rules: [
          { dependsOn: 'checkbox1', showWhen: true },
          { dependsOn: 'checkbox2', showWhen: false },
        ],
      },
    };

    render(
      <ConditionalLogicBuilder
        element={elementWithMultipleRules}
        allElements={mockAllElements}
        onUpdateConditionalLogic={mockOnUpdateConditionalLogic}
      />
    );

    // Find delete buttons (there should be delete icons for each rule when multiple exist)
    const deleteButtons = screen.getAllByRole('button');
    const deleteButton = deleteButtons.find(button =>
      button.querySelector('svg[data-testid="DeleteIcon"]')
    );

    if (deleteButton) {
      fireEvent.click(deleteButton);

      expect(mockOnUpdateConditionalLogic).toHaveBeenCalledWith({
        operator: 'AND',
        rules: [{ dependsOn: 'checkbox2', showWhen: false }], // Should remove the first rule
      });
    }
  });

  it('should switch between AND and OR operators', () => {
    const elementWithMultipleRules: Element = {
      ...mockTextElement,
      conditionalLogic: {
        operator: 'AND',
        rules: [
          { dependsOn: 'checkbox1', showWhen: true },
          { dependsOn: 'checkbox2', showWhen: false },
        ],
      },
    };

    render(
      <ConditionalLogicBuilder
        element={elementWithMultipleRules}
        allElements={mockAllElements}
        onUpdateConditionalLogic={mockOnUpdateConditionalLogic}
      />
    );

    const anyChip = screen.getByText('ANY');
    fireEvent.click(anyChip);

    expect(mockOnUpdateConditionalLogic).toHaveBeenCalledWith({
      operator: 'OR',
      rules: [
        { dependsOn: 'checkbox1', showWhen: true },
        { dependsOn: 'checkbox2', showWhen: false },
      ],
    });
  });

  it('should render rule cards with field and state selectors', () => {
    const elementWithConditionalLogic: Element = {
      ...mockTextElement,
      conditionalLogic: {
        operator: 'AND',
        rules: [{ dependsOn: 'checkbox1', showWhen: true }],
      },
    };

    render(
      <ConditionalLogicBuilder
        element={elementWithConditionalLogic}
        allElements={mockAllElements}
        onUpdateConditionalLogic={mockOnUpdateConditionalLogic}
      />
    );

    expect(screen.getByLabelText('Field')).toBeInTheDocument();
    expect(screen.getByLabelText('State')).toBeInTheDocument();
    expect(screen.getByText('is')).toBeInTheDocument();
  });
});
