import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../renderer/components/HomePage';

const mockNavigate = jest.fn();

// Mock the entire module
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('HomePage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders main sections', () => {
    render(<HomePage />);

    // Check for tab buttons
    const homeButton = screen.getByRole('button', { name: /^home$/i });
    const libButton = screen.getByRole('button', { name: /^lib$/i });
    const visButton = screen.getByRole('button', { name: /^vis$/i });

    expect(homeButton).toBeInTheDocument();
    expect(libButton).toBeInTheDocument();
    expect(visButton).toBeInTheDocument();

    // Check for section headings
    expect(screen.getByRole('heading', { name: /^instance$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^library$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^visualization$/i })).toBeInTheDocument();
  });

  test('displays add buttons for each section', () => {
    render(<HomePage />);
    expect(screen.getByRole('button', { name: /^add instance$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^add library$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^add visualization$/i })).toBeInTheDocument();
  });

  test('renders search components', () => {
    render(<HomePage />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('renders example cards', () => {
    render(<HomePage />);
    expect(screen.getByText('Instance 1')).toBeInTheDocument();
    expect(screen.getByText('Instance 2')).toBeInTheDocument();
    expect(screen.getByText('Library 1')).toBeInTheDocument();
    expect(screen.getByText('Library 2')).toBeInTheDocument();
    expect(screen.getByText('Visualization 1')).toBeInTheDocument();
    expect(screen.getByText('Visualization 2')).toBeInTheDocument();
  });

  test('shows dropdown menu when Add Library button is clicked', () => {
    render(<HomePage />);
    const addLibraryButton = screen.getByRole('button', { name: /^add library$/i });

    fireEvent.click(addLibraryButton);

    expect(screen.getByText('Create a local library')).toBeInTheDocument();
    expect(screen.getByText('Browse the library market')).toBeInTheDocument();
  });

  test('triggers create local library action when option is selected', () => {
    render(<HomePage />);
    const addLibraryButton = screen.getByRole('button', { name: /^add library$/i });

    fireEvent.click(addLibraryButton);
    fireEvent.click(screen.getByText('Create a local library'));

    expect(screen.getByText('Create New Library')).toBeInTheDocument();
  });

  test('navigates to library market when option is selected', () => {
    render(<HomePage />);
    const addLibraryButton = screen.getByRole('button', { name: /^add library$/i });

    fireEvent.click(addLibraryButton);
    fireEvent.click(screen.getByText('Browse the library market'));

    expect(mockNavigate).toHaveBeenCalledWith('/library-market');
  });
});
