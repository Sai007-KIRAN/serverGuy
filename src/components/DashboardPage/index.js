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
      dispatch(fetchResults({ query, page, contentType, sortBy, timeFrame }));
    }
  }, [username, navigate, query, page, contentType, sortBy, timeFrame, dispatch]);

  const handleSearch = (newQuery) => {
    dispatch(setQuery(newQuery));
    dispatch(setPage(0));
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(resetState());
    navigate('/');
  };

  const handleWelcomeClick = () => {
    dispatch(setQuery(''));
    dispatch(setPage(0));
    window.location.reload(); 
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
        <select value={contentType} onChange={(e) => {
          dispatch(setContentType(e.target.value));
          dispatch(setPage(0));
        }}>
          <option value="all">All</option>
          <option value="story">Stories</option>
          <option value="ask_hn">Ask HN</option>
          <option value="launch_hn">Launch HN</option>
          <option value="job">Jobs</option>
        </select>

        <select value={sortBy} onChange={(e) => {
          dispatch(setSortBy(e.target.value));
          dispatch(setPage(0));
        }}>
          <option value="popularity">Popularity</option>
          <option value="comments">Comments</option>
        </select>

        <select value={timeFrame} onChange={(e) => {
          dispatch(setTimeFrame(e.target.value));
          dispatch(setPage(0));
        }}>
          <option value="all">All Time</option>
          <option value="last24h">Last 24h</option>
          <option value="pastWeek">Past Week</option>
          <option value="pastMonth">Past Month</option>
          <option value="pastYear">Past Year</option>
        </select>
      </div>

      {results && results.length > 0 ? (
        <SearchResults results={results} />
      ) : (
        <p>No results found.</p>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default DashboardPage;







