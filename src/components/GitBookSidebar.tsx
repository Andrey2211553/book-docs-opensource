import { useState, useMemo } from "react";
import {
  Book,
  FileText,
  Search,
  ChevronRight,
  Home,
  Folder,
  FolderOpen,
  BookOpen,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SidebarItem {
  id: string;
  title: string;
  icon?: any;
  type: "folder" | "page";
  children?: SidebarItem[];
  isNew?: boolean;
}

const sidebarStructure: SidebarItem[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    type: "folder",
    icon: Home,
    children: [
      { id: "overview", title: "Overview", type: "page" },
      { id: "installation", title: "Installation", type: "page" },
      { id: "quick-start", title: "Quick Start", type: "page", isNew: true },
    ]
  },
  {
    id: "guides",
    title: "Guides",
    type: "folder",
    icon: BookOpen,
    children: [
      { id: "basic-usage", title: "Basic Usage", type: "page" },
      { id: "advanced-features", title: "Advanced Features", type: "page" },
      { id: "best-practices", title: "Best Practices", type: "page" },
      { id: "troubleshooting", title: "Troubleshooting", type: "page" },
    ]
  },
  {
    id: "api",
    title: "API Reference",
    type: "folder",
    icon: FileText,
    children: [
      { id: "authentication", title: "Authentication", type: "page" },
      { id: "endpoints", title: "Endpoints", type: "page" },
      { id: "webhooks", title: "Webhooks", type: "page" },
      { id: "rate-limits", title: "Rate Limits", type: "page" },
    ]
  },
  {
    id: "examples",
    title: "Examples",
    type: "folder",
    icon: Book,
    children: [
      { id: "basic-example", title: "Basic Example", type: "page" },
      { id: "advanced-example", title: "Advanced Example", type: "page" },
    ]
  }
];

function highlight(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "ig");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function filterSidebar(items: SidebarItem[], query: string): SidebarItem[] {
  if (!query) return items;
  const q = query.toLowerCase();
  return items
    .map((item) => {
      if (item.type === "folder" && item.children) {
        const filteredChildren = filterSidebar(item.children, query);
        if (
          item.title.toLowerCase().includes(q) ||
          filteredChildren.length > 0
        ) {
          return { ...item, children: filteredChildren };
        }
        return null;
      }
      if (item.title.toLowerCase().includes(q)) {
        return item;
      }
      return null;
    })
    .filter(Boolean) as SidebarItem[];
}

export function GitBookSidebar({
  activePage,
  onPageChange,
}: {
  activePage?: string;
  onPageChange?: (id: string) => void;
} = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFolders, setExpandedFolders] = useState<string[]>([
    "getting-started",
  ]);
  const [internalActivePage, setInternalActivePage] = useState("overview");

  const currentActivePage = activePage ?? internalActivePage;
  const setActivePage = (id: string) => {
    setInternalActivePage(id);
    onPageChange?.(id);
  };

  const filteredSidebar = useMemo(
    () => filterSidebar(sidebarStructure, searchQuery),
    [searchQuery]
  );

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId)
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId]
    );
  };

  const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
    const isExpanded = expandedFolders.includes(item.id);
    const isActive = currentActivePage === item.id;
    const hasChildren = item.children && item.children.length > 0;

    if (item.type === "folder") {
      return (
        <div key={item.id} className="w-full">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-8 px-2 text-sm font-medium transition-gitbook hover-bg-subtle",
              level > 0 && "ml-4"
            )}
            onClick={() => toggleFolder(item.id)}
            aria-expanded={isExpanded}
            aria-controls={`folder-${item.id}`}
          >
            {isExpanded ? (
              <FolderOpen className="h-4 w-4 mr-2 text-muted-foreground" />
            ) : (
              <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
            )}
            <span className="flex-1 text-left">
              {highlight(item.title, searchQuery)}
            </span>
            <ChevronRight
              className={cn(
                "h-3 w-3 transition-gitbook text-muted-foreground",
                isExpanded && "rotate-90"
              )}
            />
          </Button>
          {hasChildren && (
            <div
              id={`folder-${item.id}`}
              className={cn(
                "overflow-hidden transition-all duration-200",
                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="mt-1 ml-2">
                {item.children?.map((child) =>
                  renderSidebarItem(child, level + 1)
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        className={cn(
          "w-full justify-start h-8 px-2 text-sm transition-gitbook",
          level > 0 && "ml-6",
          isActive
            ? "bg-primary/10 text-primary border-r-2 border-primary"
            : "hover-bg-subtle"
        )}
        onClick={() => setActivePage(item.id)}
      >
        <FileText className="h-3 w-3 mr-2 flex-shrink-0 text-muted-foreground" />
        <span className="flex-1 text-left truncate">
          {highlight(item.title, searchQuery)}
        </span>
        {item.isNew && (
          <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary/20 text-primary rounded">
            New
          </span>
        )}
      </Button>
    );
  };

  return (
    <div className="w-72 h-screen bg-background dark:bg-zinc-900 border-r border-subtle dark:border-zinc-700 flex flex-col fixed left-0 top-0 z-[9999]">
      {/* Header */}
      <div className="p-4 border-b border-subtle dark:border-zinc-700">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 bg-primary rounded">
            <Book className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-semibold">Documentation</h1>
            <p className="text-xs text-muted-foreground">v2.0.1</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-subtle dark:border-zinc-700">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-sm bg-muted/50 border-border/50 focus:border-primary transition-gitbook"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2 bg-background dark:bg-zinc-900">
        <nav className="space-y-1">
          {filteredSidebar.length > 0 ? (
            filteredSidebar.map((item) => renderSidebarItem(item))
          ) : (
            <div className="text-xs text-muted-foreground px-2 py-4">
              No results found.
            </div>
          )}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-subtle dark:border-zinc-700 space-y-1 bg-background dark:bg-zinc-900">
        <Button variant="ghost" className="w-full justify-start h-8 text-sm hover-bg-subtle">
          <HelpCircle className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
          Help & Support
        </Button>
        <Button variant="ghost" className="w-full justify-start h-8 text-sm hover-bg-subtle">
          <Settings className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
          Settings
        </Button>
      </div>
    </div>
  );
}