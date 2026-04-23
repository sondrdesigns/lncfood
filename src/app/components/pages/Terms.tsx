import Link from "next/link";

const LAST_UPDATED = "April 22, 2026";

export default function Terms() {
  return (
    <div className="pt-20">
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-sm uppercase tracking-wider text-white/70 mb-4" style={{ fontWeight: 600 }}>
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>
            Terms of Service
          </h1>
          <p className="text-lg text-white/80">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose max-w-none text-foreground/80 leading-relaxed space-y-10">
            <div>
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your use of <strong>lncfood.com</strong> and the
                related services offered by L&amp;C Food Distribution (&ldquo;L&amp;C,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing the website or submitting an application,
                you agree to these Terms. If you don&rsquo;t agree, please don&rsquo;t use the site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                1. Who Can Use the Site
              </h2>
              <p>
                The site is intended for business use by food-service operators, retailers, and vendors in the
                territories L&amp;C serves. You represent that you are at least 18 years old and are authorized
                to act on behalf of the business you identify in any form you submit.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                2. Applications &amp; Information You Submit
              </h2>
              <p>
                When you complete a partner or credit application, you agree that:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>All information you provide is accurate, current, and complete.</li>
                <li>
                  You authorize L&amp;C to verify the information, including contacting the bank and trade
                  references listed on a credit application.
                </li>
                <li>
                  Submission of an application does not by itself create a customer or vendor relationship, and
                  does not guarantee that credit will be extended.
                </li>
                <li>
                  We may decline any application at our discretion, and we may terminate an account for
                  non-payment, misuse, or violation of these Terms.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                3. Credit Terms
              </h2>
              <p>
                If we approve a credit account, the specific payment terms, credit limit, and invoicing cadence
                will be set out in your account agreement. Late payments may be subject to service charges to the
                extent permitted by law. Personal guarantees, if requested, will be in a separate document.
              </p>
              <p className="mt-4 text-sm text-foreground/60 italic">
                [Business to verify: add default net terms and late-fee rate, or link to the credit agreement PDF.]
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                4. Orders, Pricing &amp; Availability
              </h2>
              <p>
                Product descriptions, photos, and prices on the site are for informational purposes. Actual pricing
                is set in our order-management system and confirmed on your invoice. Product availability can
                change without notice based on supply, seasonality, and regional factors.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                5. Acceptable Use
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Attempt to gain unauthorized access to any part of the site or our systems</li>
                <li>Interfere with the site&rsquo;s operation, scrape it in bulk, or circumvent security</li>
                <li>Use the site to send spam, malware, or unlawful content</li>
                <li>Use our name, logos, or content without our written permission</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                6. Intellectual Property
              </h2>
              <p>
                The site, including its design, text, graphics, logos, and software, is owned by L&amp;C or its
                licensors and is protected by copyright, trademark, and other laws. We grant you a limited,
                non-exclusive, non-transferable license to use the site for its intended business purpose.
                All other rights are reserved.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                7. Third-Party Links
              </h2>
              <p>
                The site may link to third-party websites or tools. We don&rsquo;t control those sites and
                aren&rsquo;t responsible for their content or practices. Your use of any linked site is at your
                own risk and subject to that site&rsquo;s terms and policies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                8. Disclaimers
              </h2>
              <p>
                The site is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; To the fullest extent
                permitted by law, L&amp;C disclaims all warranties, express or implied, including merchantability,
                fitness for a particular purpose, and non-infringement. We do not warrant that the site will be
                uninterrupted, error-free, or free of harmful components.
              </p>
              <p className="mt-4">
                Nothing in these Terms limits any warranty or remedy expressly stated in your separate purchase
                agreement or invoice for products delivered by L&amp;C.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                9. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, L&amp;C and its officers, employees, and agents will not
                be liable for any indirect, incidental, consequential, special, or punitive damages arising out of
                or related to your use of the site. Our total liability for any claim arising from the site will
                not exceed one hundred U.S. dollars (US$100).
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                10. Indemnification
              </h2>
              <p>
                You agree to defend and indemnify L&amp;C against any claims, losses, or expenses arising from
                (a) information you submit that turns out to be inaccurate or unauthorized, or (b) your breach of
                these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                11. Governing Law &amp; Disputes
              </h2>
              <p>
                These Terms are governed by the laws of the State of California, without regard to conflict-of-laws
                rules. Any dispute will be brought exclusively in the state or federal courts located in Los Angeles
                County, California, and you consent to personal jurisdiction there.
              </p>
              <p className="mt-4 text-sm text-foreground/60 italic">
                [Business to verify: confirm venue (Los Angeles County) and whether to add a binding-arbitration
                clause.]
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                12. Changes to These Terms
              </h2>
              <p>
                We may update these Terms from time to time. When we do, we will change the &ldquo;Last
                updated&rdquo; date above. Your continued use of the site after changes take effect means you
                accept the updated Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                13. Contact
              </h2>
              <div className="mt-4 rounded-2xl bg-secondary p-6">
                <p><strong>L&amp;C Food Distribution</strong></p>
                <p className="text-sm text-foreground/60 italic">
                  [Business to verify: add registered mailing address]
                </p>
                <p className="mt-3">
                  Email: <a className="text-primary hover:underline" href="mailto:info@lncfood.com">info@lncfood.com</a>
                </p>
                <p>
                  Phone: <a className="text-primary hover:underline" href="tel:6264657855">(626) 465-7855</a>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-foreground/60">
                See also our <Link className="text-primary hover:underline" href="/privacy">Privacy Policy</Link>
                {" "}and <Link className="text-primary hover:underline" href="/accessibility">Accessibility Statement</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
