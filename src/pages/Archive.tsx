
import { Layout } from "@/components/layout/Layout";
import { SearchBar } from "@/components/shared/SearchBar";
import { FileCard } from "@/components/archive/FileCard";
import { FilterBar } from "@/components/archive/FilterBar";
import { mockArchiveItems, filterItems, FileCategory, FileType } from "@/lib/data";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Archive = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearchQuery = searchParams.get("search") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [filteredItems, setFilteredItems] = useState(mockArchiveItems);
  const [activeFilters, setActiveFilters] = useState<{
    search?: string;
    category?: FileCategory;
    fileType?: FileType;
    dateStart?: string;
    dateEnd?: string;
  }>({
    search: initialSearchQuery || undefined
  });

  useEffect(() => {
    // Apply filters whenever activeFilters changes
    const results = filterItems(mockArchiveItems, activeFilters);
    setFilteredItems(results);
  }, [activeFilters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveFilters(prev => ({ ...prev, search: query || undefined }));
  };

  const handleApplyFilters = (filters: {
    category?: FileCategory;
    fileType?: FileType;
    dateStart?: string;
    dateEnd?: string;
  }) => {
    setActiveFilters(prev => ({
      ...filters,
      search: prev.search // Keep the current search query
    }));
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="mb-8">
          <h1 className="section-title">Browse Archive</h1>
          <p className="text-muted-foreground">
            Search and filter through our collection of archived documents.
          </p>
        </div>

        <div className="space-y-6">
          <SearchBar 
            fullWidth 
            placeholder="Search by title, description, or tags..." 
            onSearch={handleSearch}
          />
          
          <FilterBar onApplyFilters={handleApplyFilters} />
          
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {filteredItems.length} {filteredItems.length === 1 ? "Result" : "Results"}
              </h2>
            </div>
            
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredItems.map((item) => (
                  <FileCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No documents found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Archive;
