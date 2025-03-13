"use client"

import { useState } from "react";
import { Dialog } from "@headlessui/react";

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilter: (state?: string, id?: number) => void;
}

export default function FilterModal({ isOpen, onClose, onApplyFilter }: FilterModalProps) {

    const [filterState, setFilterState] = useState<string | undefined>();
    const [filterId, setFilterId] = useState<number | undefined>();

    function applyFilters() {
        onApplyFilter(filterState, filterId);
        onClose(); // Fecha a modal após aplicar os filtros
    }

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center bg-[#050505bb] ">
            <div className="bg-white p-4 rounded-xl shadow-lg mx-3 max-w-sm w-full border-[#F6F5F4] border-2">
                <h3 className="text-xl mb-4 text-center ">Filter Orders</h3>

                <div className="Inputs">
                    {/* Dropdown to choose the "state" */}
                    <div className="Dropdown State">
                        <label className="mb-2 text-sm sm:text-base">Order State:</label>
                        <select 
                            className="border-1 border-[#F6F5F4] p-2 w-full mb-4 rounded-md"
                            value={filterState || ""}
                            onChange={(e) => setFilterState(e.target.value || undefined)}
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Input ID */}
                    <div className="Integer ID">
                        <label className="mb-2 mr-2 text-sm sm:text-base">Order ID:</label>
                        <input
                            type="number"
                            className="border-1 border-[#F6F5F4] p-2 w-full mb-4 rounded-md"
                            value={filterId || ""}
                            onChange={(e) => setFilterId(e.target.value ? Number(e.target.value) : undefined)}
                            />
                    </div>

                    {/* Botões */}
                    <div className="flex justify-center items-center gap-6">
                        <button className="px-3 py-1 text-[#050505] rounded-md" onClick={onClose}>Cancel</button>
                        <button className="bg-[#050505] px-3 py-1 text-[#ffffff] rounded-md" onClick={applyFilters}>Apply Filters</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
