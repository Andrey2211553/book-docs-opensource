import { Sun, Moon, Github, Twitter, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/useTheme";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 dark:border-zinc-700 glass backdrop-blur-xl bg-background dark:bg-zinc-900/95">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="md:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>

          {/* Center content */}
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="hidden md:flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Documentation</span>
            </Badge>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="transition-smooth hover:bg-accent/50"
              asChild
            >
              <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="transition-smooth hover:bg-accent/50"
              asChild
            >
              <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <div className="h-4 w-px bg-border mx-2"></div>
            <Button
              variant="ghost"
              size="sm"
              className="transition-smooth hover:bg-accent/50"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <a href="#get-started">
              <Button
                className="bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-lg transition-spring"
                size="sm"
              >
                Get Started
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}