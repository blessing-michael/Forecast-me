import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import ViewLocation from '../components/ViewLocation';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ViewLocation Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      weather: {
        weather: {
          text: 'Sunny',
          minTemp: 70,
          maxTemp: 85,
          dayPrecipitation: false,
          nightPrecipitation: true,
        },
      },
    });
  });

  it('renders the ViewLocation component with weather data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/NewYork']}>
          <Routes>
            <Route path="/:name" element={<ViewLocation />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Forecast me')).toBeInTheDocument();
    expect(screen.getByText('Weather in NewYork')).toBeInTheDocument();

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(screen.getByText((content) => {
      const hasTemperature = /Temperature:.*F/.test(content);
      return hasTemperature;
    })).toBeInTheDocument();

    expect(screen.getByText('Day Time: No rain')).toBeInTheDocument();
    expect(screen.getByText('Night Time: Expect rain')).toBeInTheDocument();
  });
});
