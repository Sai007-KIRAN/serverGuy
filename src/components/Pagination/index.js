import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange, query }) {
  const navigate = useNavigate();

  const handlePageChange = (number) => {
    onPageChange(number);
    navigate(`/dashboard/?query=${encodeURIComponent(query)}&page=${number + 1}`);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);

  return (
    <div className="pagination-container">
      <button
        disabled={currentPage === 0}
        onClick={() => handlePageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        Previous
      </button>

      <div className="page-numbers-scroll">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={currentPage === number ? 'active' : ''}
            onClick={() => handlePageChange(number)}
            aria-current={currentPage === number ? 'page' : undefined}
            aria-label={`Page ${number + 1}`}
          >
            {number + 1}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage >= totalPages - 1}
        onClick={() => handlePageChange(currentPage + 1)}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
