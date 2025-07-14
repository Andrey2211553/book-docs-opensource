import { modules } from "../modulesData";
import { Link } from "react-router-dom";

export default function ModulesPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-zinc-950 text-foreground dark:text-zinc-100 transition-colors px-4 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">Modules</h1>
      <p className="text-lg text-slate-600 dark:text-zinc-300 mb-12 text-center max-w-2xl">Explore all the powerful modules. Click a module to read its documentation.</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {modules.map((mod) => (
          <Link to={`/modules/${mod.slug}`} key={mod.slug} className="group">
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-lg p-8 flex flex-col items-center transition-transform group-hover:scale-105 cursor-pointer animate-fade-in">
              <div className="mb-4">{mod.icon}</div>
              <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-zinc-100 text-center">{mod.title}</h2>
              <p className="mb-2 text-slate-600 dark:text-zinc-300 text-center">{mod.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 