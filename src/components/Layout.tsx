import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-navy text-off-white flex flex-col">
      <header className="border-b border-card-border">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-lg font-bold">
            Platform Fix <span className="text-gold">for Founders</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/services" className="hover:text-gold">Services</Link>
            <Link
              to="/work-with-us"
              className="rounded-md bg-gold px-4 py-2 text-navy font-medium hover:opacity-90"
            >
              Work With Us
            </Link>
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
