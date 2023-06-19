import React from 'react';
import { useAppContext } from '../context/appContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  // Modify the pages array to display a maximum of 7 pages and add ellipsis
  let displayedPages = pages;

  if (numOfPages > 7) {
    const maxPages = 7;
    const ellipsis = '...';

    if (page > maxPages - 3)
    /*if (page > maxPages - 3) checks if the current page (page)
     is greater than maxPages - 3. This condition is used to 
     determine if the displayed pages should include
     an ellipsis and a subset of pages closer to the current page. */
    
    {
      displayedPages = [1, ellipsis, ...pages.slice
        (page - (maxPages - 4), page + 1)];

/* If the condition is true, the displayedPages array is updated
 as follows:
The first page (1) is added to the beginning of the array.
The ellipsis string is added next.
A portion of the pages array is sliced using the slice method. 
The slice starts from the index page - (maxPages - 4) 
(to include some preceding pages) and ends at page + 1 
(to include the current page). The spread operator (...) 
is used to concatenate these sliced pages with the existing array.*/
    } else if (page < maxPages - 3) {
      displayedPages = [...pages.slice(0, maxPages - 1), 
        ellipsis, numOfPages];
    }
  }
  /* If the first condition is false, the second condition else if
   (page < maxPages - 3) is checked. This condition is used to 
   determine if the displayed pages should include an ellipsis 
   and a subset of pages closer to the last page.

If the second condition is true, the displayedPages array is
 updated as follows:

A portion of the pages array is sliced using the slice method. 
The slice starts from the index 0 and ends at maxPages - 1 
(excluding the last page). This portion represents the initial 
pages to be displayed. The ellipsis string is added next.
The last page number (numOfPages) is added to the end of the array.*/

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };
/* nextPage increments the current page (page) by 1. If the new page
 exceeds the total number of pages (numOfPages), it wraps around 
 to the first page.*/  

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };
/* prevPage decrements the current page by 1. If the new page
 becomes less than 1, it wraps around to the last page.*/
  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {displayedPages.map((pageNumber, index) => (
          <button
            type='button'
            className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
            key={pageNumber}
            onClick={() => changePage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button className='prev-btn' onClick={nextPage}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;