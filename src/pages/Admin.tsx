
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { mockArchiveItems, ArchiveItem } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Download, Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<ArchiveItem[]>(mockArchiveItems);
  
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDeleteItem = (id: string) => {
    // Filter out the deleted item
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    
    toast({
      title: "Document deleted",
      description: "The document has been successfully removed from the archive.",
    });
  };
  
  const getFileTypeBadgeColor = (fileType: string): string => {
    switch (fileType) {
      case "pdf": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "docx": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "jpg": 
      case "png": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "mp3": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "mp4": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800/60 dark:text-gray-300";
    }
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="mb-8">
          <h1 className="section-title">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your archived documents and monitor system activity.
          </p>
        </div>
        
        <div className="archive-card p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Link to="/upload">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Document
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Document</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div className="truncate max-w-[250px]" title={item.title}>
                          {item.title}
                        </div>
                        <div className="text-xs text-muted-foreground truncate max-w-[250px]" title={item.description}>
                          {item.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getFileTypeBadgeColor(item.fileType)} variant="secondary">
                          {item.fileType.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {format(new Date(item.dateAdded), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>{item.fileSize}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" aria-label="Download">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            aria-label="Delete"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No documents found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="archive-card p-6">
            <h2 className="text-lg font-semibold mb-3">Storage Usage</h2>
            <div className="h-2 bg-muted rounded-full mb-2">
              <div className="h-2 bg-archive-navy dark:bg-archive-teal rounded-full w-[35%]"></div>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">35%</span> of your storage used (3.5 GB of 10 GB)
            </p>
          </div>
          
          <div className="archive-card p-6">
            <h2 className="text-lg font-semibold mb-3">Documents</h2>
            <p className="text-3xl font-bold text-archive-navy dark:text-archive-teal">
              {items.length}
            </p>
            <p className="text-sm text-muted-foreground">Total documents in archive</p>
          </div>
          
          <div className="archive-card p-6">
            <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                <span className="text-foreground font-medium">New document</span> uploaded 2 hours ago
              </li>
              <li className="text-muted-foreground">
                <span className="text-foreground font-medium">Research Report</span> viewed 4 hours ago
              </li>
              <li className="text-muted-foreground">
                <span className="text-foreground font-medium">Financial Statement</span> downloaded yesterday
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
