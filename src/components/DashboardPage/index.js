// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import SearchBar from '../SearchBar';
// import Pagination from '../Pagination';
// import SearchResults from '../SearchResults';
// import './DashboardPage.css';

// function DashboardPage() {
//   const username = localStorage.getItem('username');
//   const navigate = useNavigate();
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [page, setPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [contentType, setContentType] = useState(''); 
//   const [sortBy, setSortBy] = useState('');
//   const [timeFrame, setTimeFrame] = useState('all'); 

//   useEffect(() => {
//     if (!username) {
//       navigate('/');
//     }
//   }, [username, navigate]);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         let apiUrl = `https://hn.algolia.com/api/v1/search?query=${query}&page=${page}&hitsPerPage=15`;

//         if (contentType === 'stories') {
//           apiUrl += '&tags=story';
//         } else if (contentType === 'comments') {
//           apiUrl += '&tags=comment';
//         } else if (contentType === 'ask_hn') {
//           apiUrl += '&tags=ask_hn';
//         } else if (contentType === 'launch_hn') {
//           apiUrl += '&tags=launch_hn';
//         } else if (contentType === 'jobs') {
//           apiUrl += '&tags=job';
//         }

//         if (timeFrame !== 'all') {
//           const timeMap = {
//             last24h: 24 * 60 * 60,
//             pastWeek: 7 * 24 * 60 * 60,
//             pastMonth: 30 * 24 * 60 * 60,
//             pastYear: 365 * 24 * 60 * 60,
//           };
//           const timeInSeconds = timeMap[timeFrame];
//           const currentTime = Math.floor(Date.now() / 1000);
//           apiUrl += `&numericFilters=created_at_i>${currentTime - timeInSeconds}`;
//         }

//         const response = await fetch(apiUrl);
//         const data = await response.json();

//         let sortedResults = data.hits;

//         if (sortBy === 'comments') {
//           sortedResults = sortedResults.sort((a, b) => (b.num_comments || 0) - (a.num_comments || 0));
//         }

//         setResults(sortedResults);
//         setTotalPages(data.nbPages);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchResults();
//   }, [query, page, contentType, sortBy, timeFrame]);

//   const handleSearch = (newQuery) => {
//     setQuery(newQuery);
//     setPage(0);
//   };

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/');
//   };

//   const handleWelcomeClick = () => {
//     setPage(0);
//     setQuery('');
//     navigate('/dashboard');
//   };

//   return (
//     <div>
//       <header>
//         <div className="header-left">
//           <Link to="#" className='head' onClick={handleWelcomeClick}>
//             <h2>Welcome {username}</h2>
//           </Link>
//           <SearchBar onSearch={handleSearch} />
//         </div>
//         <button onClick={handleLogout}>Logout</button>
//       </header>

//       <div className="sorting-options">
//         <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
//           <option value="">Select Content Type</option>
//           <option value="all">All</option>
//           <option value="stories">Stories</option>
//           <option value="ask_hn">Ask HN</option>
//           <option value="launch_hn">Launch HN</option>
//           <option value="jobs">Jobs</option>
//         </select>

//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//           <option value="">Select Sort Option</option>
//           <option value="popularity">Popularity</option>
//           <option value="comments">Comments</option>
//         </select>

//         <select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
//           <option value="all">All Time</option>
//           <option value="last24h">Last 24h</option>
//           <option value="pastWeek">Past Week</option>
//           <option value="pastMonth">Past Month</option>
//           <option value="pastYear">Past Year</option>
//         </select>
//       </div>

//       <SearchResults results={results} />
//       <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
//     </div>
//   );
// }

// export default DashboardPage;



// import React, { useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { setQuery, setPage, setContentType, setSortBy, setTimeFrame, fetchResults } from '../../features/dashboard/dashboardSlice';
// import SearchBar from '../SearchBar';
// import Pagination from '../Pagination';
// import SearchResults from '../SearchResults';
// import './DashboardPage.css';

// function DashboardPage() {
//   const username = localStorage.getItem('username');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { query, results, page, totalPages, contentType, sortBy, timeFrame} = useSelector((state) => state.dashboard);

//   useEffect(() => {
//     if (!username) {
//       navigate('/');
//     }
//   }, [username, navigate]);

//   useEffect(() => {
//     dispatch(fetchResults({ query, page, contentType, sortBy, timeFrame }));
//   }, [query, page, contentType, sortBy, timeFrame, dispatch]);

//   const handleSearch = (newQuery) => {
//     dispatch(setQuery(newQuery));
//     dispatch(setPage(0));
//   };

//   const handlePageChange = (newPage) => {
//     dispatch(setPage(newPage));
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/');
//   };

//   const handleWelcomeClick = () => {
//     dispatch(setQuery(''));
//     dispatch(setPage(0));
//     navigate('/dashboard');
//   };

//   return (
//     <div>
//       <header>
//         <div className="header-left">
//           <Link to="#" className='head' onClick={handleWelcomeClick}>
//             <h2>Welcome {username}</h2>
//           </Link>
//           <SearchBar onSearch={handleSearch} />
//         </div>
//         <button onClick={handleLogout}>Logout</button>
//       </header>

//       <div className="sorting-options">
//         <select value={contentType} onChange={(e) => dispatch(setContentType(e.target.value))}>
//           <option value="">Select Content Type</option>
//           <option value="all">All</option>
//           <option value="stories">Stories</option>
//           <option value="ask_hn">Ask HN</option>
//           <option value="launch_hn">Launch HN</option>
//           <option value="jobs">Jobs</option>
//         </select>

//         <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
//           <option value="">Select Sort Option</option>
//           <option value="popularity">Popularity</option>
//           <option value="comments">Comments</option>
//         </select>

//         <select value={timeFrame} onChange={(e) => dispatch(setTimeFrame(e.target.value))}>
//           <option value="all">All Time</option>
//           <option value="last24h">Last 24h</option>
//           <option value="pastWeek">Past Week</option>
//           <option value="pastMonth">Past Month</option>
//           <option value="pastYear">Past Year</option>
//         </select>
//       </div>

//       <SearchResults results={results} />
//       <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
//     </div>
//   );
// }

// export default DashboardPage;


import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery, setPage, setContentType, setSortBy, setTimeFrame, fetchResults, resetState } from '../../features/dashboard/dashboardSlice';
import SearchBar from '../SearchBar';
import Pagination from '../Pagination';
import SearchResults from '../SearchResults';
import './DashboardPage.css';

function DashboardPage() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { query, results, page, totalPages, contentType, sortBy, timeFrame } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (!username) {
      navigate('/');
    } else {
      // Fetch results whenever the dashboard is loaded
      dispatch(fetchResults({ query, page, contentType, sortBy, timeFrame }));
    }
  }, [username, navigate, query, page, contentType, sortBy, timeFrame, dispatch]);

  const handleSearch = (newQuery) => {
    dispatch(setQuery(newQuery));
    dispatch(setPage(0)); // Reset to the first page on new search
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(resetState()); // Reset state on logout
    navigate('/');
  };

  const handleWelcomeClick = () => {
    dispatch(setQuery(''));
    dispatch(setPage(0));
    navigate('/dashboard');
  };

  return (
    <div>
      <header>
        <div className="header-left">
          <Link to="#" className='head' onClick={handleWelcomeClick}>
            <h2>Welcome {username}</h2>
          </Link>
          <SearchBar onSearch={handleSearch} />
        </div>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div className="sorting-options">
        <select value={contentType} onChange={(e) => dispatch(setContentType(e.target.value))}>
          <option value="">Select Content Type</option>
          <option value="all">All</option>
          <option value="stories">Stories</option>
          <option value="ask_hn">Ask HN</option>
          <option value="launch_hn">Launch HN</option>
          <option value="jobs">Jobs</option>
        </select>

        <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
          <option value="">Select Sort Option</option>
          <option value="popularity">Popularity</option>
          <option value="comments">Comments</option>
        </select>

        <select value={timeFrame} onChange={(e) => dispatch(setTimeFrame(e.target.value))}>
          <option value="all">All Time</option>
          <option value="last24h">Last 24h</option>
          <option value="pastWeek">Past Week</option>
          <option value="pastMonth">Past Month</option>
          <option value="pastYear">Past Year</option>
        </select>
      </div>

      <SearchResults results={results} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default DashboardPage;




