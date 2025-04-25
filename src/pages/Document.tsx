
import { Layout } from "@/components/layout/Layout";
import { FilePreview } from "@/components/archive/FilePreview";
import { mockArchiveItems } from "@/lib/data";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Download, ArrowLeft, File } from "lucide-react";
import { format } from "date-fns";
import { useEffect } from "react";

const Document = () => {
  const { id } = useParams<{ id: string }>();
  const document = mockArchiveItems.find((item) => item.id === id);

  useEffect(() => {
    // Scroll to top when document loads
    window.scrollTo(0, 0);
  }, [id]);

  if (!document) {
    return (
      <Layout>
        <div className="page-container flex flex-col items-center justify-center py-12">
          <File className="h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Document Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The document you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/archive">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Archive
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const dateFormatted = format(new Date(document.dateAdded), "MMMM d, yyyy");

  return (
    <Layout>
      <div className="page-container">
        <div className="mb-6">
          <Link 
            to="/archive" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Archive
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">{document.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="archive-card p-6">
              <FilePreview item={document} />
              <div className="flex justify-center mt-6">
                <Button className="w-full md:w-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Download File
                </Button>
              </div>
            </div>

            <div className="archive-card p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground">{document.description}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="archive-card p-6">
              <h2 className="text-lg font-semibold mb-4">Document Details</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                  <dd className="mt-1">
                    <Badge variant="outline">
                      {document.category.charAt(0).toUpperCase() + document.category.slice(1)}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">File Type</dt>
                  <dd className="mt-1">
                    <Badge variant="secondary">
                      {document.fileType.toUpperCase()}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">File Size</dt>
                  <dd className="mt-1">{document.fileSize}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Date Added</dt>
                  <dd className="mt-1 flex items-center">
                    <Calendar className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                    {dateFormatted}
                  </dd>
                </div>
                {document.tags && document.tags.length > 0 && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Tags</dt>
                    <dd className="mt-1">
                      <div className="flex flex-wrap gap-2">
                        {document.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Document;
