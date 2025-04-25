
import { ArchiveItem } from "@/lib/data";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { FileIcon, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface FileCardProps {
  item: ArchiveItem;
}

export function FileCard({ item }: FileCardProps) {
  const getFileIcon = () => {
    switch (item.fileType) {
      case "pdf":
        return (
          <div className="h-6 w-6 rounded bg-red-500 flex items-center justify-center text-white text-xs font-bold">
            PDF
          </div>
        );
      case "docx":
        return (
          <div className="h-6 w-6 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
            DOC
          </div>
        );
      case "jpg":
      case "png":
        return (
          <div className="h-6 w-6 rounded bg-green-500 flex items-center justify-center text-white text-xs font-bold">
            IMG
          </div>
        );
      case "mp3":
        return (
          <div className="h-6 w-6 rounded bg-purple-500 flex items-center justify-center text-white text-xs font-bold">
            MP3
          </div>
        );
      case "mp4":
        return (
          <div className="h-6 w-6 rounded bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
            MP4
          </div>
        );
      default:
        return (
          <div className="h-6 w-6 rounded bg-gray-500 flex items-center justify-center text-white text-xs font-bold">
            FILE
          </div>
        );
    }
  };

  const dateAdded = new Date(item.dateAdded);
  const timeAgo = formatDistanceToNow(dateAdded, { addSuffix: true });

  return (
    <Link to={`/document/${item.id}`} className="file-card block">
      <div className="flex items-start gap-3">
        <div className="document-preview h-14 w-14 flex-shrink-0">
          {getFileIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate">{item.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              {item.category}
            </Badge>
            <span className="text-xs flex items-center text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {timeAgo}
            </span>
            <span className="text-xs text-muted-foreground">{item.fileSize}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
