
import { ArchiveItem } from "@/lib/data";
import { File, FileText, Image, Music, Video } from "lucide-react";

interface FilePreviewProps {
  item: ArchiveItem;
}

export function FilePreview({ item }: FilePreviewProps) {
  const renderPreview = () => {
    switch (item.fileType) {
      case "pdf":
        return (
          <div className="bg-muted rounded-md border p-10 flex flex-col items-center justify-center">
            <FileText className="h-20 w-20 text-red-500 mb-4" />
            <p className="text-muted-foreground">PDF Document Preview</p>
            <p className="text-sm text-muted-foreground mt-2">Click to open full view</p>
          </div>
        );
      case "docx":
        return (
          <div className="bg-muted rounded-md border p-10 flex flex-col items-center justify-center">
            <FileText className="h-20 w-20 text-blue-500 mb-4" />
            <p className="text-muted-foreground">Word Document Preview</p>
            <p className="text-sm text-muted-foreground mt-2">Click to open full view</p>
          </div>
        );
      case "jpg":
      case "png":
        return (
          <div className="bg-muted rounded-md border p-10 flex flex-col items-center justify-center">
            <Image className="h-20 w-20 text-green-500 mb-4" />
            <p className="text-muted-foreground">Image Preview</p>
            <p className="text-sm text-muted-foreground mt-2">Click to open full view</p>
          </div>
        );
      case "mp3":
        return (
          <div className="bg-muted rounded-md border p-10 flex flex-col items-center justify-center">
            <Music className="h-20 w-20 text-purple-500 mb-4" />
            <p className="text-muted-foreground">Audio File</p>
            <p className="text-sm text-muted-foreground mt-2">Click to open full view</p>
          </div>
        );
      case "mp4":
        return (
          <div className="bg-muted rounded-md border p-10 flex flex-col items-center justify-center">
            <Video className="h-20 w-20 text-indigo-500 mb-4" />
            <p className="text-muted-foreground">Video File</p>
            <p className="text-sm text-muted-foreground mt-2">Click to open full view</p>
          </div>
        );
      default:
        return (
          <div className="bg-muted rounded-md border p-10 flex flex-col items-center justify-center">
            <File className="h-20 w-20 text-gray-500 mb-4" />
            <p className="text-muted-foreground">File Preview</p>
            <p className="text-sm text-muted-foreground mt-2">Click to open full view</p>
          </div>
        );
    }
  };

  return <div className="w-full">{renderPreview()}</div>;
}
