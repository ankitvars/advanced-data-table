import { Box, Button } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import React, { useMemo, useState } from "react";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported
import sampleData from "./sample.json";
import SlideOver from "./SlideOver"; // Import the SlideOver component
import moment from "moment"; // Import moment

const AdvancedDataTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  // Filter states
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState([0, 100]);
  const [dateRange, setDateRange] = useState([null, null]);

  const data = useMemo(() => {
    return sampleData
      .filter((item) => item.name.includes(nameFilter))
      .filter((item) =>
        categoryFilter ? item.category === categoryFilter : true
      )
      .filter((item) =>
        subcategoryFilter ? item.subcategory === subcategoryFilter : true
      )
      .filter(
        (item) => item.price >= priceFilter[0] && item.price <= priceFilter[1]
      )
      .filter((item) => {
        if (!dateRange[0] || !dateRange[1]) return true;
        const itemDate = moment(item.createdAt, "YYYY-MM-DD");
        return itemDate.isBetween(
          moment(dateRange[0], "YYYY-MM-DD"),
          moment(dateRange[1], "YYYY-MM-DD"),
          null,
          "[]"
        );
      });
  }, [nameFilter, categoryFilter, subcategoryFilter, priceFilter, dateRange]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "subcategory",
        header: "Subcategory",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        Cell: ({ cell }) => moment(cell.getValue()).format("DD-MMM-YY"),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        Cell: ({ cell }) => moment(cell.getValue()).format("DD-MMM-YY"),
      },
      {
        accessorKey: "price",
        header: "Price",
      },
      {
        accessorKey: "sale_price",
        header: "Sale Price",
      },
    ],
    []
  );

  const handleRowClick = (row) => {
    setSelectedRow(row.original);
    setIsSlideOverOpen(true);
  };

  const handleApplyFilters = (filters) => {
    setNameFilter(filters.name);
    setCategoryFilter(filters.category);
    setSubcategoryFilter(filters.subcategory);
    setPriceFilter(filters.price);
    setDateRange(filters.dateRange);
  };

  const handleClearFilters = () => {
    setNameFilter("");
    setCategoryFilter("");
    setSubcategoryFilter("");
    setPriceFilter([0, 100]);
    setDateRange([null, null]);
  };

  const appliedFiltersCount = [
    nameFilter && "Name",
    categoryFilter && "Category",
    subcategoryFilter && "Subcategory",
    (priceFilter[0] !== 0 || priceFilter[1] !== 100) && "Price",
    (dateRange[0] || dateRange[1]) && "Date Range",
  ].filter(Boolean).length;

  return (
    <Box className="mt-6 border border-gray-300 rounded bg-white p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Applied Filters ({appliedFiltersCount})
          </span>
          <Button
            onClick={handleClearFilters}
            className="text-blue-500 hover:text-blue-700"
          >
            Clear Filters
          </Button>
        </div>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          {nameFilter && <li>Name: {nameFilter}</li>}
          {categoryFilter && <li>Category: {categoryFilter}</li>}
          {subcategoryFilter && <li>Subcategory: {subcategoryFilter}</li>}
          {(priceFilter[0] !== 0 || priceFilter[1] !== 100) && (
            <li>
              Price Range: ${priceFilter[0]} - ${priceFilter[1]}
            </li>
          )}
          {(dateRange[0] || dateRange[1]) && (
            <li>
              Date Range: {moment(dateRange[0]).format("DD-MMM-YY")} to{" "}
              {moment(dateRange[1]).format("DD-MMM-YY")}
            </li>
          )}
        </ul>
      </div>

      <MaterialReactTable
        columns={columns}
        data={data}
        onRowClick={handleRowClick}
        initialState={{
          pagination: { pageIndex: 0, pageSize: 10 },
        }}
        muiTableHeadProps={{
          sx: {
            borderBottom: "2px solid #e5e7eb", // Add border only to the header
          },
        }}
        muiTableBodyRowProps={{
          sx: {
            borderBottom: "none", // Remove border from data rows
          },
        }}
        muiTablePaginationProps={{
          className: "flex justify-center", // Centering pagination
        }}
      />

      <SlideOver
        selectedRow={selectedRow}
        open={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </Box>
  );
};

export default AdvancedDataTable;
