import { render, screen, fireEvent } from '@/utils/test-utils';
import { ElementPropertiesEditor } from '../form/builder/ElementPropertiesEditor';

describe('ElementPropertiesEditor', () => {
  const mockElement = {
    id: 'test-id',
    type: 'text' as const,
    label: 'Test Label',
    isRequired: false,
  };

  const mockUpdateElement = vi.fn();

  beforeEach(() => {
    mockUpdateElement.mockClear();
  });

  it('should display placeholder when no element is selected', () => {
    render(
      <ElementPropertiesEditor
        element={null}
        onUpdateElement={mockUpdateElement}
      />
    );

    expect(screen.getByText('Element Properties')).toBeInTheDocument();
    expect(
      screen.getByText('Select an element to edit its properties')
    ).toBeInTheDocument();
    expect(screen.queryByLabelText('Label')).not.toBeInTheDocument();
  });

  it('should display element properties when element is provided', () => {
    render(
      <ElementPropertiesEditor
        element={mockElement}
        onUpdateElement={mockUpdateElement}
      />
    );

    expect(screen.getByText('Element Properties')).toBeInTheDocument();
    expect(screen.getByLabelText('Label')).toHaveValue('Test Label');
    expect(screen.getByLabelText('Required')).not.toBeChecked();
    expect(screen.getByText('Element Type: Text Field')).toBeInTheDocument();
  });

  it('should call onUpdateElement when label is changed', () => {
    render(
      <ElementPropertiesEditor
        element={mockElement}
        onUpdateElement={mockUpdateElement}
      />
    );

    const labelInput = screen.getByLabelText('Label');
    fireEvent.change(labelInput, { target: { value: 'Updated Label' } });

    expect(mockUpdateElement).toHaveBeenCalledWith('test-id', {
      label: 'Updated Label',
    });
  });

  it('should call onUpdateElement when required toggle is changed', () => {
    render(
      <ElementPropertiesEditor
        element={mockElement}
        onUpdateElement={mockUpdateElement}
      />
    );

    const requiredToggle = screen.getByLabelText('Required');
    fireEvent.click(requiredToggle);

    expect(mockUpdateElement).toHaveBeenCalledWith('test-id', {
      isRequired: true,
    });
  });

  it('should display checkbox element type correctly', () => {
    const checkboxElement = {
      ...mockElement,
      type: 'checkbox' as const,
    };

    render(
      <ElementPropertiesEditor
        element={checkboxElement}
        onUpdateElement={mockUpdateElement}
      />
    );

    expect(screen.getByText('Element Type: Checkbox')).toBeInTheDocument();
  });
});
