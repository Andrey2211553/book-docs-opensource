import { useParams, Link, useNavigate } from "react-router-dom";
import { modules } from "../modulesData";
import { ChevronRight, ListTree, CheckCircle, Star, Share2, ChevronLeft, ChevronDown, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const mockGallery = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
];
const mockContributors = [
  { name: "Alice", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Bob", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Carol", avatar: "https://randomuser.me/api/portraits/women/65.jpg" }
];
const mockChangelog = [
  { date: "2024-06-01", version: "2.1.0", changes: "Added live playground support for Python." },
  { date: "2024-05-15", version: "2.0.0", changes: "Major refactor, improved performance." },
  { date: "2024-04-10", version: "1.5.0", changes: "Initial public release." }
];

export default function ModuleDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const mod = modules.find((m) => m.slug === slug);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [hoveredContributor, setHoveredContributor] = useState<number | null>(null);

  // Sidebar search
  const filteredModules = modules.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));

  // Scroll active module into view on mount
  useEffect(() => {
    if (sidebarRef.current) {
      const active = sidebarRef.current.querySelector('.active-module');
      if (active && active instanceof HTMLElement) {
        active.scrollIntoView({ block: 'center' });
      }
    }
  }, [slug]);

  if (!mod) return <div className="p-12 text-center text-red-500">Module not found</div>;

  // Previous/Next module
  const idx = modules.findIndex(m => m.slug === slug);
  const prev = idx > 0 ? modules[idx - 1] : null;
  const next = idx < modules.length - 1 ? modules[idx + 1] : null;

  // Related modules
  const related = modules.filter(m => m.slug !== slug).sort(() => 0.5 - Math.random()).slice(0, 3);

  // Share handler
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
  };

  // Tags/badges (моковые)
  const tags = ["core", "beta", "analytics"].filter((t, i) => idx % (i + 2) === 0);

  // Callout/alert (мок)
  const callout = idx % 2 === 0 ? { type: "info", text: "Beta feature: API may change in future releases." } : { type: "warning", text: "Requires Node.js 18+ for full functionality." };

  // Official badge logic
  const isOfficial = idx < 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-foreground dark:text-zinc-100 transition-colors flex flex-col md:flex-row">
      {/* Sidebar tree */}
      <aside ref={sidebarRef} className="md:w-72 w-full md:sticky md:top-0 md:h-screen bg-white/80 dark:bg-zinc-900/80 border-r border-slate-200 dark:border-zinc-800 shadow-lg z-10 flex-shrink-0 overflow-x-auto overflow-y-auto md:block hidden animate-fade-in">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4 text-slate-500 dark:text-zinc-400 font-semibold uppercase tracking-wider text-xs">
            <ListTree className="h-4 w-4" /> Modules
          </div>
          <input
            className="w-full mb-4 p-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 shadow"
            placeholder="Search modules..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <nav className="space-y-1">
            {filteredModules.map((m) => (
              <Link
                key={m.slug}
                to={`/modules/${m.slug}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-medium text-sm hover:bg-blue-100/60 dark:hover:bg-blue-900/30 ${m.slug === slug ? 'bg-gradient-to-r from-blue-600/10 to-fuchsia-500/10 text-blue-700 dark:text-blue-200 font-bold active-module shadow-lg ring-2 ring-blue-400/30 dark:ring-fuchsia-400/30' : 'text-slate-700 dark:text-zinc-200'}`}
              >
                <span className="w-6 h-6 flex items-center justify-center relative">
                  {m.icon}
                  {m.slug === slug && <span className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-blue-500 shadow animate-pulse" />}
                </span>
                {m.title}
                {m.slug === slug && <ChevronRight className="h-4 w-4 ml-auto text-blue-500" />}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      {/* Mobile select */}
      <div className="md:hidden w-full px-4 pt-6">
        <select
          className="w-full p-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 mb-6 shadow"
          value={slug}
          onChange={e => navigate(`/modules/${e.target.value}`)}
        >
          {modules.map((m) => (
            <option key={m.slug} value={m.slug}>{m.title}</option>
          ))}
        </select>
      </div>
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 md:py-16 animate-fade-in">
        {/* Hero */}
        <div className="w-full max-w-2xl bg-white/90 dark:bg-zinc-900/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center mb-10 relative overflow-hidden">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-60 h-60 bg-gradient-to-br from-blue-400/30 via-fuchsia-400/20 to-indigo-400/30 rounded-full blur-2xl z-0" />
          <div className="mb-4 z-10 relative">
            <span className="inline-block p-4 rounded-full bg-gradient-to-br from-blue-100 to-fuchsia-100 dark:from-zinc-800 dark:to-zinc-900 shadow-lg relative">
              {mod.icon}
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 text-xs rounded-full bg-blue-600 text-white font-bold shadow animate-fade-in">Core</span>
            </span>
          </div>
          <h1 className="text-3xl font-extrabold mb-2 text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent z-10 animate-fade-in">{mod.title}</h1>
          <div className="flex gap-2 mb-2 z-10">
            {tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 uppercase tracking-wide shadow animate-fade-in delay-100">{tag}</span>
            ))}
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide shadow animate-fade-in delay-150 ${isOfficial ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : 'bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300'}`}>{isOfficial ? 'Official module' : 'Unofficial module'}</span>
          </div>
          <p className="mb-4 text-lg text-slate-600 dark:text-zinc-300 text-center z-10 animate-fade-in delay-100">{mod.details || mod.desc}</p>
          <div className="flex gap-3 mt-2 z-10">
            <button onClick={handleShare} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-zinc-800 text-blue-600 dark:text-fuchsia-400 hover:bg-blue-100 dark:hover:bg-zinc-700 transition">
              <Share2 className="h-4 w-4" /> Share
            </button>
            <a href="https://github.com/your-org/book-docs-opensource" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-50 dark:bg-zinc-800 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-zinc-700 transition">
              <Star className="h-4 w-4" /> Star
            </a>
          </div>
        </div>
        {/* Callout/alert */}
        <div className={`w-full max-w-2xl mb-8 flex items-center gap-3 p-5 rounded-xl shadow border ${callout.type === 'info' ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-200' : 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-200'}`}> 
          <AlertCircle className={`h-7 w-7 flex-shrink-0 ${callout.type === 'info' ? 'text-blue-400' : 'text-yellow-400'}`} />
          <span className="font-medium text-base">{callout.text}</span>
        </div>
        {/* Mini gallery */}
        <div className="w-full max-w-2xl mb-10">
          <h2 className="text-lg font-bold mb-3 text-blue-700 dark:text-fuchsia-400">Gallery</h2>
          <div className="flex gap-4 flex-wrap">
            {mockGallery.map((img, i) => (
              <div key={i} className="relative group cursor-pointer" onClick={() => setGalleryOpen(i)}>
                <img src={img} alt={`Screenshot ${i + 1}`} className="w-40 h-28 object-cover rounded-xl shadow border border-slate-200 dark:border-zinc-800 transition-transform group-hover:scale-105" />
                <span className="absolute bottom-2 right-2 bg-white/80 dark:bg-zinc-900/80 text-xs px-2 py-0.5 rounded shadow">View</span>
              </div>
            ))}
          </div>
          {/* Lightbox */}
          {galleryOpen !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-colors duration-300" onClick={() => setGalleryOpen(null)}>
              <img src={mockGallery[galleryOpen]} alt="Full screenshot" className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl border-4 border-white dark:border-zinc-900 transition-all duration-300" />
            </div>
          )}
        </div>
        {/* Features */}
        <section className="w-full max-w-2xl grid sm:grid-cols-2 gap-6 mb-10">
          {mod.features.map((f, i) => (
            <div key={f} className="relative bg-gradient-to-r from-blue-50 to-fuchsia-50 dark:from-zinc-800 dark:to-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow p-6 flex items-center gap-3 animate-slide-in" style={{ animationDelay: `${i * 0.05 + 0.1}s` }}>
              <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 flex-shrink-0 opacity-80" />
              <span className="text-slate-700 dark:text-zinc-100 font-medium z-10">{f}</span>
              <span className="absolute right-2 bottom-2 opacity-10 text-6xl pointer-events-none select-none"><CheckCircle /></span>
            </div>
          ))}
        </section>
        {/* Examples */}
        {mod.examples && mod.examples.length > 0 && (
          <section className="w-full max-w-2xl mb-10">
            <h2 className="text-lg font-bold mb-3 text-blue-700 dark:text-fuchsia-400">Examples</h2>
            {mod.examples.map((ex, i) => (
              <pre key={i} className="bg-slate-100 dark:bg-zinc-800 rounded-xl p-4 text-sm mb-3 overflow-x-auto border border-slate-200 dark:border-zinc-700 shadow animate-fade-in" style={{ animationDelay: `${i * 0.05 + 0.1}s` }}>{ex}</pre>
            ))}
          </section>
        )}
        {/* FAQ */}
        {mod.faq && mod.faq.length > 0 && (
          <section className="w-full max-w-2xl mb-10">
            <h2 className="text-lg font-bold mb-3 text-blue-700 dark:text-fuchsia-400">FAQ</h2>
            <ul className="space-y-3">
              {mod.faq.map((f, i) => (
                <li key={i} className="bg-gradient-to-r from-blue-50 to-fuchsia-50 dark:from-zinc-800 dark:to-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow p-5 animate-fade-in cursor-pointer transition-all" style={{ animationDelay: `${i * 0.05 + 0.1}s` }} onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  <div className="flex items-center gap-2">
                    <ChevronDown className={`h-5 w-5 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                    <span className="font-semibold text-slate-800 dark:text-zinc-100">Q:</span> {f.q}
                  </div>
                  {faqOpen === i && (
                    <div className="mt-2 text-blue-700 dark:text-fuchsia-400 animate-fade-in">
                      <span className="font-semibold">A:</span> {f.a}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
        {/* Contributors */}
        <div className="w-full max-w-2xl mb-10">
          <h2 className="text-lg font-bold mb-3 text-blue-700 dark:text-fuchsia-400">Contributors</h2>
          <div className="flex gap-4 items-center flex-wrap">
            {mockContributors.map((c, i) => (
              <div key={i} className="flex flex-col items-center relative" onMouseEnter={() => setHoveredContributor(i)} onMouseLeave={() => setHoveredContributor(null)}>
                <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full shadow border-2 border-white dark:border-zinc-800 mb-1" />
                <span className="text-xs text-slate-600 dark:text-zinc-300 font-medium">{c.name}</span>
                {hoveredContributor === i && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow z-20 animate-fade-in">Contributor</span>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Changelog */}
        <div className="w-full max-w-2xl mb-10">
          <h2 className="text-lg font-bold mb-3 text-blue-700 dark:text-fuchsia-400">Changelog</h2>
          <ul className="space-y-2">
            {mockChangelog.map((c, i) => (
              <li key={i} className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center gap-2 shadow animate-fade-in">
                <span className="font-mono text-xs text-slate-500 dark:text-zinc-400">{c.date}</span>
                <span className="font-semibold text-blue-700 dark:text-fuchsia-400">v{c.version}</span>
                <span className="text-slate-700 dark:text-zinc-100">{c.changes}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Related modules */}
        <div className="w-full max-w-2xl mb-10">
          <h2 className="text-lg font-bold mb-3 text-blue-700 dark:text-fuchsia-400">Related modules</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((m) => (
              <Link key={m.slug} to={`/modules/${m.slug}`} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow p-4 flex flex-col items-center hover:scale-105 transition-transform">
                <div className="mb-2">{m.icon}</div>
                <div className="font-semibold text-slate-900 dark:text-zinc-100 text-center">{m.title}</div>
                <div className="text-xs text-slate-500 dark:text-zinc-400 text-center mt-1">{m.desc}</div>
              </Link>
            ))}
          </div>
        </div>
        {/* Prev/Next navigation */}
        <div className="w-full max-w-2xl flex justify-between items-center mt-8 mb-4 gap-2">
          {prev ? (
            <Link to={`/modules/${prev.slug}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-blue-50 dark:hover:bg-zinc-700 shadow transition">
              <ChevronLeft className="h-5 w-5" /> {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/modules/${next.slug}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-blue-50 dark:hover:bg-zinc-700 shadow transition">
              {next.title} <ChevronRight className="h-5 w-5" />
            </Link>
          ) : <span />}
        </div>
      </main>
    </div>
  );
}

// Добавь в index.css:
// .animate-slide-in { animation: slideIn 0.7s both; }
// @keyframes slideIn { from { opacity: 0; transform: translateY(24px);} to { opacity: 1; transform: none; } } 