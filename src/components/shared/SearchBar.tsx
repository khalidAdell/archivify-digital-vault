
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  placeholder?: string;
  fullWidth?: boolean;
  onSearch?: (query: string) => void;
}

export function SearchBar({ 
  placeholder = "Search the archive...", 
  fullWidth = false,
  onSearch 
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(query);
    } else {
      // Default behavior: navigate to archive with search query
      navigate(`/archive?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${fullWidth ? 'w-full' : 'max-w-md'}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          className="pl-10 pr-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button 
          type="submit" 
          size="sm" 
          variant="ghost" 
          className="absolute right-0 top-0 h-full px-3"
        >
          <span className="sr-only">Search</span>
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
