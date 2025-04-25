
export type FileCategory = 
  | "documents" 
  | "images" 
  | "audio" 
  | "video" 
  | "research" 
  | "historical" 
  | "educational" 
  | "other";

export type FileType = "pdf" | "docx" | "jpg" | "png" | "mp3" | "mp4" | "other";

export interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  fileType: FileType;
  category: FileCategory;
  dateAdded: string;
  tags: string[];
  thumbnail: string;
  fileUrl: string;
  fileSize: string;
  featured?: boolean;
}

// Mock data for our archive
export const mockArchiveItems: ArchiveItem[] = [
  {
    id: "doc-001",
    title: "Annual Research Report 2023",
    description: "Comprehensive analysis of research findings from the past year, including methodology, results, and future directions.",
    fileType: "pdf",
    category: "research",
    dateAdded: "2023-12-15",
    tags: ["research", "annual report", "findings"],
    thumbnail: "/placeholder.svg",
    fileUrl: "#",
    fileSize: "3.2 MB",
    featured: true
  },
  {
    id: "doc-002",
    title: "Historical Photographs Collection",
    description: "A collection of digitized historical photographs from the early 20th century depicting urban development.",
    fileType: "jpg",
    category: "historical",
    dateAdded: "2023-10-22",
    tags: ["photographs", "historical", "urban development"],
    thumbnail: "/placeholder.svg",
    fileUrl: "#",
    fileSize: "45.7 MB",
    featured: true
  },
  {
    id: "doc-003",
    title: "Educational Curriculum Guidelines",
    description: "Framework and guidelines for implementing new educational standards in primary education.",
    fileType: "pdf",
    category: "educational",
    dateAdded: "2023-09-05",
    tags: ["education", "curriculum", "guidelines"],
    thumbnail: "/placeholder.svg",
    fileUrl: "#",
    fileSize: "1.8 MB"
  },
  {
    id: "doc-004",
    title: "Audio Interview with Dr. Jane Smith",
    description: "Recorded interview discussing breakthroughs in medical research and implications for future treatments.",
    fileType: "mp3",
    category: "research",
    dateAdded: "2023-11-12",
    tags: ["interview", "audio", "medical research"],
    thumbnail: "/placeholder.svg",
    fileUrl: "#",
    fileSize: "12.5 MB"
  },
  {
    id: "doc-005",
    title: "Technical Documentation - System Architecture",
    description: "Detailed technical documentation for the current system architecture, including diagrams and specifications.",
    fileType: "pdf",
    category: "documents",
    dateAdded: "2023-08-18",
    tags: ["technical", "documentation", "architecture"],
    thumbnail: "/placeholder.svg",
    fileUrl: "#",
    fileSize: "5.3 MB"
  },
  {
    id: "doc-006",
    title: "Video Presentation - New Product Launch",
    description: "Video recording of the official launch presentation for our newest product line.",
    fileType: "mp4",
    category: "video",
    dateAdded: "2023-07-29",
    tags: ["video", "presentation", "product launch"],
    thumbnail: "/placeholder.svg",
    fileUrl: "#",
    fileSize: "156.2 MB"
  },
  {
    id: "doc-007",
    title: "Quarterly Financial Statements",
    description: "Financial statements for Q3 2023, including balance sheet, income statement, and cash flow analysis.",
    fileType: "pdf",
    category: "documents",
    dateAdded: "2023-10-05",
    tags: ["financial", "quarterly", "statements"],
    thumbnail: "/placeholder.svg",
    fileUrl: "#",
    fileSize: "2.1 MB"
  },
  {
    id: "doc-008",
    title: "Project Proposal - Green Initiative",
    description: "Detailed proposal for implementing sustainable practices across all departments.",
    fileType: "docx",
    category: "documents",
    dateAdded: "2023-09-22",
    tags: ["proposal", "sustainability", "initiative"],
    thumbnail: "/placeholder.svg",
    fileUrl: "#",
    fileSize: "1.5 MB"
  }
];

// Categories for filtering
export const categories: { value: FileCategory; label: string }[] = [
  { value: "documents", label: "Documents" },
  { value: "images", label: "Images" },
  { value: "audio", label: "Audio" },
  { value: "video", label: "Video" },
  { value: "research", label: "Research" },
  { value: "historical", label: "Historical" },
  { value: "educational", label: "Educational" },
  { value: "other", label: "Other" }
];

// File types for filtering
export const fileTypes: { value: FileType; label: string }[] = [
  { value: "pdf", label: "PDF" },
  { value: "docx", label: "Word Document" },
  { value: "jpg", label: "JPEG Image" },
  { value: "png", label: "PNG Image" },
  { value: "mp3", label: "MP3 Audio" },
  { value: "mp4", label: "MP4 Video" },
  { value: "other", label: "Other" }
];

// Helper function to filter items
export const filterItems = (
  items: ArchiveItem[],
  filters: {
    search?: string;
    category?: FileCategory;
    fileType?: FileType;
    dateStart?: string;
    dateEnd?: string;
  }
): ArchiveItem[] => {
  return items.filter(item => {
    // Search filter
    if (
      filters.search &&
      !item.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !item.description.toLowerCase().includes(filters.search.toLowerCase()) &&
      !item.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
    ) {
      return false;
    }

    // Category filter
    if (filters.category && item.category !== filters.category) {
      return false;
    }

    // File type filter
    if (filters.fileType && item.fileType !== filters.fileType) {
      return false;
    }

    // Date range filter
    if (filters.dateStart && new Date(item.dateAdded) < new Date(filters.dateStart)) {
      return false;
    }

    if (filters.dateEnd && new Date(item.dateAdded) > new Date(filters.dateEnd)) {
      return false;
    }

    return true;
  });
};
