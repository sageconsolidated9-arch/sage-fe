// components/table/Table.tsx
import React, { useMemo, useCallback } from "react";
import type { ColumnDef, TableData } from "../types/table";
import { createTableStore } from "../store/tableStore";
import TableHeader from "../components/table/TableHeader";
import TableBody from "../components/table/TableBody";
import TableFooter from "../components/table/TableFooter";

interface TableProps<T extends TableData> {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
  showHeader?: boolean;
  showFooter?: boolean;
  showCheckboxes?: boolean;
  onRowClick?: (item: T) => void;
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  className?: string;
  isLoading?: boolean; // Add this
  skeletonRows?: number; // Add this
  theadBackground?: string;
  theadPaddingY?: string;
}

const Table = <T extends TableData>({
  data,
  columns,
  pageSize = 10,
  showHeader = true,
  showFooter = true,
  showCheckboxes = false,
  onRowClick,
  onSelectionChange,
  className = "",
  isLoading = false, // Default to false
  skeletonRows = 5, // Default to 5 skeleton rows
  theadBackground = "bg-alt",
  theadPaddingY = "py-[9px]",
}: TableProps<T>) => {
  // Memoize the store creation
  const useTableStore = useMemo(
    () => createTableStore<T>({ data, columns, pageSize }),
    // Empty dependency array - store should be created once
    [],
  );

  const {
    setData,
    setColumns,
    setPageSize,
    sortBy,
    sortOrder,
    sortByColumn,
    currentPage,
    setCurrentPage,
    selectedRows,
    toggleRowSelection,
    searchQuery,
    setSearchQuery,
    filters,
    setFilter,
    clearFilters,
  } = useTableStore();

  // Update data when props change - use deep comparison
  React.useEffect(() => {
    const isDataChanged =
      JSON.stringify(data) !== JSON.stringify(useTableStore.getState().data);
    const isColumnsChanged =
      JSON.stringify(columns) !==
      JSON.stringify(useTableStore.getState().columns);

    if (isDataChanged) {
      setData(data);
    }
    if (isColumnsChanged) {
      setColumns(columns);
    }
  }, [data, columns, setData, setColumns]);

  // Update pageSize when prop changes
  React.useEffect(() => {
    setPageSize(pageSize);
  }, [pageSize, setPageSize]);

  // Notify parent of selection changes
  React.useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(Array.from(selectedRows));
    }
  }, [selectedRows, onSelectionChange]);

  // Get filtered and sorted data
  const filteredAndSortedData = useMemo(() => {
    if (isLoading) return []; // Return empty array when loading

    let filtered = [...data];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(query),
        ),
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        filtered = filtered.filter((item) => item[key] === value);
      }
    });

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[sortBy as keyof T];
        const bValue = b[sortBy as keyof T];

        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, searchQuery, filters, sortBy, sortOrder, isLoading]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (isLoading) return []; // Return empty array when loading

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredAndSortedData.slice(startIndex, endIndex);
  }, [filteredAndSortedData, currentPage, pageSize, isLoading]);

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

  // Memoize handlers
  const handleSelectAll = useCallback(() => {
    const allIds = new Set(paginatedData.map((item) => item.id));
    if (paginatedData.every((item) => selectedRows.has(item.id))) {
      // If all are selected, deselect all
      paginatedData.forEach((item) => toggleRowSelection(item.id));
    } else {
      // Select all
      paginatedData.forEach((item) => {
        if (!selectedRows.has(item.id)) {
          toggleRowSelection(item.id);
        }
      });
    }
  }, [paginatedData, selectedRows, toggleRowSelection]);

  return (
    <div className={`flex flex-col ${className}`}>
      {showHeader && (
        <TableHeader<T>
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterChange={setFilter}
          onClearFilters={clearFilters}
          totalItems={filteredAndSortedData.length}
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className={theadBackground}>
            <tr className="w-full">
              {showCheckboxes && (
                <td className="px-4 whitespace-nowrap">
                  {!isLoading && ( // Only show checkbox when not loading
                    <label className="relative inline-flex h-5 w-5 cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={
                          paginatedData.length > 0 &&
                          paginatedData.every((item) =>
                            selectedRows.has(item.id),
                          )
                        }
                        onChange={handleSelectAll}
                      />

                      <span
                        className="h-5 w-5 rounded-[5px] border border-gray-400 bg-white
                       peer-checked:border-primary-900 peer-checked:bg-primary-900"
                      />
                      <svg
                        className="pointer-events-none absolute left-0 top-0 h-5 w-5
                    scale-0 text-white peer-checked:scale-100 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </label>
                  )}
                </td>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  scope="col"
                  className={`px-4 ${theadPaddingY} text-left text-sm text-text-primary font-normal capitalize  whitespace-nowrap ${
                    column.sortable && !isLoading
                      ? "cursor-pointer hover:bg-gray-100"
                      : ""
                  } ${column.className || ""}`}
                  style={{ width: column.width }}
                  onClick={() =>
                    column.sortable &&
                    !isLoading &&
                    sortByColumn(column.key as keyof T)
                  }
                >
                  <div className="flex items-center gap-2 text-sm text-text-primary">
                    {column.header}
                    {!isLoading && column.sortable && sortBy === column.key && (
                      <span className="text-gray-400">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <TableBody<T>
            data={paginatedData}
            columns={columns}
            showCheckboxes={showCheckboxes}
            selectedRows={selectedRows}
            onRowClick={onRowClick}
            onToggleSelection={toggleRowSelection}
            isLoading={isLoading}
            skeletonRows={skeletonRows}
          />
        </table>
      </div>

      {showFooter &&
        !isLoading && ( 
          <TableFooter
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredAndSortedData.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        )}
    </div>
  );
};

export default Table;
