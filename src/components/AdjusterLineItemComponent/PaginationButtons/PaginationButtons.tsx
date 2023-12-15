import React, { useState, useMemo } from "react";
import { FaEllipsisH } from "react-icons/fa";
import lineItemPaginationStyle from "./lineItemPagination.module.scss";
import clsx from "clsx";

function PaginationButtons({
  pageNumber,
  totalPages,
}: {
  pageNumber: number;
  totalPages: number;
}) {
  const [pageIndex, setPageIndex] = useState(pageNumber);
  console.log(">>>>>", setPageIndex);
  const PageButton = ({ children, key }: { children: React.ReactNode; key?: string }) => (
    <li className={lineItemPaginationStyle.listItem} key={key}>
      {children}
    </li>
  );

  const pager = useMemo(() => {
    let startPage = 0;
    let endPage = 0;
    if (totalPages <= 6) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (pageIndex <= 4) {
        startPage = 1;
        endPage = 7;
      } else if (pageIndex >= totalPages - 4) {
        startPage = totalPages - 5;
        endPage = totalPages;
      } else {
        startPage = pageIndex - 2;
        endPage = pageIndex + 3;
      }
    }
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return {
      pageIndex: pageIndex,
      startPage: startPage,
      endPage: endPage,
      pages: pages,
    };
  }, [totalPages, pageIndex]);

  console.log("llllll", pager);
  return (
    <div className={lineItemPaginationStyle.root}>
      <ul className={lineItemPaginationStyle.btnList}>
        <PageButton>
          <button
            disabled={pageIndex === 1}
            className={clsx(
              lineItemPaginationStyle.btn,
              lineItemPaginationStyle.prevNextBtn
            )}
          >
            Previous
          </button>
        </PageButton>
        <PageButton>
          <button
            className={clsx(lineItemPaginationStyle.btn, {
              [lineItemPaginationStyle.active]: pageIndex === 1,
            })}
          >
            1
          </button>
        </PageButton>
        {pageIndex > 4 && totalPages > 7 && (
          <PageButton>
            <FaEllipsisH size={24} className={lineItemPaginationStyle.dots} />
          </PageButton>
        )}
        {pageIndex != 1 &&
          pageIndex != totalPages &&
          pager.pages.map(
            (page: number) =>
              page != 1 &&
              page != totalPages && (
                <PageButton key={"" + page}>
                  <button
                    className={clsx(lineItemPaginationStyle.btn, {
                      [lineItemPaginationStyle.active]: page === pageNumber,
                    })}
                  >
                    {page}
                  </button>
                </PageButton>
              )
          )}
        {pageIndex < totalPages - 4 && totalPages > 8 && (
          <PageButton>
            <FaEllipsisH size={24} className={lineItemPaginationStyle.dots} />
          </PageButton>
        )}
        <PageButton>
          <button
            className={clsx(lineItemPaginationStyle.btn, {
              [lineItemPaginationStyle.active]: pageIndex === 10,
            })}
          >
            {totalPages}
          </button>
        </PageButton>
        <PageButton>
          <button
            disabled={pageIndex == totalPages}
            className={clsx(
              lineItemPaginationStyle.btn,
              lineItemPaginationStyle.prevNextBtn
            )}
          >
            Next
          </button>
        </PageButton>
      </ul>
    </div>
  );
}

export default PaginationButtons;
