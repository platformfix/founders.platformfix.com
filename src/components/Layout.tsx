import { Link, Outlet } from "react-router-dom";
import { ApplyLink } from "./ApplyLink";
import { OFFER_NAME } from "../lib/apply";

export function Layout() {
  return (
    <div className="min-h-screen bg-brand-gradient text-off-white flex flex-col">
      <header className="border-b border-card-border">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-lg font-bold">
            {OFFER_NAME}<span className="hidden text-gold sm:inline"> by Platform Fix</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/method" className="hover:text-gold">Method</Link>
            <Link to="/about" className="hover:text-gold">About</Link>
            <ApplyLink size="sm" />
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-card-border">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-cool-grey">
          <span>© {new Date().getFullYear()} Platform Fix</span>
        </div>
      </footer>
    </div>
  );
}
