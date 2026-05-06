// src/hooks/usePagination.js

import { useMemo, useState } from "react";

/*
  Reusable pagination hook
*/

const usePagination = (data = [], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  /*
    Total pages
  */

  const totalPages = Math.ceil(data.length / itemsPerPage);

  /*
    Paginated data
  */

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    const end = start + itemsPerPage;

    return data.slice(start, end);
  }, [currentPage, data, itemsPerPage]);

  return {
    currentPage,

    setCurrentPage,

    totalPages,

    paginatedData,
  };
};

export default usePagination;