import { Link } from "react-router-dom";
import { ApplyLink } from "../components/ApplyLink";
import { OFFER_NAME } from "../lib/apply";

/**
 * A landing page. The only real action is to apply. Anyone who wants more can
 * follow one of the two quiet links to the method and the about page.
 */
export function HomePage() {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-28 pb-24 text-center">
      <p className="text-sm uppercase tracking-widest text-gold mb-6">{OFFER_NAME} by Platform Fix</p>
      <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
        Who have you gone quiet on, and what is it worth?
      </h1>
      <div className="text-lg text-cool-grey mb-6 space-y-1">
        <p>I spend seven days in your business.</p>
        <p>The week is built around that one question, answered from your own data.</p>
        <p>
          Everything goes into one place <span className="text-gold">you own.</span>
        </p>
        <p>After that, a monthly retainer keeps it healthy.</p>
      </div>
      <div className="text-cool-grey mb-12 space-y-1">
        <p>For founders with a team of two to five.</p>
        <p>If the business only works because it lives in your head, this is for you.</p>
      </div>
      <ApplyLink />
      <div className="text-sm text-cool-grey mt-6 space-y-1">
        <p>Applying costs nothing and commits you to nothing.</p>
        <p>I am choosing three founders to start with.</p>
        <p>I have no founder case studies yet.</p>
        <p>I have run fifty-plus platform audits.</p>
      </div>
      <nav aria-label="More about the makeover" className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-cool-grey">
        <Link to="/method" className="hover:text-gold underline-offset-4 hover:underline">
          The Method - How We Do It
        </Link>
        <Link to="/about" className="hover:text-gold underline-offset-4 hover:underline">
          The Host - About Steve
        </Link>
      </nav>
    </section>
  );
}
