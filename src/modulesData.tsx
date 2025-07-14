import { BookOpen, Search, Lock, BarChart, FileText, Eye, Globe, Terminal, Palette, Users, Github } from "lucide-react";

export const modules = [
  {
    slug: "markdown-engine",
    icon: <BookOpen className="h-10 w-10 text-blue-500" />, title: "Markdown Engine",
    desc: "Powerful MD/MDX rendering with live preview, syntax highlighting, and custom components.",
    features: ["MDX & Markdown support", "Live preview as you type", "Syntax highlighting for 100+ languages", "Custom components and shortcodes"],
    details: "The Markdown Engine lets you write docs in Markdown or MDX, supporting custom components and live preview.",
    examples: ["# Hello World\nThis is a markdown example."],
    faq: [
      { q: "Can I use MDX components?", a: "Yes, you can use any React component in your docs." },
    ]
  },
  {
    slug: "search",
    icon: <Search className="h-10 w-10 text-indigo-500" />, title: "Search",
    desc: "Instant full-text search across your docs, with typo tolerance and filters.",
    features: ["Blazing fast indexing", "Typo-tolerant search", "Section and page filters", "Keyboard navigation"],
    details: "The Search module provides instant, typo-tolerant search for all your documentation.",
    examples: ["Type in the search bar to find any page instantly."],
    faq: []
  },
  {
    slug: "playground",
    icon: <Terminal className="h-10 w-10 text-emerald-500" />, title: "Interactive Docs / Playground",
    desc: "Add live code blocks and playgrounds to your docs.",
    features: [
      "Live JS/Python/SQL playgrounds",
      "Run code in-browser",
      "Sandpack & CodeSandbox support"
    ],
    details: "Embed interactive code editors and playgrounds directly in your documentation. Readers can edit and run code examples live, supporting JS, Python, SQL, and more. Integrates with Sandpack and CodeSandbox.",
    examples: ["// JS Example\nconsole.log('Hello, world!');"],
    faq: [
      { q: "Can I run Python code?", a: "Yes, via in-browser interpreters or external sandboxes." }
    ]
  },
  {
    slug: "graph-visualization",
    icon: <Globe className="h-10 w-10 text-cyan-500" />, title: "Graph Knowledge Visualization",
    desc: "Visualize the connections between your docs as a graph.",
    features: [
      "Auto-generate knowledge graph",
      "Obsidian-style backlinks",
      "Visual navigation between pages"
    ],
    details: "Automatically generate a visual graph of your documentation, showing how pages are linked. Navigate your docs like a knowledge map.",
    examples: ["[Graph visualization screenshot]"],
    faq: [
      { q: "Is this like Obsidian?", a: "Yes, it works similarly for docs." }
    ]
  },
  {
    slug: "github-sync",
    icon: <Github className="h-10 w-10 text-black dark:text-white" />, title: "GitHub Sync + PR Based Editing",
    desc: "Sync docs with GitHub and edit via pull requests.",
    features: [
      "Sync with GitHub repo",
      "Branch-based docs",
      "PR review in admin panel"
    ],
    details: "Work with your documentation like code: sync with GitHub, use branches, and review pull requests directly in the admin interface.",
    examples: ["Edit docs, open PR, review and merge—all in one place."],
    faq: [
      { q: "Can I restrict editing to PRs only?", a: "Yes, you can require all changes to go through PR review." }
    ]
  },
]; 