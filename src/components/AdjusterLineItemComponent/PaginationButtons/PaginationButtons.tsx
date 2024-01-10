import React, { useMemo } from "react";
import { FaEllipsisH } from "react-icons/fa";
import lineItemPaginationStyle from "./lineItemPagination.module.scss";
import clsx from "clsx";
import { DOTS, usePagination } from "./usePagination";

function PaginationButtons({
  pageId,
  totalPage,
  handlePageChange,
}: {
  pageId: number;
  totalPage: any[];
  handlePageChange: (itemId: number) => void;
}) {
  const currentPage = useMemo(() => {
    const pageNumber = totalPage?.findIndex((item) => {
      return item === pageId;
    });
    return pageNumber + 1;
  }, [pageId, totalPage]);

  const totalCount = useMemo(() => totalPage.length, [totalPage]);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount: 2,
    pageSize: 1,
  });

  const PageButton = ({ children, key }: { children: React.ReactNode; key?: string }) => (
    <li className={lineItemPaginationStyle.listItem} key={key}>
      {children}
    </li>
  );

  return (
    <div className={lineItemPaginationStyle.root}>
      <ul className={lineItemPaginationStyle.btnList}>
        <PageButton>
          <button
            disabled={currentPage === 1}
            className={clsx(
              lineItemPaginationStyle.btn,
              lineItemPaginationStyle.prevNextBtn
            )}
            onClick={() => handlePageChange(totalPage[currentPage - 1 - 1])}
          >
            Previous
          </button>
        </PageButton>

        {paginationRange?.map((pageNo: number | string) => {
          if (pageNo === DOTS) {
            return (
              <PageButton key={pageNo}>
                <FaEllipsisH size={24} className={lineItemPaginationStyle.dots} />
              </PageButton>
            );
          }
          return (
            <PageButton key={pageNo.toString()}>
              <button
                className={clsx(lineItemPaginationStyle.btn, {
                  [lineItemPaginationStyle.active]: pageNo === currentPage,
                })}
                onClick={() => handlePageChange(totalPage[+pageNo - 1])}
              >
                {pageNo}
              </button>
            </PageButton>
          );
        })}

        <PageButton>
          <button
            disabled={currentPage == totalCount}
            className={clsx(
              lineItemPaginationStyle.btn,
              lineItemPaginationStyle.prevNextBtn
            )}
            onClick={() => handlePageChange(totalPage[currentPage - 1 + 1])}
          >
            Next
          </button>
        </PageButton>
      </ul>
    </div>
  );
}

export default PaginationButtons;
