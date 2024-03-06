import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <>
      <div className="pagination">
        <button
          className="pg__btn"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className="pg__btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </button>

        {/* Display page numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={
                currentPage === pageNumber ? "page__no active" : "page__no"
              }
            >
              {pageNumber}
            </button>
          )
        )}

        <button
          className="pg__btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </button>
        <button
          className="pg__btn"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
      {/* Pagination in Mobile View */}
      <div className="pagination__mobile">
        <button
          className="pg__btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="pg__btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </button>
      </div>
    </>
  );
};

export default Pagination;
