export default function Footer() {
  return (
    <footer className="w-full py-12 bg-background border-t border-borders">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-bold text-lg text-text-primary">KSS.dev</div>
          <p className="text-sm text-text-secondary">© {new Date().getFullYear()} Khushal Singh Sankhla. Built with React + TypeScript + Tailwind CSS.</p>
        </div>
        <div className="flex gap-6 items-center">
          <a href="https://linkedin.com/in/khushal-singh-sankhla" className="text-text-secondary hover:text-primary transition-colors text-sm">LinkedIn</a>
          <a href="https://github.com/khushalsinghsankhla2808" className="text-text-secondary hover:text-primary transition-colors text-sm">GitHub</a>
          <a href="mailto:khushalsinghsankhla203@gmail.com" className="text-text-secondary hover:text-primary transition-colors text-sm">Contact</a>
        </div>
      </div>
    </footer>
  );
}
