import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchResults = createAsyncThunk(
  'dashboard/fetchResults',
  async ({ query, page, contentType, sortBy, timeFrame }) => {
    const itemsPerPage = 20;
    let apiUrl = `https://hn.algolia.com/api/v1/search?query=${query}&page=${page}&hitsPerPage=${itemsPerPage}`;

    if (contentType && contentType !== 'all') {
      apiUrl += `&tags=${contentType}`;
    }

    if (timeFrame) {
      const now = new Date();
      let since;
      switch (timeFrame) {
        case 'last24h':
          since = new Date(now - 24 * 60 * 60 * 1000);
          break;
        case 'pastWeek':
          since = new Date(now - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'pastMonth':
          since = new Date(now - 30 * 24 * 60 * 60 * 1000);
          break;
        case 'pastYear':
          since = new Date(now - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          since = null;
      }
      if (since) {
        apiUrl += `&numericFilters=created_at_i>${Math.floor(since.getTime() / 1000)}`;
      }
    }

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

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
    sortBy: 'popularity',
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
      state.page = 0; 
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
      state.page = 0;
    },
    setTimeFrame(state, action) {
      state.timeFrame = action.payload;
      state.page = 0;
    },
    resetState(state) {
      state.query = '';
      state.results = [];
      state.page = 0;
      state.totalPages = 0;
      state.contentType = '';
      state.sortBy = 'popularity';
      state.timeFrame = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.fulfilled, (state, action) => {
        let results = action.payload.results;

        if (state.sortBy === 'comments') {
          results = results.sort((a, b) => b.num_comments - a.num_comments);
        } else if (state.sortBy === 'popularity') {
          results = results.sort((a, b) => b.points - a.points);
        }

        state.results = results; 
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        console.error('Fetch failed:', action.error);
      });
  },
});

export const { setQuery, setPage, setContentType, setSortBy, setTimeFrame, resetState } = dashboardSlice.actions;
export default dashboardSlice.reducer;



