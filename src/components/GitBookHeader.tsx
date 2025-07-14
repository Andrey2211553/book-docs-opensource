import { Sun, Moon, Github, Menu, Share, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GitBookHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-subtle">
      <div className="flex items-center justify-between px-4 py-2 h-12">
        {/* Mobile menu button */}
        <Button variant="ghost" size="sm" className="md:hidden h-8 w-8 p-0">
          <Menu className="h-4 w-4" />
        </Button>

        {/* Empty center for spacing */}
        <div className="flex-1"></div>

        {/* Right actions - GitBook style */}
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs hover-bg-subtle">
            <Edit className="h-3.5 w-3.5 mr-1.5" />
            Edit
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs hover-bg-subtle">
            <Share className="h-3.5 w-3.5 mr-1.5" />
            Share
          </Button>
          <div className="h-4 w-px bg-border mx-1"></div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover-bg-subtle">
            <Github className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover-bg-subtle">
            <Sun className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </header>
  );
}