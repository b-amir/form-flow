import { render, screen, fireEvent } from '@/utils/test-utils';
import { ElementSelectionPanel } from '../ElementSelectionPanel';

describe('ElementSelectionPanel', () => {
  const mockOnSelectElement = vi.fn();

  beforeEach(() => {
    mockOnSelectElement.mockClear();
  });

  it('should render the component with correct title', () => {
    render(<ElementSelectionPanel onSelectElement={mockOnSelectElement} />);

    expect(screen.getByText('Add Element')).toBeInTheDocument();
  });

  it('should render text field button', () => {
    render(<ElementSelectionPanel onSelectElement={mockOnSelectElement} />);

    expect(screen.getByText('Text Field')).toBeInTheDocument();
  });

  it('should render checkbox button', () => {
    render(<ElementSelectionPanel onSelectElement={mockOnSelectElement} />);

    expect(screen.getByText('Checkbox')).toBeInTheDocument();
  });

  it('should call onSelectElement with text type when text field button is clicked', () => {
    render(<ElementSelectionPanel onSelectElement={mockOnSelectElement} />);

    const textFieldButton = screen.getByText('Text Field');
    fireEvent.click(textFieldButton);

    expect(mockOnSelectElement).toHaveBeenCalledWith('text');
  });

  it('should call onSelectElement with checkbox type when checkbox button is clicked', () => {
    render(<ElementSelectionPanel onSelectElement={mockOnSelectElement} />);

    const checkboxButton = screen.getByText('Checkbox');
    fireEvent.click(checkboxButton);

    expect(mockOnSelectElement).toHaveBeenCalledWith('checkbox');
  });
});
