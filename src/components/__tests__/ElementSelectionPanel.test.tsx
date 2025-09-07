import { render, screen, fireEvent } from '@/utils/test-utils';
import { ElementSelectionRow } from '@components/layout/panels/form-builder/ElementSelectionRow';
import { useFormStore } from '@/features/form-management/stores/formStore';

vi.mock('@mui/icons-material', () => ({
  TextFields: () => <span data-testid="text-fields-icon">TextFields</span>,
  CheckBox: () => <span data-testid="checkbox-icon">CheckBox</span>,
  Visibility: () => <span data-testid="visibility-icon">Visibility</span>,
  FullscreenExit: () => (
    <span data-testid="fullscreen-exit-icon">FullscreenExit</span>
  ),
}));

vi.mock('@/features/form-management/stores/formStore');

describe('ElementSelectionRow', () => {
  const mockAddElement = vi.fn();

  beforeEach(() => {
    mockAddElement.mockClear();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useFormStore as any).mockReturnValue({
      addElement: mockAddElement,
      draftForm: { name: 'Test Form', elements: [] },
    });
  });

  it('should render text field button', () => {
    render(<ElementSelectionRow />);

    expect(screen.getByText('Add Text Field')).toBeInTheDocument();
  });

  it('should render checkbox button', () => {
    render(<ElementSelectionRow />);

    expect(screen.getByText('Add Checkbox')).toBeInTheDocument();
  });

  it('should call addElement with text type when text field button is clicked', () => {
    render(<ElementSelectionRow />);

    const textFieldButton = screen.getByText('Add Text Field');
    fireEvent.click(textFieldButton);

    expect(mockAddElement).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'text',
        label: 'New Text Field',
        isRequired: false,
      })
    );
  });

  it('should call addElement with checkbox type when checkbox button is clicked', () => {
    render(<ElementSelectionRow />);

    const checkboxButton = screen.getByText('Add Checkbox');
    fireEvent.click(checkboxButton);

    expect(mockAddElement).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'checkbox',
        label: 'New Checkbox',
        isRequired: false,
      })
    );
  });
});
