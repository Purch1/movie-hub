import React from 'react';
import '../css/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Calculate page numbers to display (show 5 pages at a time)
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      <button 
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        &laquo;
      </button>
      <button 
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lsaquo;
      </button>
      
      {pageNumbers.map(number => (
        <button
          key={number}
          className={`pagination-button ${currentPage === number ? 'active' : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      
      <button 
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &rsaquo;
      </button>
      <button 
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;