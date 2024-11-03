import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchResults = createAsyncThunk(
  'dashboard/fetchResults',
  async ({ query, page, contentType, sortBy, timeFrame }) => {
    const itemsPerPage = 20;
    const apiUrl = `https://hn.algolia.com/api/v1/search?query=${query}&page=${page}&hitsPerPage=${itemsPerPage}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return { results: data.hits, totalPages: data.nbPages };
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    query: '',
    results: [],
    page: 0,
    totalPages: 0,
    contentType: '',
    sortBy: '',
    timeFrame: '',
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
      state.page = 0;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setContentType(state, action) {
      state.contentType = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setTimeFrame(state, action) {
      state.timeFrame = action.payload;
    },
    resetState(state) {
      state.query = '';
      state.results = [];
      state.page = 0;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.results = action.payload.results; 
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        console.error('Fetch failed:', action.error);
      });
  },
});

export const { setQuery, setPage, setContentType, setSortBy, setTimeFrame, resetState } = dashboardSlice.actions;


export default dashboardSlice.reducer;
