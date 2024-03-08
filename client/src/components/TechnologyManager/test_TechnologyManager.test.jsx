import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import TechnologyManager from './index';
import {vi, describe , it ,expect} from 'vitest'

describe('TechnologyManager Component', () => {
  it('should render the component', () => {
    const mockOnTechnologyChange = vi.fn();
    render(<TechnologyManager onTechnologyChange={mockOnTechnologyChange} />);
    const technologyManagerElement = screen.getByTestId('technology-manager');
    expect(technologyManagerElement).toBeInTheDocument();
  });

  it('should render the component header', () => {
    const mockOnTechnologyChange = vi.fn();
    render(<TechnologyManager onTechnologyChange={mockOnTechnologyChange} />);
    const headerElement = screen.getByText(/Technology Manager/i);
    expect(headerElement).toBeInTheDocument();
  });

  it('should call onTechnologyChange when checkbox is checked', async () => {
    const mockOnTechnologyChange = vi.fn();
    render(<TechnologyManager onTechnologyChange={mockOnTechnologyChange} />);
    const htmlCheckbox = screen.getByLabelText('HTML');
    fireEvent.click(htmlCheckbox);
    await waitFor(() => {
    expect(mockOnTechnologyChange).toHaveBeenCalledWith({ html: true , react: false});
    });
  });

  it('should call onTechnologyChange when checkbox is unchecked', () => {
    const mockOnTechnologyChange = vi.fn();
    render(<TechnologyManager onTechnologyChange={mockOnTechnologyChange} />);
    const reactCheckbox = screen.getByLabelText('React');
    fireEvent.click(reactCheckbox);
    expect(mockOnTechnologyChange).toHaveBeenCalledWith({ html: false , react: true});
    fireEvent.click(reactCheckbox);
    expect(mockOnTechnologyChange).toHaveBeenCalledWith({ html: false , react: false});
  });
});