import Link from "next/link";

const LAST_UPDATED = "April 22, 2026";

export default function Accessibility() {
  return (
    <div className="pt-20">
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-sm uppercase tracking-wider text-white/70 mb-4" style={{ fontWeight: 600 }}>
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>
            Accessibility Statement
          </h1>
          <p className="text-lg text-white/80">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose max-w-none text-foreground/80 leading-relaxed space-y-10">
            <div>
              <p>
                L&amp;C Food Distribution is committed to making <strong>lncfood.com</strong> accessible to as many
                people as possible, including people with disabilities. We believe that clear, usable digital
                services are part of treating our partners fairly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                Our Standard
              </h2>
              <p>
                We aim to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1, Level AA</strong>,
                published by the World Wide Web Consortium (W3C). These guidelines explain how to make web content
                more accessible for people with a wide range of disabilities, including visual, auditory, physical,
                speech, cognitive, and neurological impairments.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                What We&rsquo;ve Done
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Structured pages with clear headings, landmarks, and reading order</li>
                <li>Labelled every form field and provided visible focus indicators for keyboard users</li>
                <li>Paired interactive elements with accessible names (e.g., &ldquo;Open menu,&rdquo; &ldquo;Facebook&rdquo;)</li>
                <li>Used color combinations tested for contrast against the WCAG AA thresholds</li>
                <li>Provided descriptive alternative text for informational images</li>
                <li>Ensured the site works at narrow widths and with 200% zoom</li>
                <li>Designed navigation that can be operated entirely by keyboard</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                Known Limitations
              </h2>
              <p>
                Parts of the site are still being improved. We&rsquo;re aware that some embedded third-party
                content and legacy images may not yet fully meet WCAG 2.1 AA. We&rsquo;re working to address
                these as we update the site.
              </p>
              <p className="mt-4 text-sm text-foreground/60 italic">
                [Business to verify: list any known issues currently being remediated, or remove this paragraph
                if none.]
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                Assistive Technology Compatibility
              </h2>
              <p>
                We test the site with current versions of major browsers (Chrome, Edge, Firefox, Safari) and with
                common screen readers (NVDA, VoiceOver). If you&rsquo;re using older software or a combination we
                haven&rsquo;t tested, some features may not work as expected &mdash; please let us know.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                Report a Barrier or Request Help
              </h2>
              <p>
                If you run into an accessibility barrier, or if you need help completing a partner or credit
                application in another format, please contact us. We&rsquo;ll work with you to provide the
                information or service you need.
              </p>
              <div className="mt-4 rounded-2xl bg-secondary p-6">
                <p>
                  Email:{" "}
                  <a className="text-primary hover:underline" href="mailto:accessibility@lncfood.com">
                    accessibility@lncfood.com
                  </a>
                </p>
                <p>
                  Phone: <a className="text-primary hover:underline" href="tel:6264657855">(626) 465-7855</a>
                </p>
                <p className="mt-3 text-sm text-foreground/70">
                  Please include the page URL and a short description of the issue. We aim to respond within five
                  business days.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                Ongoing Effort
              </h2>
              <p>
                Accessibility is an ongoing process. We review new features for accessibility before they ship,
                and we revisit existing pages periodically. Thank you for helping us build a site that works for
                everyone.
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-foreground/60">
                See also our <Link className="text-primary hover:underline" href="/privacy">Privacy Policy</Link>
                {" "}and <Link className="text-primary hover:underline" href="/terms">Terms of Service</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
