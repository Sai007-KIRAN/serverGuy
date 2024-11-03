
import React, { useState, useEffect } from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const [visiblePages, setVisiblePages] = useState(10);

  useEffect(() => {
    const updateVisiblePages = () => {
      if (window.innerWidth < 600) {
        setVisiblePages(5);
      } else if (window.innerWidth < 800) {
        setVisiblePages(7);
      } else {
        setVisiblePages(10);
      }
    };

    window.addEventListener('resize', updateVisiblePages);
    updateVisiblePages();

    return () => {
      window.removeEventListener('resize', updateVisiblePages);
    };
  }, []);

  const setScroll = () => {
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(Math.min(currentPage + 1, totalPages - 1));
      setScroll();
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(Math.max(currentPage - 1, 0));
      setScroll();
    }
  };

  const handlePageChange = (number) => {
    onPageChange(number);
    setScroll();
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);

  return (
    <div className="pagination-container">
      <button
        disabled={currentPage === 0}
        onClick={handlePrevious}
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
        onClick={handleNext}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
