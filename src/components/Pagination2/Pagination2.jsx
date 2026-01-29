import { useState } from "react";
import "./styles.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export const Pagination2 = ({ total, currentPage, setCurrentPage }) => {
  // const [currentPage, setCurrentPage] = useState(1);

  const changeActivePage = (page) => {
    setCurrentPage(page);
  };
  console.log(currentPage);

  const showNextPage = () => {
    if (currentPage < total) {
      setCurrentPage(currentPage + 1);
    }
  };

  const showPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getPagesNumbers = () => {
    const visiblePages = [];
    const maxVisiblePages = 5;

    const addToArray = (a, b) => {
      for (let i = a; i <= b; i++) {
        visiblePages.push(i);
      }
      return visiblePages;
    };

    if (total <= maxVisiblePages) {
      addToArray(1, total);
    } else {
      if (currentPage >= 1 && currentPage <= 4) {
        addToArray(1, maxVisiblePages);
        visiblePages.push("...", total);
      }
      if (currentPage >= maxVisiblePages && currentPage <= total - 4) {
        visiblePages.push(1, "...");

        addToArray(currentPage - 1, currentPage + 1);
        visiblePages.push("...", total);
      }

      if (currentPage > total - 4) {
        visiblePages.push(1, "...");
        addToArray(total - 4, total);
      }
    }

    return visiblePages;
  };

  const pages = getPagesNumbers();

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={showPreviousPage}
        className="page-switch previous"
      >
        <IoIosArrowBack />
      </button>
      {pages.map((elem) =>
        elem !== "..." ? (
          <button
            onClick={() => changeActivePage(elem)}
            className={`pagination-item ${
              currentPage === elem ? "active-pagination-item" : ""
            }`}
          >
            {elem}
          </button>
        ) : (
          <span className="pagination-dots">{elem}</span>
        )
      )}
      <button
        disabled={currentPage === total}
        onClick={showNextPage}
        className="page-switch next"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};
