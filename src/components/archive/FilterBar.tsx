
import { useState } from "react";
import { FileCategory, FileType, categories, fileTypes } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, X } from "lucide-react";

interface FilterBarProps {
  onApplyFilters: (filters: {
    category?: FileCategory;
    fileType?: FileType;
    dateStart?: string;
    dateEnd?: string;
  }) => void;
}

export function FilterBar({ onApplyFilters }: FilterBarProps) {
  const [category, setCategory] = useState<FileCategory | undefined>(undefined);
  const [fileType, setFileType] = useState<FileType | undefined>(undefined);
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleApplyFilters = () => {
    onApplyFilters({
      category,
      fileType,
      dateStart: dateStart || undefined,
      dateEnd: dateEnd || undefined
    });
  };

  const handleResetFilters = () => {
    setCategory(undefined);
    setFileType(undefined);
    setDateStart("");
    setDateEnd("");
    onApplyFilters({});
  };

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={toggleFilters}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/40 rounded-md animate-fade-in">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={category} onValueChange={(value) => setCategory(value as FileCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">File Type</label>
            <Select value={fileType} onValueChange={(value) => setFileType(value as FileType)}>
              <SelectTrigger>
                <SelectValue placeholder="All file types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All file types</SelectItem>
                {fileTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">From Date</label>
            <Input
              type="date"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">To Date</label>
            <Input
              type="date"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
            />
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={handleResetFilters}>
              <X className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </div>
        </div>
      )}
    </div>
  );
}
