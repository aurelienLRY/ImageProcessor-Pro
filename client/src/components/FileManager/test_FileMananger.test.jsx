import{describe, it, expect, vi} from 'vitest';
import { render, screen} from '@testing-library/react';
import FilesManager from './index';

describe('FilesManager', () => {
  it('should render FilesManager component', () => {
    const onFilesChange = vi.fn();
    render(<FilesManager onFilesChange={onFilesChange}/>);
    const fileInput = screen.getByLabelText('Choisir les images');
    expect(fileInput).toBeInTheDocument();
  });


});