import { ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onHomeClick?: () => void;
}

export function Breadcrumbs({ items, onHomeClick }: BreadcrumbsProps) {
  return (
    <nav
      className="flex items-center space-x-1 text-sm text-muted-foreground dark:text-zinc-300 mb-6"
      aria-label="Breadcrumb"
    >
      <Button
        variant="ghost"
        size="sm"
        className="h-6 px-1 hover-text-primary"
        onClick={onHomeClick}
        aria-label="Home"
      >
        <Home className="h-3 w-3 dark:text-zinc-200" />
      </Button>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-3 w-3 dark:text-zinc-400" aria-hidden="true" />
          {item.href && index !== items.length - 1 ? (
            <a href={item.href}>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-6 px-1 hover-text-primary dark:hover:text-primary"
              >
                <span>{item.title}</span>
              </Button>
            </a>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-1 text-foreground dark:text-white font-semibold cursor-default"
              tabIndex={-1}
              aria-current="page"
              disabled
            >
              {item.title}
            </Button>
          )}
        </div>
      ))}
    </nav>
  );
}