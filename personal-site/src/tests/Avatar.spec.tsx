import { fireEvent, render, screen } from '@testing-library/react';
import { Avatar } from '../components/Avatar';

const writeText = vi.fn()

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

describe('Component test: @Avatar', () => {
    it('renders the heading', () => {
        render(<Avatar />);
        expect(screen.getByRole('heading')).toHaveTextContent('Mike Tyler');
    });
    it('copies email address on button click', () => {
        render(<Avatar />);
        fireEvent.click(screen.getByText('Copy email'));
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith("mktyler01@gmail.com");
    });
    it('changes text on button click', () => {
        render(<Avatar />);
        fireEvent.click(screen.getByText('Copy email'));
        expect(screen.getByRole('button')).toHaveTextContent('Copied ✓');
    });
})