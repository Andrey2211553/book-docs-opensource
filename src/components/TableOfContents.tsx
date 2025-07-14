import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items?: TocItem[];
}

const defaultTocItems: TocItem[] = [
  { id: "introduction", title: "Introduction", level: 1 },
  { id: "getting-started", title: "Getting Started", level: 1 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "basic-usage", title: "Basic Usage", level: 2 },
  { id: "configuration", title: "Configuration", level: 1 },
  { id: "options", title: "Available Options", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "api", title: "API Reference", level: 1 },
  { id: "methods", title: "Methods", level: 2 },
  { id: "events", title: "Events", level: 2 },
];

export function TableOfContents({ items }: TableOfContentsProps) {
  const tocItems = items ?? defaultTocItems;
  const [activeId, setActiveId] = useState<string | null>(null);

  // Подсветка активного пункта при скролле
  useEffect(() => {
    const handleScroll = () => {
      let current: string | null = null;
      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) {
            current = item.id;
          }
        }
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  // Прокрутка к секции
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 70,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-60 hidden xl:block">
      <div className="sticky top-16 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-border/50 dark:border-zinc-700 shadow">
        <h4 className="text-sm font-semibold mb-4 text-foreground dark:text-white">On this page</h4>
        <nav className="space-y-1">
          {tocItems.map((item) => (
            <Button
              key={item.id}
              variant={activeId === item.id ? "secondary" : "ghost"}
              size="sm"
              onClick={() => scrollToSection(item.id)}
              className={`w-full justify-start h-7 text-xs transition-gitbook rounded-md ${
                item.level === 2 ? "ml-4 text-muted-foreground" : "text-foreground"
              } ${activeId === item.id ? "font-semibold bg-primary/10 text-primary" : ""}`}
            >
              {item.title}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
}