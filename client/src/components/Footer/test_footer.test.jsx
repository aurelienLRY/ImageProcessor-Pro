import { render, screen } from '@testing-library/react';
import Footer from './index';

describe('Footer Component', () => {
  it('should render the footer component', () => {
    render(<Footer />);
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

});