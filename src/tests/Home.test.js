import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Home from '../components/Home';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

describe('Home Component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      weather: {
        adminAreas: ['Area1', 'Area2'],
        filteredAreas: [],
      },
    });
  });

  it('renders the Home component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('TellTheClouds')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Location')).toBeInTheDocument();
    expect(screen.getByAltText('nigeria map')).toBeInTheDocument();
  });

  it('handles input change and dispatches searchAreas action', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText('Search Location');

    fireEvent.change(searchInput, { target: { value: 'New York' } });

    expect(searchInput.value).toBe('New York');

    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'weather/searchAreas',
      payload: 'New York',
    });
  });
});
