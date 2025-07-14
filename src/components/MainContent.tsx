import { useState } from "react";
import {
  ArrowRight, Copy, CheckCircle, Zap, Shield, Layers, Github, User, BookOpen, Upload, Share2, ChevronDown,
  Slack, Gitlab, Globe, Server, Figma, Cloud, Twitter, Camera, FileText, Image, Search, Lock, BarChart, Eye, Terminal, Palette, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-image.jpg";
import { Link } from "react-router-dom";

const codeExamples = {
  npm: `npm create my-app@latest\ncd my-app\nnpm run dev\n\n# Your app is now running at http://localhost:3000`,
  yarn: `yarn create my-app\ncd my-app\nyarn dev\n\n# Your app is now running at http://localhost:3000`,
  pnpm: `pnpm create my-app\ncd my-app\npnpm run dev\n\n# Your app is now running at http://localhost:3000`,
};

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Frontend Engineer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The best docs platform I've ever used. Fast, beautiful, and easy to maintain!"
  },
  {
    name: "Bob Smith",
    role: "DevOps Lead",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Integration with our CI/CD was seamless. Our team loves the dark mode!"
  },
  {
    name: "Carol Lee",
    role: "Technical Writer",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Writing and publishing docs is a joy. The quick start is truly quick!"
  }
];

const howItWorks = [
  { icon: <BookOpen className="h-7 w-7 text-blue-500" />, title: "Write Docs", desc: "Create content in Markdown or MDX with live preview." },
  { icon: <Upload className="h-7 w-7 text-fuchsia-500" />, title: "Deploy Instantly", desc: "Push to Git and your docs are live in seconds." },
  { icon: <Share2 className="h-7 w-7 text-indigo-500" />, title: "Share & Collaborate", desc: "Invite your team and get feedback in real time." },
];

const faqs = [
  { q: "Is it really free?", a: "Yes! The core is open source and free for everyone." },
  { q: "Can I use my own domain?", a: "Absolutely. You can connect any custom domain in settings." },
  { q: "Does it support dark mode?", a: "Yes, and it looks gorgeous!" },
  { q: "How do I deploy?", a: "Just push to GitHub or use Vercel/Netlify for instant deploys." },
];

const integrations = [
  { icon: <Github className="h-8 w-8 text-slate-700 dark:text-zinc-200" />, name: "GitHub" },
  { icon: <Slack className="h-8 w-8 text-blue-500" />, name: "Slack" },
  { icon: <Gitlab className="h-8 w-8 text-orange-500" />, name: "GitLab" },
  { icon: <Globe className="h-8 w-8 text-green-500" />, name: "Netlify" },
  { icon: <Server className="h-8 w-8 text-indigo-500" />, name: "Vercel" },
  { icon: <Figma className="h-8 w-8 text-pink-500" />, name: "Figma" },
  { icon: <Cloud className="h-8 w-8 text-black dark:text-white" />, name: "Notion" },
  { icon: <User className="h-8 w-8 text-indigo-400" />, name: "Discord" },
  { icon: <Cloud className="h-8 w-8 text-blue-400" />, name: "Google Drive" },
  { icon: <Cloud className="h-8 w-8 text-blue-700" />, name: "Dropbox" },
  { icon: <User className="h-8 w-8 text-blue-500" />, name: "Trello" },
  { icon: <User className="h-8 w-8 text-sky-400" />, name: "Telegram" },
  { icon: <Twitter className="h-8 w-8 text-blue-400" />, name: "Twitter" },
  { icon: <Camera className="h-8 w-8 text-pink-400" />, name: "Unsplash" },
  { icon: <FileText className="h-8 w-8 text-amber-500" />, name: "Google Docs" },
  { icon: <Image className="h-8 w-8 text-fuchsia-500" />, name: "Gallery" },
];

const gallery = [
  heroImage,
  heroImage,
  heroImage,
];

const modules = [
  { icon: <BookOpen className="h-7 w-7 text-blue-500" />, title: "Markdown Engine", desc: "Powerful MD/MDX rendering with live preview." },
  { icon: <Search className="h-7 w-7 text-indigo-500" />, title: "Search", desc: "Instant full-text search across your docs." },
  { icon: <Lock className="h-7 w-7 text-fuchsia-500" />, title: "Auth", desc: "Flexible authentication and access control." },
  { icon: <BarChart className="h-7 w-7 text-green-500" />, title: "Analytics", desc: "Track views, engagement, and more." },
  { icon: <FileText className="h-7 w-7 text-amber-500" />, title: "Export", desc: "Export docs to PDF, HTML, or Markdown." },
  { icon: <Eye className="h-7 w-7 text-pink-500" />, title: "Live Preview", desc: "See changes instantly as you write." },
  { icon: <Globe className="h-7 w-7 text-blue-400" />, title: "API", desc: "RESTful API & SDK for automation." },
  { icon: <Terminal className="h-7 w-7 text-zinc-700 dark:text-zinc-200" />, title: "CLI", desc: "Command-line tools for power users." },
  { icon: <Palette className="h-7 w-7 text-purple-500" />, title: "Themes", desc: "Customizable themes and color schemes." },
  { icon: <Users className="h-7 w-7 text-sky-500" />, title: "Community", desc: "Join our Discord, GitHub, and more." },
];

export function MainContent() {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<'npm' | 'yarn' | 'pnpm'>('npm');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[tab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900 transition-colors">
      {/* Version badge */}
      <div className="mt-10 mb-4 animate-fade-in">
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-200 px-3 py-1 rounded-full text-xs shadow">🚀 Version 2.0 · Now Available</Badge>
      </div>
      {/* Hero */}
      <section className="w-full max-w-3xl text-center mb-12 px-4 relative">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-br from-blue-400/30 via-fuchsia-400/20 to-indigo-400/30 rounded-full blur-3xl z-0 animate-glow" />
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-lg mb-6 leading-tight animate-fade-in z-10 relative">
          Build Documentation<br />That Inspires
        </h1>
        <p className="text-xl text-slate-600 dark:text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-100 z-10 relative">
          Create, share, and scale your docs with a beautiful, blazing-fast, and developer-friendly platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 z-10 relative animate-fade-in delay-200">
          <Link to="/docs">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-fuchsia-500 text-white shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 px-7 py-3 text-lg font-semibold rounded-xl">
              <BookOpen className="h-5 w-5" /> View Documentation
            </Button>
          </Link>
          <Link to="/modules">
            <Button size="lg" className="bg-gradient-to-r from-fuchsia-500 to-blue-600 text-white shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 px-7 py-3 text-lg font-semibold rounded-xl">
              <Layers className="h-5 w-5" /> Modules
            </Button>
          </Link>
        </div>
        <div className="w-full max-w-2xl flex justify-center mb-12 px-4 z-10 relative animate-scale-in">
          <img
            src={heroImage}
            alt="Hero illustration"
            className="rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800 object-cover w-full h-72 sm:h-80 md:h-96 bg-slate-100 dark:bg-zinc-900"
          />
        </div>
        {/* CTA */}
        <div className="flex flex-col items-center gap-4 mt-2 animate-fade-in delay-300">
          <span className="text-lg text-slate-500 dark:text-zinc-400">Ready to dive in?</span>
          <Link to="/modules">
            <Button className="px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-fuchsia-500 text-white shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-2">
              <Layers className="h-5 w-5" /> Start exploring modules
            </Button>
          </Link>
        </div>
      </section>
      {/* Features */}
      <section className="w-full max-w-5xl flex flex-col md:flex-row gap-6 justify-center mb-16 px-4">
        {[{
          icon: <Zap className="h-7 w-7 text-white" />, gradient: "from-blue-500 to-indigo-500", title: "Lightning Fast", desc: "Built for speed with modern technologies and optimized performance.",
        }, {
          icon: <Shield className="h-7 w-7 text-white" />, gradient: "from-fuchsia-500 to-pink-500", title: "Secure by Default", desc: "Enterprise-grade security with built-in best practices and encryption.",
        }, {
          icon: <Layers className="h-7 w-7 text-white" />, gradient: "from-indigo-500 to-blue-500", title: "Modular Design", desc: "Flexible architecture that adapts to your specific needs and requirements.",
        }].map((f, i) => (
          <Card key={f.title} className="flex-1 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow group cursor-pointer hover:scale-[1.03] active:scale-95">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br ${f.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <CardTitle className="text-lg font-bold text-slate-900 dark:text-zinc-100">{f.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 dark:text-zinc-300 pb-4">
              {f.desc}
            </CardContent>
          </Card>
        ))}
      </section>
      {/* Quick Start with tabs and patterned bg */}
      <section className="w-full max-w-3xl mb-16 px-4">
        <h2 className="text-2xl font-bold text-center mb-4 text-slate-900 dark:text-zinc-100">Quick Start Example</h2>
        <div className="flex gap-2 mb-2 justify-center">
          {(['npm', 'yarn', 'pnpm'] as const).map((t) => (
            <button
              key={t}
              className={`px-4 py-1 rounded-full text-sm font-medium border transition-colors ${tab === t ? 'bg-gradient-to-r from-blue-600 to-fuchsia-500 text-white border-transparent shadow' : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 border-slate-200 dark:border-zinc-700'}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative bg-slate-900 dark:bg-zinc-950 border border-slate-800 dark:border-zinc-800 rounded-xl p-6 shadow-lg overflow-x-auto before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] before:bg-[size:20px_20px] before:opacity-60 before:pointer-events-none">
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-blue-500 dark:hover:text-blue-400"
              onClick={handleCopy}
              aria-label="Copy code"
            >
              {copied ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
            </Button>
            {copied && (
              <span className="absolute right-10 top-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-2 py-0.5 rounded shadow animate-fade-in">Copied!</span>
            )}
          </div>
          <pre className="text-sm font-mono text-slate-100 dark:text-zinc-100 whitespace-pre-wrap">
            <code>{codeExamples[tab]}</code>
          </pre>
        </div>
      </section>
      {/* Trusted by */}
      <section className="w-full max-w-2xl mb-12 px-4">
        <div className="text-center text-slate-500 dark:text-zinc-400 mb-2 text-sm animate-fade-in delay-100">Loved by teams at</div>
        <div className="flex flex-row items-center justify-center gap-8 opacity-80 animate-fade-in delay-200">
          <img src="/logo1.svg" alt="Logo1" className="h-10 grayscale opacity-70 hover:opacity-100 transition-opacity duration-200" />
          <img src="/logo2.svg" alt="Logo2" className="h-10 grayscale opacity-70 hover:opacity-100 transition-opacity duration-200" />
          <img src="/logo3.svg" alt="Logo3" className="h-10 grayscale opacity-70 hover:opacity-100 transition-opacity duration-200" />
        </div>
      </section>
      {/* CTA with gradient border/glow */}
      <section className="w-full max-w-xl mb-20 px-4">
        <div className="relative animate-fade-in delay-300">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-fuchsia-500 blur-lg opacity-40 z-0" />
          <Card className="relative bg-gradient-to-r from-blue-600 to-fuchsia-500 dark:from-blue-700 dark:to-fuchsia-700 text-white shadow-2xl rounded-2xl p-8 flex flex-col items-center z-10 border-none">
            <h3 className="text-2xl font-bold mb-2">Ready to get started?</h3>
            <p className="mb-6 text-lg text-white/90">Check out the docs and build your next documentation site today.</p>
            <Button className="px-8 py-3 text-base font-semibold rounded-lg bg-white text-blue-600 hover:bg-blue-50 shadow-lg transition-colors flex items-center gap-2">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full max-w-4xl mb-20 px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-zinc-100">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {howItWorks.map((step, i) => (
            <Card key={step.title} className="flex flex-col items-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-md p-6 text-center animate-fade-in" style={{ animationDelay: `${i * 0.1 + 0.1}s` }}>
              <div className="mb-3">{step.icon}</div>
              <CardTitle className="mb-2 text-lg font-semibold text-slate-900 dark:text-zinc-100">{step.title}</CardTitle>
              <CardContent className="text-slate-600 dark:text-zinc-300">{step.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-4xl mb-20 px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-zinc-100">What people say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={t.name} className="flex flex-col items-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-md p-6 text-center animate-fade-in" style={{ animationDelay: `${i * 0.1 + 0.1}s` }}>
              <img src={t.avatar} alt={t.name} className="h-14 w-14 rounded-full mb-3 shadow" />
              <CardContent className="mb-2 text-slate-700 dark:text-zinc-200 italic">“{t.text}”</CardContent>
              <div className="text-sm text-slate-500 dark:text-zinc-400 font-medium">{t.name}</div>
              <div className="text-xs text-slate-400 dark:text-zinc-500">{t.role}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Integrations Marquee */}
      <section className="w-full max-w-5xl mb-20 px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-zinc-100">Integrations</h2>
        <div className="overflow-x-hidden relative">
          <div className="flex gap-12 animate-marquee whitespace-nowrap py-4">
            {integrations.concat(integrations).map((intg, i) => (
              <div key={intg.name + i} className="flex flex-col items-center min-w-[80px]">
                {intg.icon}
                <span className="text-xs mt-1 text-slate-500 dark:text-zinc-400">{intg.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Gallery */}
      <section className="w-full max-w-4xl mb-20 px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-zinc-100">Gallery</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {gallery.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Screenshot ${i + 1}`}
              className="rounded-xl shadow-lg border border-slate-200 dark:border-zinc-800 w-72 h-44 object-cover bg-slate-100 dark:bg-zinc-900 animate-fade-in"
              style={{ animationDelay: `${i * 0.1 + 0.1}s` }}
            />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full max-w-2xl mb-20 px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-zinc-100">FAQ</h2>
        <div className="divide-y divide-slate-200 dark:divide-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-md">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left text-base font-medium text-slate-800 dark:text-zinc-100 focus:outline-none hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
              >
                {f.q}
                <ChevronDown className={`h-5 w-5 ml-2 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
              </button>
              {faqOpen === i && (
                <div className="px-6 pb-4 text-slate-600 dark:text-zinc-300 animate-fade-in">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Open Source */}
      <section className="w-full max-w-xl mb-24 px-4">
        <Card className="flex flex-col items-center bg-gradient-to-r from-slate-100 to-blue-50 dark:from-zinc-900 dark:to-zinc-800 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-lg p-8 text-center">
          <Github className="h-10 w-10 mb-2 text-slate-700 dark:text-zinc-200" />
          <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-zinc-100">Open Source & Free</h3>
          <CardContent className="mb-4 text-slate-600 dark:text-zinc-300">MIT License. Contribute or star us on GitHub!</CardContent>
          <a href="https://github.com/your-org/book-docs-opensource" target="_blank" rel="noopener noreferrer">
            <Button className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
              <Github className="h-5 w-5" /> Star on GitHub
            </Button>
          </a>
        </Card>
      </section>

      {/* Modules Section */}
      <section className="w-full max-w-5xl mb-20 px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-zinc-100">Modules</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {modules.map((mod, i) => (
            <Card key={mod.title} className="flex flex-col items-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-md p-6 text-center animate-fade-in" style={{ animationDelay: `${i * 0.05 + 0.1}s` }}>
              <div className="mb-3">{mod.icon}</div>
              <CardTitle className="mb-2 text-base font-semibold text-slate-900 dark:text-zinc-100">{mod.title}</CardTitle>
              <CardContent className="text-slate-600 dark:text-zinc-300 text-sm">{mod.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

// Анимации (можно добавить в index.css или tailwind.config.js)
// .animate-fade-in { animation: fadeIn 0.7s both; }
// .animate-scale-in { animation: scaleIn 0.7s both; }
// .animate-glow { animation: glow 3s infinite alternate; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(24px);} to { opacity: 1; transform: none; } }
// @keyframes scaleIn { from { opacity: 0; transform: scale(0.96);} to { opacity: 1; transform: scale(1); } }
// @keyframes glow { from { filter: blur(32px) brightness(1.1);} to { filter: blur(48px) brightness(1.3);} }

// Добавь в index.css:
// .animate-marquee { animation: marquee 32s linear infinite; }
// @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }