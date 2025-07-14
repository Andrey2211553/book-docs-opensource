import { useState } from "react";
import { Copy, CheckCircle, ArrowRight, ExternalLink, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "./Breadcrumbs";

export function GitBookContent() {
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null);

  const handleCopy = (text: string, block: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBlock(block);
    setTimeout(() => setCopiedBlock(null), 1500);
  };

  const breadcrumbItems = [
    { title: "Getting Started", href: "#" },
    { title: "Overview" }
  ];

  const installCode = `npm install @our-platform/core
# or
yarn add @our-platform/core
# or  
pnpm add @our-platform/core`;

  const usageCode = `import { Platform } from '@our-platform/core';

const platform = new Platform({
  apiKey: 'your-api-key',
  environment: 'development'
});

// Initialize the platform
await platform.initialize();

console.log('Platform ready!');`;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-8 py-6">
        <Breadcrumbs items={breadcrumbItems} />

        <article className="prose prose-slate max-w-none">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-3">
              <h1 className="text-3xl font-bold text-foreground m-0">Getting Started</h1>
              <Badge variant="secondary" className="text-xs">v2.0</Badge>
            </div>
            <p className="text-lg text-muted-foreground m-0">
              Learn how to get started with our platform in just a few minutes.
            </p>
          </div>

          {/* Info callout */}
          <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 border-blue-200/50 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-800 mb-1">Before you begin</p>
                  <p className="text-sm text-blue-700">
                    Make sure you have Node.js version 16 or higher installed on your system.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main content */}
          <h2 id="installation" className="text-xl font-semibold text-foreground mt-8 mb-4">
            Installation
          </h2>

          <p className="text-foreground/90 mb-4">
            Install the package using your preferred package manager:
          </p>

          {/* Code block */}
          <Card className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400 font-mono">terminal</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-slate-400 hover:text-white relative"
                  onClick={() => handleCopy(installCode, "install")}
                >
                  {copiedBlock === "install" ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copiedBlock === "install" && (
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded shadow">
                      Copied!
                    </span>
                  )}
                </Button>
              </div>
              <pre className="text-sm text-slate-100 font-mono overflow-x-auto">
                <code>{installCode}</code>
              </pre>
            </CardContent>
          </Card>

          <h2 id="basic-usage" className="text-xl font-semibold text-foreground mt-8 mb-4">
            Basic Usage
          </h2>

          <p className="text-foreground/90 mb-4">
            Here's a simple example to get you started:
          </p>

          <Card className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-600 font-mono">example.js</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-slate-600 hover:text-slate-900 relative"
                  onClick={() => handleCopy(usageCode, "usage")}
                >
                  {copiedBlock === "usage" ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copiedBlock === "usage" && (
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded shadow">
                      Copied!
                    </span>
                  )}
                </Button>
              </div>
              <pre className="text-sm text-slate-800 font-mono overflow-x-auto">
                <code>{usageCode}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Warning callout */}
          <Card className="border-l-4 border-l-amber-500 bg-amber-50/50 border-amber-200/50 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-amber-800 mb-1">Important</p>
                  <p className="text-sm text-amber-700">
                    Never expose your API key in client-side code. Always use environment variables in production.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 id="configuration" className="text-xl font-semibold text-foreground mt-8 mb-4">
            Configuration
          </h2>

          <p className="text-foreground/90 mb-4">
            The platform accepts the following configuration options:
          </p>

          <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-lg p-4 mb-6">
            <table className="w-full text-sm text-foreground dark:text-zinc-100">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 pr-4 font-medium text-slate-900 dark:text-zinc-100">Option</th>
                  <th className="text-left py-2 pr-4 font-medium text-slate-900 dark:text-zinc-100">Type</th>
                  <th className="text-left py-2 font-medium text-slate-900 dark:text-zinc-100">Description</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-zinc-200">
                <tr className="border-b border-slate-200">
                  <td className="py-2 pr-4 font-mono">apiKey</td>
                  <td className="py-2 pr-4">string</td>
                  <td className="py-2">Your API key for authentication</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2 pr-4 font-mono">environment</td>
                  <td className="py-2 pr-4">string</td>
                  <td className="py-2">Environment: 'development' or 'production'</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono">timeout</td>
                  <td className="py-2 pr-4">number</td>
                  <td className="py-2">Request timeout in milliseconds (default: 5000)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Next steps */}
          <Card className="bg-blue-50/50 dark:bg-zinc-900 border border-blue-200 dark:border-zinc-700 mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-100 mb-3">Next Steps</h3>
              <div className="space-y-3">
                <Button variant="ghost" size="sm" className="w-full justify-between hover:bg-white/50 dark:hover:bg-zinc-800/50 text-foreground dark:text-zinc-100">
                  <span className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Learn about advanced features
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-between hover:bg-white/50 dark:hover:bg-zinc-800/50 text-foreground dark:text-zinc-100">
                  <span className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Check out the API reference
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-between hover:bg-white/50 dark:hover:bg-zinc-800/50 text-blue-700 dark:text-blue-400">
                  <span className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-blue-600" />
                    View live examples
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  );
}