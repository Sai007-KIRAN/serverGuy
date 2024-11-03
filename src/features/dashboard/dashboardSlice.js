// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchResults = createAsyncThunk(
//   'dashboard/fetchResults',
//   async ({ query, page, contentType, sortBy, timeFrame }) => {
//     let apiUrl = `https://hn.algolia.com/api/v1/search?query=${query}&page=${page}&hitsPerPage=15`;

//     if (contentType === 'stories') apiUrl += '&tags=story';
//     else if (contentType === 'comments') apiUrl += '&tags=comment';
//     else if (contentType === 'ask_hn') apiUrl += '&tags=ask_hn';
//     else if (contentType === 'launch_hn') apiUrl += '&tags=launch_hn';
//     else if (contentType === 'jobs') apiUrl += '&tags=job';

//     if (timeFrame !== 'all') {
//       const timeMap = {
//         last24h: 24 * 60 * 60,
//         pastWeek: 7 * 24 * 60 * 60,
//         pastMonth: 30 * 24 * 60 * 60,
//         pastYear: 365 * 24 * 60 * 60,
//       };
//       const timeInSeconds = timeMap[timeFrame];
//       const currentTime = Math.floor(Date.now() / 1000);
//       apiUrl += `&numericFilters=created_at_i>${currentTime - timeInSeconds}`;
//     }

//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     let sortedResults = data.hits;

//     if (sortBy === 'comments') {
//       sortedResults = sortedResults.sort((a, b) => (b.num_comments || 0) - (a.num_comments || 0));
//     }

//     return { results: sortedResults, totalPages: data.nbPages };
//   }
// );

// const dashboardSlice = createSlice({
//   name: 'dashboard',
//   initialState: {
//     query: '',
//     results: [],
//     page: 0,
//     totalPages: 0,
//     contentType: '',
//     sortBy: '',
//     timeFrame: 'all',
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     setQuery: (state, action) => { state.query = action.payload; },
//     setPage: (state, action) => { state.page = action.payload; },
//     setContentType: (state, action) => { state.contentType = action.payload; },
//     setSortBy: (state, action) => { state.sortBy = action.payload; },
//     setTimeFrame: (state, action) => { state.timeFrame = action.payload; },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchResults.pending, (state) => { state.status = 'loading'; })
//       .addCase(fetchResults.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.results = action.payload.results;
//         state.totalPages = action.payload.totalPages;
//       })
//       .addCase(fetchResults.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const {
//   setQuery,
//   setPage,
//   setContentType,
//   setSortBy,
//   setTimeFrame,
// } = dashboardSlice.actions;

// export default dashboardSlice.reducer;






// dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchResults = createAsyncThunk(
  'dashboard/fetchResults',
  async ({ query, page, contentType, sortBy, timeFrame }) => {
    const itemsPerPage = 20; // Set items per page
    const apiUrl = `https://hn.algolia.com/api/v1/search?query=${query}&page=${page}&hitsPerPage=${itemsPerPage}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return { results: data.hits, totalPages: data.nbPages }; // Return results and total pages
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
      state.page = 0; // Reset to the first page on a new search
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
        state.results = action.payload.results; // Update results with fetched data
        state.totalPages = action.payload.totalPages; // Update total pages
      })
      .addCase(fetchResults.rejected, (state, action) => {
        console.error('Fetch failed:', action.error);
      });
  },
});

// Export the actions to be used in your components
export const { setQuery, setPage, setContentType, setSortBy, setTimeFrame, resetState } = dashboardSlice.actions;

// Export the reducer to be added to the store
export default dashboardSlice.reducer;
