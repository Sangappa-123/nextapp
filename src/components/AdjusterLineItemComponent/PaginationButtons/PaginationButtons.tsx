import React, { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import lineItemPaginationStyle from "./lineItemPagination.module.scss";
import clsx from "clsx";

function PaginationButtons() {
  const [totalPage, setTotalPage] = useState(10);
  const [pageIndex, setPageIndex] = useState(5);
  console.log("lllll", setTotalPage, setPageIndex);
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
              [lineItemPaginationStyle.active]: true,
            })}
          >
            1
          </button>
        </PageButton>
        {pageIndex > 4 && totalPage > 7 && (
          <PageButton>
            <FaEllipsisH size={24} className={lineItemPaginationStyle.dots} />
          </PageButton>
        )}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
          (page: number) =>
            page != 1 &&
            page != totalPage && (
              <PageButton key={"" + page}>
                <button className={lineItemPaginationStyle.btn}>{page}</button>
              </PageButton>
            )
        )}
        {pageIndex < totalPage - 4 && totalPage > 8 && (
          <PageButton>
            <FaEllipsisH size={24} className={lineItemPaginationStyle.dots} />
          </PageButton>
        )}
        <PageButton>
          <button className={lineItemPaginationStyle.btn}>{totalPage}</button>
        </PageButton>
        <PageButton>
          <button
            disabled={pageIndex == totalPage}
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
