import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');

    if (query) {
      setSearchTerm(query);
    } else {
      setSearchTerm('');
    }
  }, [location]);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      navigate('/dashboard');
    } else {
      onSearch(searchTerm);
      navigate(`/dashboard/?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Hacker News"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
