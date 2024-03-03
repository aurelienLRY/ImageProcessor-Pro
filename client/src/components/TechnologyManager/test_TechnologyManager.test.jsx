import { render, screen, fireEvent } from '@testing-library/react';
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

  it('should call onTechnologyChange when checkbox is checked', () => {
    const mockOnTechnologyChange = vi.fn();
    render(<TechnologyManager onTechnologyChange={mockOnTechnologyChange} />);
    const htmlCheckbox = screen.getByLabelText('HTML');
    fireEvent.click(htmlCheckbox);
    expect(mockOnTechnologyChange).toHaveBeenCalledWith({ html: true });
  });

  it('should call onTechnologyChange when checkbox is unchecked', () => {
    const mockOnTechnologyChange = vi.fn();
    render(<TechnologyManager onTechnologyChange={mockOnTechnologyChange} />);
    const reactCheckbox = screen.getByLabelText('React');
    fireEvent.click(reactCheckbox);
    expect(mockOnTechnologyChange).toHaveBeenCalledWith({ react: true });
    fireEvent.click(reactCheckbox);
    expect(mockOnTechnologyChange).toHaveBeenCalledWith({ react: false });
  });
});