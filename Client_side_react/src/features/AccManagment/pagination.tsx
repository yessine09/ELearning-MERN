import clsx from 'clsx';
const NUMBER_OF_PAGES = 3;
const NUMBER_OF_PAGES_HALF = Math.ceil(NUMBER_OF_PAGES / 2);

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({ currentPage, totalPages, onPageChange, className }: PaginationProps) => {
  const pages = [];
  if (totalPages <= NUMBER_OF_PAGES) {
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }
  } else {
    let leftSide = Math.ceil(NUMBER_OF_PAGES / 2);
    let rightSide = NUMBER_OF_PAGES - leftSide;

    if (currentPage > totalPages - Math.trunc(NUMBER_OF_PAGES / 2)) {
      rightSide = totalPages - currentPage;
      leftSide = NUMBER_OF_PAGES - rightSide;
    } else if (currentPage < leftSide) {
      leftSide = currentPage;
      rightSide = NUMBER_OF_PAGES - leftSide;
    }
    for (let i = leftSide - 1; i >= 0; i -= 1) {
      pages.push(currentPage - i);
    }
    for (let i = 1; i <= rightSide; i += 1) {
      pages.push(currentPage + i);
    }
  }

  const renderPage = (page: number) => {
    function onClick() {
      if (page !== currentPage) {
        onPageChange(page);
      }
    }
    return (
      <div
        className={clsx(
          currentPage === page
            ? 'z-10 bg-[#D4F1F4] border-[#189] text-darkBlue relative inline-flex items-center px-4 py-2 border text-sm font-medium'
            : 'bg-white border-gray-300 text-darkBlue hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium',
        )}
        onClick={onClick}
        key={page}
      >
        {page}
      </div>
    );
  };

  const RenderArrow = (direction: 'left' | 'right') => {
    function onClick() {
      if ((currentPage !== 1 && direction === 'left') || (currentPage !== totalPages && direction === 'right')) {
        const nextPage = direction === 'left' ? currentPage - 1 : currentPage + 1;
        onPageChange(nextPage);
      }
    }

    const arrow =
      direction === 'left' ? (
        <svg
          width="9"
          fill="currentColor"
          height="8"
          className=""
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" />
        </svg>
      ) : (
        <svg
          width="9"
          fill="currentColor"
          height="8"
          className=""
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" />
        </svg>
      );

    return (
      <button
        className={clsx(
          'p-4 text-base text-gray-600 bg-white hover:bg-lightBlue',
          direction === 'left' ? 'border  rounded-l-xl' : 'border-t border-b border-r  rounded-r-xl',
        )}
        onClick={onClick}
      >
        {arrow}
      </button>
    );
  };

  return (
    <div className={clsx('relative z-0 inline-flex rounded-md shadow-sm -space-x-px', className)}>
      {totalPages > 1 && RenderArrow('left')}
      {totalPages > NUMBER_OF_PAGES && currentPage > NUMBER_OF_PAGES_HALF && (
        <>
          {renderPage(1)}
          {currentPage !== NUMBER_OF_PAGES && <div>...</div>}
        </>
      )}
      {pages.map(renderPage)}
      {totalPages > NUMBER_OF_PAGES && currentPage < totalPages - (NUMBER_OF_PAGES - NUMBER_OF_PAGES_HALF) && (
        <>
          {currentPage !== totalPages - NUMBER_OF_PAGES + 1 && <div>...</div>}
          {renderPage(totalPages)}
        </>
      )}
      {totalPages > 1 && RenderArrow('right')}
    </div>
  );
};

export default Pagination;
