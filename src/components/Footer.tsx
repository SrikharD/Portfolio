export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="font-mono text-xs text-muted">
        designed & built by{" "}
        <span className="text-accent">Srikhar Dogiparthy</span>
      </p>
      <p className="font-mono text-xs text-muted">
        Next.js · TypeScript · Tailwind CSS
      </p>
    </footer>
  );
}
