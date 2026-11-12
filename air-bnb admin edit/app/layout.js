import "./globals.css";
import Link from "next/link";
export const metadata = {
  title: "Modern Hospitality | Thoughtful stays in Dwarka, Delhi",
  description:
    "Discover thoughtfully furnished studio and 2BHK stays at Ramphal Chowk, Dwarka Mor, Delhi. Enquire directly with Modern Hospitality.",
  metadataBase: new URL("https://www.modernhospitality.in"),
};
function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-mark">
          M<span>H</span>
        </span>
        <span>
          MODERN HOSPITALITY<small>STAYS, THOUGHTFULLY CURATED</small>
        </span>
      </Link>
     
<nav className="site-nav">
  <Link className="nav-link" href="/properties">
    Our spaces
  </Link>
  <Link className="nav-link" href="/about">
    Our story
  </Link>
  <Link className="nav-link" href="/location">
    Location
  </Link>
  <Link className="nav-link" href="/faq">
    FAQs
  </Link>
  <Link className="nav-link" href="/contact">
    Contact
  </Link>
</nav>

      <Link className="header-cta" href="/contact">
        Enquire now <span>↗</span>
      </Link>
    </header>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link className="brand brand-light" href="/">
          <span className="brand-mark">
            M<span>H</span>
          </span>
          <span>
            MODERN HOSPITALITY<small>STAYS, THOUGHTFULLY CURATED</small>
          </span>
        </Link>
        <p>
          Considered spaces. Warm hospitality.
          <br />A better way to stay in the city.
        </p>
      </div>
      <div>
        <b>Explore</b>
        <Link href="/properties">Our spaces</Link>
        <Link href="/about">Our story</Link>
        <Link href="/location">Location</Link>
        <Link href="/faq">FAQs</Link>
        <Link href="/list-your-property">List your property</Link>
      </div>
      <div>
        <b>Get in touch</b>
        <Link href="/contact">Contact us</Link>
        <span>
          Ramphal Chowk, Dwarka Mor
          <br />
          New Delhi, India
        </span>
        <Link className="footer-admin-link" href="/admin">
          Admin login <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Modern Hospitality. All rights reserved.{" "}
        <span>Made for memorable stays.</span>
      </div>
    </footer>
  );
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
