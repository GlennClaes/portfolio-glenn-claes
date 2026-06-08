export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="reveal">
            <div className="about-portrait" role="img" aria-label="Glenn Claes abstract portrait" />
            <div className="about-facts">
              <div className="fact">
                <div className="num">40+</div>
                <div className="lbl">Builds delivered</div>
              </div>
              <div className="fact">
                <div className="num">24/7</div>
                <div className="lbl">Static hosting ready</div>
              </div>
              <div className="fact">
                <div className="num">TS</div>
                <div className="lbl">Strict TypeScript</div>
              </div>
              <div className="fact">
                <div className="num">100%</div>
                <div className="lbl">Quality focused</div>
              </div>
            </div>
          </div>
          <div>
            <span className="eyebrow reveal">About me</span>
            <h2 className="h-section reveal" data-delay="1">
              A developer who likes clean interfaces, steady systems and thoughtful details.
            </h2>
            <p className="lead reveal mt-22" data-delay="2">
              I&apos;m Glenn Claes, a Belgium-based developer focused on modern, maintainable web
              experiences. I like turning ideas into products that feel quick, clear and dependable.
            </p>
            <p className="lead reveal mt-14" data-delay="3">
              Most work starts with a simple question: what should this make easier for the person
              using it? From there I shape the interface, build the core, test the flows and prepare
              it for deployment.
            </p>
            <p className="lead reveal body-mute mt-14" data-delay="4">
              No noise, no overbuilt stack. Just sharp execution, readable code and a site that is
              ready to ship.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
