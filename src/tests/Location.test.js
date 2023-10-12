import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Location from '../components/Location';
import '@testing-library/jest-dom/extend-expect';

describe('Location Component', () => {
  it('renders the Location component with the correct name', () => {
    const locationName = 'New York';

    render(
      <MemoryRouter>
        <Location name={locationName} />
      </MemoryRouter>,
    );

    const locationElement = screen.getByText(locationName);
    expect(locationElement).toBeInTheDocument();

    const navLink = screen.getByRole('link');
    expect(navLink).toHaveAttribute('href', `/${locationName}`);
  });
});
