import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const apiKey = 'V4XP7dK1JRJ1OFP30Fp7hMhpN5uGAprX';
const adminAreas = `https://dataservice.accuweather.com/locations/v1/adminareas/NG?apikey=${apiKey}`;

export const fetchAdminAreas = createAsyncThunk('type/fetchAdminAreas', async () => {
  try {
    const fetchData = await fetch(adminAreas);
    const result = await fetchData.json();
    return result;
  } catch (error) {
    throw new Error('Something went wrong');
  }
});

const locationKeys = {
  Abia: '945273',
  Adamawa: '251711',
  'Akwa Ibom': '251973',
  Anambra: '251991',
  Bauchi: '252138',
  Benue: '252204',
  Borno: '252270',
  Bayelsa: '252198',
  'Cross River': '252502',
  Delta: '251992',
  Ebonyi: '252672',
  Edo: '252686',
  Ekiti: '252730',
  Enugu: '252750',
  'Abuja Federal Capital Territory': '254085',
  Gombe: '252902',
  Imo: '253317',
  Jigawa: '253371',
  Kaduna: '253379',
  Kebbi: '253589',
  Kano: '253466',
  Kogi: '253650',
  Katsina: '253497',
  Kwara: '253709',
  Lagos: '4607',
  Nasarawa: '254093',
  Niger: '254122',
  Ogun: '254698',
  Ondo: '254739',
  Osun: '255018',
  Oyo: '255045',
  Plateau: '255089',
  Rivers: '251990',
  Sokoto: '255459',
  Taraba: '255803',
  Yobe: '256409',
  Zamfara: '256504',
};

export const fetchLocationData = createAsyncThunk('type/fetchLocationData', async (locationName) => {
  try {
    const secApiKey = 'V4XP7dK1JRJ1OFP30Fp7hMhpN5uGAprX';
    const locationUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKeys[locationName]}?apikey=${secApiKey}`;

    const fetchData = await fetch(locationUrl);
    const result = await fetchData.json();
    return result;
  } catch (error) {
    throw new Error('Something went wrong');
  }
});

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

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    searchAreas: (state, action) => {
      const search = action.payload;
      const filteredAreas = state.adminAreas
        .filter((area) => area.toLowerCase().includes(search.toLowerCase()));
      state.filteredAreas = filteredAreas.length > 0 ? filteredAreas : [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAdminAreas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminAreas.fulfilled, (state, { payload }) => {
        const data = [];
        payload.forEach((item) => {
          data.push(item.LocalizedName);
        });
        state.adminAreas = data;
        state.status = 'success';
      })
      .addCase(fetchAdminAreas.rejected, (state) => {
        state.status = '';
      })
      .addCase(fetchLocationData.fulfilled, (state, { payload }) => {
        state.weather = {
          text: payload.Headline.Text,
          minTemp: payload.DailyForecasts[0].Temperature.Minimum.Value,
          maxTemp: payload.DailyForecasts[0].Temperature.Maximum.Value,
          dayPrecipitation: payload.DailyForecasts[0].Day.HasPrecipitation,
          nightPrecipitation: payload.DailyForecasts[0].Night.HasPrecipitation,
        };
      });
  },
});

export const { searchAreas } = weatherSlice.actions;
export default weatherSlice.reducer;
