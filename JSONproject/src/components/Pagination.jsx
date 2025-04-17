"use client"
import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import '../css/Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max to show
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if at the beginning
      if (currentPage <= 2) {
        end = 4;
      }
      
      // Adjust if at the end
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push("...");
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="pagination-container">
      <button 
        className="pagination-button icon-button" 
        onClick={handlePrevious} 
        disabled={currentPage === 1}
      >
        <ChevronLeft className="icon" />
        <span className="sr-only">Previous page</span>
      </button>
      
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="ellipsis">
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            className={`pagination-button ${currentPage === page ? "active" : ""}`}
            onClick={() => typeof page === "number" && onPageChange(page)}
          >
            {page}
          </button>
        )
      )}
      
      <button 
        className="pagination-button icon-button" 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="icon" />
        <span className="sr-only">Next page</span>
      </button>
    </div>
  );
}

export default Pagination;