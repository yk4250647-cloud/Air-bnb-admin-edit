import Link from "next/link";
import PropertyCard from "../components/PropertyCard";
import { getPublicProperties } from "../lib/property-data";
import StaySearch from "../components/StaySearch";
export const dynamic = "force-dynamic";
export default async function Home() {
  const properties = await getPublicProperties();
  return (
    <main>
      <section className="hero">
        <div className="hero-image">
          <img
            src="/images/signature-2bhk-1.png"
            alt="Warm, considered apartment interior"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <div className="eyebrow light-eyebrow">
            <span /> A MORE THOUGHTFUL WAY TO STAY
          </div>
          <h1>
            Come in.
            <br />
            <em>Feel at home.</em>
          </h1>
          <p>
            Beautifully considered spaces in Dwarka, Delhi — made for the way
            you want to stay.
          </p>
          <div className="hero-actions">
            <Link className="button button-cream" href="/properties">
              Explore our spaces <span>↗</span>
            </Link>
            <Link className="text-link light-link" href="/about">
              Discover our story
            </Link>
          </div>
        </div>
        <div className="hero-foot">
          <span>01 — 04 / CURATED RESIDENCES</span>
          <span>RAMPHAL CHOWK · DWARKA MOR · NEW DELHI</span>
        </div>
      </section>
      <StaySearch />
      <section className="intro section-wrap">
        <div className="eyebrow">
          <span /> THE MODERN HOSPITALITY DIFFERENCE
        </div>
        <div className="intro-grid">
          <h2>
            Not just a place
            <br />
            to stay.{" "}
            <em>
              A place
              <br />
              to belong.
            </em>
          </h2>
          <div>
            <p className="lead">
              We believe the best stays feel effortless. Spaces that are
              thoughtfully furnished, welcoming from the moment you arrive, and
              equipped for the little things that make a difference.
            </p>
            <p>
              Whether you’re visiting for a few days, spending time with family
              or settling in for longer, find a space that feels just right.
            </p>
            <Link className="under-link" href="/about">
              A little more about us <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="collection section-wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span /> FIND YOUR SPACE
            </div>
            <h2>
              Our <em>collection</em>
            </h2>
          </div>
          <Link className="under-link" href="/properties">
            View all spaces <span>↗</span>
          </Link>
        </div>
        <div className="property-grid">
          {properties.map((p, i) => (
            <PropertyCard p={p} index={i} key={p.slug} />
          ))}
        </div>
      </section>
      <section className="statement">
        <div className="statement-image">
          <img
            src="/images/signature-2bhk-7.png"
            alt="Thoughtfully furnished bedroom"
          />
        </div>
        <div className="statement-copy">
          <div className="eyebrow light-eyebrow">
            <span /> THE DETAILS MATTER
          </div>
          <h2>
            Comfort is in
            <br />
            <em>the considered.</em>
          </h2>
          <p>
            Fresh, welcoming interiors. Everyday essentials. A team that cares
            about the details — so you can focus on enjoying your time here.
          </p>
          <Link className="button button-outline" href="/properties">
            Find your space <span>↗</span>
          </Link>
        </div>
      </section>
      <section className="direct section-wrap">
        <div className="eyebrow">
          <span /> THE DIRECT ADVANTAGE
        </div>
        <div className="direct-grid">
          <h2>
            A better stay
            <br />
            <em>starts here.</em>
          </h2>
          <div className="benefits">
            <article>
              <b>01</b>
              <div>
                <h3>Personal communication</h3>
                <p>
                  Speak directly with our team for a more personal, considered
                  experience.
                </p>
              </div>
            </article>
            <article>
              <b>02</b>
              <div>
                <h3>Spaces with purpose</h3>
                <p>
                  Each residence is presented with the details you need to
                  choose confidently.
                </p>
              </div>
            </article>
            <article>
              <b>03</b>
              <div>
                <h3>Here when you need us</h3>
                <p>
                  From your first enquiry to the end of your stay, we're just a
                  message away.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="closing">
        <div className="eyebrow light-eyebrow">
          <span /> YOUR NEXT STAY BEGINS HERE
        </div>
        <h2>
          Make room for
          <br />
          <em>something good.</em>
        </h2>
        <Link className="button button-cream" href="/contact">
          Start an enquiry <span>↗</span>
        </Link>
      </section>
    </main>
  );
}
