const items = [
  'Next.js',
  'React',
  'TypeScript',
  'Python',
  'AI & LLMs',
  'Tailwind CSS',
  'Vercel',
  'GitHub Pages',
  'Playwright',
  'Accessibility',
  'CI/CD',
];

export function TechStrip() {
  return (
    <div className="tech-strip" aria-label="Glenn Claes technology specialisms">
      <div className="container tech-strip-inner">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
