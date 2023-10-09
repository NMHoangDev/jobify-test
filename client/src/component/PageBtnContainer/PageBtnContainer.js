import React from "react";
import { useAppContext } from "../../context/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function PageBtnContainer() {
  const { numOfPages, page, changePage } = useAppContext();
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };
  const pages = Array.from(
    {
      length: numOfPages,
    },
    (_, index) => {
      return index + 1;
    }
  );

  return (
    <div className="wrapper">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              aria-label="Previous"
              onClick={prevPage}
              style={{ cursor: "pointer" }}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pages.map((pageNumber, index) => {
            return (
              <li className="page-item" key={index}>
                <a
                  className="page-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => changePage(pageNumber)}
                >
                  {pageNumber}
                </a>
              </li>
            );
          })}

          <li className="page-item">
            <a
              className="page-link"
              onClick={nextPage}
              style={{ cursor: "pointer" }}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PageBtnContainer;
