import { render, screen, fireEvent } from '@/utils/test-utils';
import { FormRenderer } from '../form/renderer/FormRenderer';
import type { ApiForm } from '@/types';

describe('FormRenderer - Conditional Logic Integration', () => {
  const mockFormWithConditionalLogic: ApiForm = {
    id: 'form1',
    name: 'Test Form with Conditional Logic',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    elements: [
      {
        id: 'checkbox1',
        type: 'checkbox',
        label: 'Show Additional Fields',
        isRequired: false,
      },
      {
        id: 'text1',
        type: 'text',
        label: 'Additional Text Field',
        isRequired: false,
        conditionalLogic: {
          dependsOn: 'checkbox1',
          showWhen: true,
        },
      },
      {
        id: 'text2',
        type: 'text',
        label: 'Hidden When Checked',
        isRequired: false,
        conditionalLogic: {
          dependsOn: 'checkbox1',
          showWhen: false,
        },
      },
      {
        id: 'text3',
        type: 'text',
        label: 'Always Visible',
        isRequired: false,
      },
    ],
  };

  beforeEach(() => {
    // Reset any global state if needed
  });

  it('should initially show elements based on default checkbox state', () => {
    render(<FormRenderer form={mockFormWithConditionalLogic} />);

    expect(screen.getByLabelText('Show Additional Fields')).toBeInTheDocument();
    expect(screen.queryByLabelText('Additional Text Field')).not.toBeVisible();
    expect(screen.getByLabelText('Hidden When Checked')).toBeVisible();
    expect(screen.getByLabelText('Always Visible')).toBeVisible();
  });

  it('should show conditional elements when checkbox is checked', async () => {
    render(<FormRenderer form={mockFormWithConditionalLogic} />);

    const checkbox = screen.getByLabelText('Show Additional Fields');
    fireEvent.click(checkbox);

    // Wait for collapse animation to complete
    await new Promise(resolve => setTimeout(resolve, 350));

    expect(screen.getByLabelText('Additional Text Field')).toBeVisible();
    expect(screen.queryByLabelText('Hidden When Checked')).not.toBeVisible();
    expect(screen.getByLabelText('Always Visible')).toBeVisible();
  });

  it('should hide conditional elements when checkbox is unchecked', async () => {
    render(<FormRenderer form={mockFormWithConditionalLogic} />);

    const checkbox = screen.getByLabelText('Show Additional Fields');

    fireEvent.click(checkbox);
    await new Promise(resolve => setTimeout(resolve, 350));
    expect(screen.getByLabelText('Additional Text Field')).toBeVisible();

    fireEvent.click(checkbox);
    await new Promise(resolve => setTimeout(resolve, 350));
    expect(screen.queryByLabelText('Additional Text Field')).not.toBeVisible();
    expect(screen.getByLabelText('Hidden When Checked')).toBeVisible();
  });

  it('should handle multiple conditional elements correctly', () => {
    const formWithMultipleConditionals: ApiForm = {
      ...mockFormWithConditionalLogic,
      elements: [
        {
          id: 'checkbox1',
          type: 'checkbox',
          label: 'Trigger 1',
        },
        {
          id: 'checkbox2',
          type: 'checkbox',
          label: 'Trigger 2',
        },
        {
          id: 'text1',
          type: 'text',
          label: 'Depends on Trigger 1',
          conditionalLogic: {
            dependsOn: 'checkbox1',
            showWhen: true,
          },
        },
        {
          id: 'text2',
          type: 'text',
          label: 'Depends on Trigger 2',
          conditionalLogic: {
            dependsOn: 'checkbox2',
            showWhen: true,
          },
        },
      ],
    };

    render(<FormRenderer form={formWithMultipleConditionals} />);

    expect(screen.queryByLabelText('Depends on Trigger 1')).not.toBeVisible();
    expect(screen.queryByLabelText('Depends on Trigger 2')).not.toBeVisible();

    fireEvent.click(screen.getByLabelText('Trigger 1'));
    expect(screen.getByLabelText('Depends on Trigger 1')).toBeVisible();
    expect(screen.queryByLabelText('Depends on Trigger 2')).not.toBeVisible();

    fireEvent.click(screen.getByLabelText('Trigger 2'));
    expect(screen.getByLabelText('Depends on Trigger 1')).toBeVisible();
    expect(screen.getByLabelText('Depends on Trigger 2')).toBeVisible();
  });

  it('should preserve form values when elements are hidden and shown', async () => {
    render(<FormRenderer form={mockFormWithConditionalLogic} />);

    const checkbox = screen.getByLabelText('Show Additional Fields');
    fireEvent.click(checkbox);
    await new Promise(resolve => setTimeout(resolve, 350));

    const textField = screen.getByLabelText('Additional Text Field');
    fireEvent.change(textField, { target: { value: 'test value' } });

    fireEvent.click(checkbox);
    await new Promise(resolve => setTimeout(resolve, 350));
    expect(screen.queryByLabelText('Additional Text Field')).not.toBeVisible();

    fireEvent.click(checkbox);
    await new Promise(resolve => setTimeout(resolve, 350));
    const reshownTextField = screen.getByLabelText('Additional Text Field');
    expect(reshownTextField).toHaveValue('test value');
  });

  it('should handle form values correctly when elements are shown/hidden', async () => {
    render(<FormRenderer form={mockFormWithConditionalLogic} />);

    const checkbox = screen.getByLabelText('Show Additional Fields');
    const hiddenField = screen.getByLabelText('Hidden When Checked');
    const alwaysVisible = screen.getByLabelText('Always Visible');

    fireEvent.change(hiddenField, { target: { value: 'hidden value' } });
    fireEvent.change(alwaysVisible, { target: { value: 'visible value' } });

    fireEvent.click(checkbox);
    await new Promise(resolve => setTimeout(resolve, 350));
    const conditionalField = screen.getByLabelText('Additional Text Field');
    fireEvent.change(conditionalField, {
      target: { value: 'conditional value' },
    });

    expect(conditionalField).toHaveValue('conditional value');
    expect(alwaysVisible).toHaveValue('visible value');
    expect(screen.queryByLabelText('Hidden When Checked')).not.toBeVisible();
  });

  it('should handle form with no conditional logic elements', () => {
    const simpleForm: ApiForm = {
      id: 'simple-form',
      name: 'Simple Form',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      elements: [
        {
          id: 'text1',
          type: 'text',
          label: 'Simple Text Field',
        },
        {
          id: 'checkbox1',
          type: 'checkbox',
          label: 'Simple Checkbox',
        },
      ],
    };

    render(<FormRenderer form={simpleForm} />);

    expect(screen.getByLabelText('Simple Text Field')).toBeInTheDocument();
    expect(screen.getByLabelText('Simple Checkbox')).toBeInTheDocument();

    const textField = screen.getByLabelText('Simple Text Field');
    const checkbox = screen.getByLabelText('Simple Checkbox');

    fireEvent.change(textField, { target: { value: 'test value' } });
    fireEvent.click(checkbox);

    expect(textField).toHaveValue('test value');
    expect(checkbox).toBeChecked();
  });
});
