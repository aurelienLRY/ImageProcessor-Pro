import { render, screen } from '@testing-library/react';
import {vi , it , expect, describe} from 'vitest';
import Setting from './index';

describe('Setting Component', () => {
  it('should render the setting component', () => {
    const mockOnSetting = vi.fn();
    render(<Setting onSetting={mockOnSetting}/>);
    const settingElement = screen.getByTestId('setting');
    expect(settingElement).toBeInTheDocument();
  });

  it('should render the setting header', () => {
    const mockOnSetting = vi.fn();
    render(<Setting onSetting={mockOnSetting}/>);
    const headerElement = screen.getByText(/Setting/i);
    expect(headerElement).toBeInTheDocument();
  });
});