"use client";

import { Pagination } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

const AppPagination = ({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}) => {
  return (
    <>
      <Pagination
        count={totalPages / 4}
        className="flex justify-center py-6"
        page={page}
        onChange={(e, value) => setPage(value)}
      />
    </>
  );
};

export default AppPagination;
