export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-card/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} CS2 Price Monitor. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/terms" className="hover:text-brand">Disclaimer</a>
          <a href="mailto:hello@example.com" className="hover:text-brand">Contact</a>
        </div>
      </div>
    </footer>
  );
}
