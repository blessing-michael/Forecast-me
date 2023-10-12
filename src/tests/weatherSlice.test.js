import weatherReducer, {
  fetchAdminAreas,
  fetchLocationData,
  searchAreas,
} from '../redux/weather/weatherSlice';

describe('weatherReducer', () => {
  const initialState = {
    adminAreas: [],
    filteredAreas: [],
    weather: {
      text: '',
      minTemp: 0,
      maxTemp: 0,
      dayPrecipitation: false,
      nightPrecipitation: false,
    },
    status: 'idle',
  };

  it('should handle initial state', () => {
    expect(weatherReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle fetchAdminAreas.pending', () => {
    const action = fetchAdminAreas.pending;
    const nextState = weatherReducer(initialState, action);
    expect(nextState.status).toEqual('loading');
  });

  it('should handle fetchAdminAreas.fulfilled', () => {
    const payload = [{ LocalizedName: 'Abia' }];
    const action = fetchAdminAreas.fulfilled(payload);
    const nextState = weatherReducer(initialState, action);
    expect(nextState.adminAreas).toEqual(['Abia']);
    expect(nextState.status).toEqual('success');
  });

  it('should handle fetchAdminAreas.rejected', () => {
    const action = fetchAdminAreas.rejected;
    const nextState = weatherReducer(initialState, action);
    expect(nextState.status).toEqual('');
  });

  it('should handle fetchLocationData.fulfilled', () => {
    const payload = {
      Headline: { Text: 'Sunny' },
      DailyForecasts: [
        {
          Temperature: {
            Minimum: { Value: 70 },
            Maximum: { Value: 85 },
          },
          Day: { HasPrecipitation: false },
          Night: { HasPrecipitation: true },
        },
      ],
    };
    const action = fetchLocationData.fulfilled(payload);
    const nextState = weatherReducer(initialState, action);
    expect(nextState.weather.text).toEqual('Sunny');
    expect(nextState.weather.minTemp).toEqual(70);
    expect(nextState.weather.maxTemp).toEqual(85);
    expect(nextState.weather.dayPrecipitation).toEqual(false);
    expect(nextState.weather.nightPrecipitation).toEqual(true);
  });

  it('should handle searchAreas', () => {
    const initial = {
      adminAreas: ['Abia', 'Adamawa', 'Akwa Ibom'],
      filteredAreas: [],
      weather: {
        text: '',
        minTemp: 0,
        maxTemp: 0,
        dayPrecipitation: false,
        nightPrecipitation: false,
      },
      status: 'idle',
    };

    const action = searchAreas('Ab');
    const nextState = weatherReducer(initial, action);
    expect(nextState.filteredAreas).toEqual(['Abia']);
  });
});
