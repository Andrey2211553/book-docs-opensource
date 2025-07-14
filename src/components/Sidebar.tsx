import { useState, useMemo } from "react";
import { Book, FileText, Search, Settings, ChevronRight, Home, Layers, Zap, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SidebarItem {
  id: string;
  title: string;
  icon: any;
  badge?: string;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    id: "home",
    title: "Getting Started",
    icon: Home,
    children: [
      { id: "intro", title: "Introduction", icon: FileText },
      { id: "quickstart", title: "Quick Start", icon: Zap, badge: "New" },
      { id: "installation", title: "Installation", icon: Settings },
    ]
  },
  {
    id: "guide",
    title: "User Guide",
    icon: Book,
    children: [
      { id: "basics", title: "Basics", icon: FileText },
      { id: "advanced", title: "Advanced Features", icon: Layers },
      { id: "customization", title: "Customization", icon: Target },
    ]
  },
  {
    id: "api",
    title: "API Reference",
    icon: FileText,
    children: [
      { id: "auth", title: "Authentication", icon: Users },
      { id: "endpoints", title: "Endpoints", icon: Layers },
    ]
  }
];

// Функция для подсветки совпадений
function highlight(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "ig");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 rounded px-0.5">{part}</mark>
    ) : (
      part
    )
  );
}

// Рекурсивная фильтрация по поиску
function filterItems(items: SidebarItem[], query: string): SidebarItem[] {
  if (!query) return items;
  const q = query.toLowerCase();
  return items
    .map(item => {
      if (item.children) {
        const filteredChildren = filterItems(item.children, query);
        if (item.title.toLowerCase().includes(q) || filteredChildren.length > 0) {
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

export function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<string[]>(["home"]);
  const [activeItem, setActiveItem] = useState("intro");

  const filteredSidebar = useMemo(
    () => filterItems(sidebarItems, searchQuery),
    [searchQuery]
  );

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const isActive = activeItem === item.id;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} className="w-full">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start h-auto py-2 px-3 font-normal transition-smooth nav-link rounded-lg",
            level > 0 && "ml-4 pl-2",
            isActive && "bg-gradient-primary text-primary-foreground shadow-glow",
            !isActive && "hover:bg-accent/50"
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              setActiveItem(item.id);
            }
          }}
        >
          <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
          <span className="flex-1 text-left">{highlight(item.title, searchQuery)}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {item.badge}
            </Badge>
          )}
          {hasChildren && (
            <ChevronRight
              className={cn(
                "h-4 w-4 ml-2 transition-smooth",
                isExpanded && "rotate-90"
              )}
            />
          )}
        </Button>

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1 animate-fade-in">
            {item.children?.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-72 h-screen bg-card dark:bg-zinc-900 border-r border-border/50 dark:border-zinc-700 flex flex-col shadow-elegant fixed left-0 top-0 z-[9999]">
      {/* Header */}
      <div className="p-6 border-b border-border/50 dark:border-zinc-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
            <Book className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              DocHub
            </h1>
            <p className="text-sm text-muted-foreground">Modern Documentation</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border/50 dark:border-zinc-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border/50 focus:border-primary transition-smooth"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 bg-card dark:bg-zinc-900">
        <nav className="space-y-2">
          {filteredSidebar.length > 0 ? (
            filteredSidebar.map(item => renderSidebarItem(item))
          ) : (
            <div className="text-xs text-muted-foreground px-2 py-4">
              No results found.
            </div>
          )}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border/50 dark:border-zinc-700 bg-card dark:bg-zinc-900">
        <Button variant="ghost" className="w-full justify-start transition-smooth hover:bg-accent/50">
          <Settings className="h-4 w-4 mr-3" />
          Settings
        </Button>
      </div>
    </div>
  );
}