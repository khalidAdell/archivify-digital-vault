
import { Layout } from "@/components/layout/Layout";
import { SearchBar } from "@/components/shared/SearchBar";
import { FileCard } from "@/components/archive/FileCard";
import { FeaturedDocument } from "@/components/archive/FeaturedDocument";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, File, Upload } from "lucide-react";
import { mockArchiveItems } from "@/lib/data";

const Home = () => {
  // Find featured items
  const featuredItems = mockArchiveItems.filter((item) => item.featured);
  
  // Get recent items
  const recentItems = [...mockArchiveItems]
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, 3);

  return (
    <Layout>
      <section className="bg-gradient-to-b from-background to-muted/30 py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Your Modern Digital Archive Platform
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Store, organize, and access all your important documents and files in one secure place.
                Easily search, filter, and share your digital content.
              </p>
              <div className="space-y-4 mt-8">
                <SearchBar fullWidth />
                <div className="flex flex-wrap gap-3">
                  <Link to="/archive">
                    <Button>
                      Browse Archive
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/upload">
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Documents
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <div className="absolute top-0 left-0 w-40 h-40 bg-archive-teal/20 rounded-full filter blur-3xl opacity-30 animate-pulse" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-archive-navy/20 rounded-full filter blur-3xl opacity-30 animate-pulse delay-300" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-archive-gold/20 rounded-full filter blur-3xl opacity-30 animate-pulse delay-700" />
                <div className="relative bg-background p-6 rounded-xl shadow-lg border">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-semibold">Digital Archive</div>
                    <File className="h-5 w-5" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-muted rounded-full w-3/4" />
                    <div className="h-2 bg-muted rounded-full w-full" />
                    <div className="h-2 bg-muted rounded-full w-2/3" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-6">
                    <div className="flex items-center justify-center aspect-square bg-archive-navy/10 rounded-md">
                      <div className="h-6 w-6 rounded bg-archive-navy/20" />
                    </div>
                    <div className="flex items-center justify-center aspect-square bg-archive-teal/10 rounded-md">
                      <div className="h-6 w-6 rounded bg-archive-teal/20" />
                    </div>
                    <div className="flex items-center justify-center aspect-square bg-archive-gold/10 rounded-md">
                      <div className="h-6 w-6 rounded bg-archive-gold/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Documents</h2>
          {featuredItems.length > 0 && (
            <div className="grid gap-6">
              {featuredItems.map((item) => (
                <FeaturedDocument key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Recently Added</h2>
            <Link to="/archive" className="text-sm text-archive-teal hover:underline flex items-center">
              View all <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentItems.map((item) => (
              <FileCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-archive-navy/10 dark:bg-archive-navy/20 p-4">
              <Upload className="h-6 w-6 text-archive-navy dark:text-archive-teal" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Start Archiving Today</h2>
            <p className="text-muted-foreground max-w-[600px]">
              Begin organizing your digital content in a structured, searchable archive.
              Upload documents, images, audio files, videos, and more.
            </p>
            <Link to="/upload">
              <Button size="lg" className="mt-4">
                Upload Your First Document
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
