
import Link from "next/link";

export const metadata = {
  title: "Our Story | Modern Hospitality",
};

export default function About() {
  return (
    <main className="inner-page about-page">

      {/* HERO */}
      <section className="about-hero-new">
        <div className="about-hero-copy">
          <div className="eyebrow">
            <span /> OUR STORY
          </div>

          <h1>
            Hospitality,
            <br />
            <em>with intention.</em>
          </h1>

          <p>
            We set out to create more than somewhere to sleep.
            We wanted to offer spaces that feel considered,
            comfortable and genuinely welcoming.
          </p>

          <Link href="/properties" className="about-hero-link">
            Discover our residences <span>↗</span>
          </Link>

          <div className="about-hero-note">
            <span>THOUGHTFULLY FURNISHED</span>
            <i />
            <span>DWARKA MOR, NEW DELHI</span>
          </div>
        </div>

        <div className="about-hero-visual">
          <img
            src="/images/signature-2bhk-6.png"
            alt="A furnished Modern Hospitality residence"
          />
          <div className="about-image-caption">
            <span>01 / OUR COLLECTION</span>
            <strong>Spaces that feel like home.</strong>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="about-feature-new">
        <div className="about-feature-image">
          <img
            src="/images/signature-2bhk-6.png"
            alt="A welcoming Modern Hospitality living space"
          />
          <span className="about-image-index">A PLACE TO SETTLE IN · DELHI</span>
        </div>

        <div className="about-feature-copy">
          <div className="eyebrow">
            <span /> THE WAY WE SEE IT
          </div>

          <h2>
            Good spaces make
            <br />
            <em>good memories.</em>
          </h2>

          <p>
            Modern Hospitality is built around a simple idea:
            a stay should feel easy. From the first conversation
            to the moment you walk through the door, we want
            every detail to feel thoughtful.
          </p>

          <p>
            Our collection brings together furnished studio and
            2BHK residences in Dwarka Mor, Delhi. Each has its
            own character, with practical comforts and inviting
            interiors designed to make time away feel a little
            more like home.
          </p>

          <Link className="under-link" href="/properties">
            Explore our spaces ↗
          </Link>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values-new">
        <div className="about-values-heading">
          <div className="eyebrow">
            <span /> WHAT MATTERS TO US
          </div>
          <h2>
            The details make
            <br />
            <em>the difference.</em>
          </h2>
        </div>

        <div className="about-values-grid">
          <article>
            <span className="about-value-number">01</span>
            <div className="about-value-icon">✳</div>
            <h3>Thoughtful spaces</h3>
            <p>
              We care about the feeling of a room as much
              as the things inside it.
            </p>
          </article>

          <article>
            <span className="about-value-number">02</span>
            <div className="about-value-icon">⌂</div>
            <h3>Warm hospitality</h3>
            <p>
              Clear communication, a personal touch and
              help when you need it.
            </p>
          </article>

          <article>
            <span className="about-value-number">03</span>
            <div className="about-value-icon">✧</div>
            <h3>Everyday comfort</h3>
            <p>
              Well-equipped homes with the essentials
              for a smooth, comfortable stay.
            </p>
          </article>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="about-approach-new">
        <div className="about-approach-image">
          <img
            src="/images/studio-11.png"
            alt="Modern Hospitality furnished interior"
          />
        </div>

        <div className="about-approach-copy">
          <div className="eyebrow">
            <span /> THE WAY WE DO IT
          </div>

          <h2>
            Simple stays,
            <br />
            <em>thoughtfully managed.</em>
          </h2>

          <p>
            From comfortable interiors to clear communication,
            we want every part of your stay to feel simple,
            welcoming and convenient.
          </p>

          <ul>
            <li>Comfortable furnished spaces</li>
            <li>Practical everyday amenities</li>
            <li>Clear enquiry and communication process</li>
            <li>Support when you need it</li>
          </ul>

          <Link href="/properties" className="under-link">
            Explore our spaces ↗
          </Link>
        </div>
      </section>

    </main>
  );
}
