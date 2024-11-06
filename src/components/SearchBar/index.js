// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import debounce from 'lodash.debounce';
// import './index.css';

// function SearchBar({ onSearch }) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const query = params.get('query');
//     setSearchTerm(query || '');
//   }, [location]);

//   const debouncedOnSearch = useRef(
//     debounce((query) => {
//       if (query.trim() === '') {
//         navigate('/dashboard', { replace: true });
//         onSearch('');
//       } else {
//         navigate(`/dashboard/?query=${encodeURIComponent(query)}`);
//         onSearch(query);
//       }
//     }, 1000),
//     [navigate, onSearch]
//   );

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     debouncedOnSearch(value);
//   };

//   return (
//     <div>
//       <i className="fas fa-search"></i>
//       <input
//         type="text"
//         placeholder="Search stories by title, url or author"
//         value={searchTerm}
//         onChange={handleInputChange}
//       />
//     </div>
//   );
// }

// export default SearchBar;





import React, { useState, useEffect, useRef } from 'react';
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

  const debouncedOnSearch = useRef(
    debounce((query) => {
      if (query.trim() === '') {
        navigate('/dashboard', { replace: true });
        onSearch('');
      } else {
        navigate(`/dashboard/?query=${encodeURIComponent(query)}`);
        onSearch(query);
      }
    }, 1000)
  ).current;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedOnSearch(value); 
  };

  return (
    <div>
      <i className="fas fa-search"></i>
      <input
        type="text"
        placeholder="Search stories by title, url or author"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;

