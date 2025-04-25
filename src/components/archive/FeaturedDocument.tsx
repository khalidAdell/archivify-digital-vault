
import { ArchiveItem } from "@/lib/data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, File } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface FeaturedDocumentProps {
  item: ArchiveItem;
}

export function FeaturedDocument({ item }: FeaturedDocumentProps) {
  const dateAdded = new Date(item.dateAdded);
  const timeAgo = formatDistanceToNow(dateAdded, { addSuffix: true });

  return (
    <div className="archive-card overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-muted p-6 flex items-center justify-center">
          <div className="rounded-lg p-4">
            <File className="h-20 w-20 text-archive-navy dark:text-white opacity-70" />
          </div>
        </div>
        <div className="w-full md:w-2/3 p-6">
          <div className="text-sm text-muted-foreground mb-1">Featured Document</div>
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-muted-foreground mb-4">{item.description}</p>
          <div className="text-sm text-muted-foreground mb-4">
            Added {timeAgo} • {item.fileType.toUpperCase()} • {item.fileSize}
          </div>
          <Link to={`/document/${item.id}`}>
            <Button variant="default">
              View Document <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
