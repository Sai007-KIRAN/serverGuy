// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './index.css';

// function SearchBar({ onSearch }) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const query = params.get('query');

//     if (query) {
//       setSearchTerm(query);
//     } else {
//       setSearchTerm('');
//     }
//   }, [location]);

//   const handleSearch = () => {
//     if (searchTerm.trim() === '') {
//       navigate('/dashboard');
//     } else {
//       onSearch(searchTerm);
//       navigate(`/dashboard/?query=${encodeURIComponent(searchTerm)}`);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search Hacker News"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>
//     </div>
//   );
// }

// export default SearchBar;










import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import './index.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    setSearchTerm(query || '');
  }, [location]);

  const debouncedOnSearch = useCallback(
    debounce((query) => {
      if (query.trim() === '') {
        navigate('/dashboard', { replace: true });
        onSearch('');
      } else {
        navigate(`/dashboard/?query=${encodeURIComponent(query)}`);
        onSearch(query);
      }
    }, 1000),
    [navigate, onSearch]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedOnSearch(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Hacker News"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;


