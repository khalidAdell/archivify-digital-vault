
import { Layout } from "@/components/layout/Layout";
import { FileUploadForm } from "@/components/upload/FileUploadForm";
import { Upload as UploadIcon } from "lucide-react";

const Upload = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <div className="h-12 w-12 rounded-full bg-archive-navy/10 dark:bg-archive-teal/20 flex items-center justify-center mx-auto mb-4">
              <UploadIcon className="h-6 w-6 text-archive-navy dark:text-archive-teal" />
            </div>
            <h1 className="section-title">Upload Document</h1>
            <p className="text-muted-foreground">
              Add new documents to the archive with detailed metadata.
            </p>
          </div>
          
          <div className="archive-card p-6 md:p-8">
            <FileUploadForm />
          </div>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Need help? Check our <a href="#" className="text-archive-teal hover:underline">upload guidelines</a> or <a href="#" className="text-archive-teal hover:underline">contact support</a>.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
