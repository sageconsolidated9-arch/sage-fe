// components/modals/SearchModal.tsx
import { motion, AnimatePresence } from "motion/react";
import {
  ActionIcon,
  ArrowUpRightIcon,
  FilterSearchIcon,
  SearchIcon,
} from "../../../utils/icons";

interface SearchResult {
  id: number;
  title: string;
  category: string;
  description: string;
  type: "section" | "action";
  icon?: string;
}

const SearchModal = ({
  isOpen,
  position,
  onClose,
  searchQuery,
}: {
  isOpen: boolean;
  position: { top: number; left: number } | null;
  onClose: () => void;
  searchQuery: string;
}) => {
  // Mock search results based on your image
  const searchResults: SearchResult[] = [
    {
      id: 1,
      title: "Playbook lists",
      category: "Sections",
      description: "View and manage all playbook lists",
      type: "section",
    },
    {
      id: 2,
      title: "Playbook lists",
      category: "Sections",
      description: "Another playbook list section",
      type: "section",
    },
    {
      id: 3,
      title: "Create Playbook",
      category: "Actions",
      description: "Create a new playbook from templates",
      type: "action",
    },
    {
      id: 4,
      title: "Modify Playbook",
      category: "Actions",
      description: "Edit existing playbooks",
      type: "action",
    },
  ];

  // Filter results based on search query
  const filteredResults = searchQuery
    ? searchResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          result.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchResults;

  // Group results by category
  const groupedResults = filteredResults.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  if (!isOpen || !position) {
    return null;
  }

  return (
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-transparent z-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Search Modal */}
        <motion.div
          className="fixed z-100 bg-white rounded-2xl shadow-top-search w-[600px] lg:w-[843px] max-h-[313px] overflow-y-auto"
          style={{
            top: `${position.top + 10}px`,
            left: `${position.left + 180}px`,
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-[27px] py-[18.3px] text-text-secondary leading-[100%] tracking-[2%]">
            {/* Search Header */}
            <div className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <h3 className="lead">Search Results</h3>
              </div>
            </div>

            {/* Search Results */}
            {filteredResults.length > 0 ? (
              <div className="space-y-4 mt-4">
                {Object.entries(groupedResults).map(([category, results]) => (
                  <div key={category}>
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-3">
                      <p
                        className={`capitalize ${
                          category !== "section" && "mt-2"
                        }`}
                      >
                        {category}
                      </p>
                    </div>

                    {/* Results List */}
                    <div className="space-y-4">
                      {results.map((result) => (
                        <div key={result.id} className="">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <div>
                                  {result.type === "section" ? (
                                    <FilterSearchIcon className="text-[#1f1f1f]" />
                                  ) : (
                                    <ActionIcon className="text-[#1f1f1f]" />
                                  )}
                                </div>
                                <h5 className="">{result.title}</h5>
                              </div>
                            </div>
                            <button className=" text-primary rounded-lg hover:text-primary-hover transition-colors flex items-center gap-2 cursor-pointer">
                              <ArrowUpRightIcon />
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  No results found
                </h4>
                <p className="text-gray-600">No matches for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};

export default SearchModal;
