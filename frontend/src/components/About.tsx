export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="reveal">
            <div className="about-portrait" role="img" aria-label="Portrait of Ben Baeyens" />
            <div className="about-facts">
              <div className="fact">
                <div className="num">40+</div>
                <div className="lbl">Projects shipped</div>
              </div>
              <div className="fact">
                <div className="num">120+</div>
                <div className="lbl">Students taught</div>
              </div>
              <div className="fact">
                <div className="num">6 yrs</div>
                <div className="lbl">Working with Unity</div>
              </div>
              <div className="fact">
                <div className="num">100%</div>
                <div className="lbl">Recommend rate</div>
              </div>
            </div>
          </div>
          <div>
            <span className="eyebrow reveal">About me</span>
            <h2 className="h-section reveal" data-delay="1">
              A freelance IT&apos;er who genuinely enjoys making things that&nbsp;move.
            </h2>
            <p className="lead reveal mt-22" data-delay="2">
              I&apos;m Ben — a Belgium-based freelancer focused on Unity. Most of my days are spent
              building practical, interactive software: games, in-house tools, training simulations,
              mobile apps, and the occasional weird experiment for fun.
            </p>
            <p className="lead reveal mt-14" data-delay="3">
              I also teach Unity. If you&apos;re a beginner, a student, or someone who wants
              hands-on guidance to ship your first project, I&apos;ll meet you where you are and
              we&apos;ll learn by actually&nbsp;making something together.
            </p>
            <p className="lead reveal body-mute mt-14" data-delay="4">
              No jargon, no fluff — just clear thinking, clean code, and a friendly
              working&nbsp;style.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
