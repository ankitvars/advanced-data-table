import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const SlideOver = ({ selectedRow, onClose, open, onApplyFilters }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState([0, 100]);
  const [dateRange, setDateRange] = useState([null, null]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setNameFilter("");
      setCategoryFilter("");
      setSubcategoryFilter("");
      setPriceFilter([0, 100]);
      setDateRange([null, null]);
    }
  }, [open]);

  const handleApplyFilters = () => {
    onApplyFilters({
      name: nameFilter,
      category: categoryFilter,
      subcategory: subcategoryFilter,
      price: priceFilter,
      dateRange,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out bg-white shadow-xl"
            >
              <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="relative rounded-md text-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                >
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col h-full py-6">
                <div className="px-2.5 sm:px-6">
                  <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                    Filter Options
                  </DialogTitle>
                </div>
                <div className="relative mt-6 flex-1 px-2.5 sm:px-6">
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-300 border-2 shadow-xs px-2.5 py-1 focus:border-blue-500 focus:ring-blue-500 sm:text-base"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category
                      </label>
                      <input
                        id="category"
                        type="text"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-300 border-2 shadow-xs px-2.5 py-1 focus:border-blue-500 focus:ring-blue-500 sm:text-base"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subcategory"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Subcategory
                      </label>
                      <input
                        id="subcategory"
                        type="text"
                        value={subcategoryFilter}
                        onChange={(e) => setSubcategoryFilter(e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-300 border-2 shadow-xs px-2.5 py-1 focus:border-blue-500 focus:ring-blue-500 sm:text-base"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price Range
                      </label>
                      <div className="flex space-x-2">
                        <input
                          id="price-min"
                          type="number"
                          value={priceFilter[0]}
                          onChange={(e) =>
                            setPriceFilter([
                              parseFloat(e.target.value) || 0,
                              priceFilter[1],
                            ])
                          }
                          className="w-1/2 rounded-lg border-gray-300 border-2 shadow-xs px-2.5 py-1 focus:border-blue-500 focus:ring-blue-500 sm:text-base"
                          placeholder="Min"
                        />
                        <input
                          id="price-max"
                          type="number"
                          value={priceFilter[1]}
                          onChange={(e) =>
                            setPriceFilter([
                              priceFilter[0],
                              parseFloat(e.target.value) || 100,
                            ])
                          }
                          className="w-1/2 rounded-lg border-gray-300 border-2 shadow-xs px-2.5 py-1 focus:border-blue-500 focus:ring-blue-500 sm:text-base"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="date-range"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date Range
                      </label>
                      <div className="flex space-x-2">
                        <input
                          id="date-start"
                          type="date"
                          value={dateRange[0] || ""}
                          onChange={(e) =>
                            setDateRange([e.target.value, dateRange[1]])
                          }
                          className="w-1/2 rounded-lg border-gray-300 border-2 shadow-xs px-2.5 py-1 focus:border-blue-500 focus:ring-blue-500 sm:text-base"
                        />
                        <input
                          id="date-end"
                          type="date"
                          value={dateRange[1] || ""}
                          onChange={(e) =>
                            setDateRange([dateRange[0], e.target.value])
                          }
                          className="w-1/2 rounded-lg border-gray-300 border-2 shadow-xs px-2.5 py-1 focus:border-blue-500 focus:ring-blue-500 sm:text-base"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="px-2.5 py-3 sm:px-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleApplyFilters}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-2.5 py-1 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SlideOver;
