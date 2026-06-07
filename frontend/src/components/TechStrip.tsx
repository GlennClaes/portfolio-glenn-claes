const items = [
  'Unity',
  'C#',
  'Shader Graph',
  'URP',
  'Mobile & WebGL',
  'AR / VR',
  'Game Design',
  'Mentorship',
];

export function TechStrip() {
  return (
    <div className="tech-strip" aria-label="Unity technology specialisms">
      <div className="container tech-strip-inner">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
