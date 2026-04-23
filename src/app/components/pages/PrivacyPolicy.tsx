import Link from "next/link";

const LAST_UPDATED = "April 22, 2026";

export default function PrivacyPolicy() {
  return (
    <div className="pt-20">
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-sm uppercase tracking-wider text-white/70 mb-4" style={{ fontWeight: 600 }}>
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>
            Privacy Policy
          </h1>
          <p className="text-lg text-white/80">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose max-w-none text-foreground/80 leading-relaxed space-y-10">
            <div>
              <p>
                L&amp;C Food Distribution (&ldquo;L&amp;C,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy.
                This policy explains what information we collect through <strong>lncfood.com</strong>, how we use it,
                who we share it with, and the choices you have. It applies to visitors, applicants, customers,
                vendors, and job candidates who interact with our website.
              </p>
              <p className="mt-4">
                If you are a California resident, the <em>Your California Privacy Rights</em> section below describes
                the additional rights you have under the California Consumer Privacy Act (CCPA), as amended by the
                California Privacy Rights Act (CPRA).
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                1. Information We Collect
              </h2>
              <p>
                We only collect information that you choose to provide, or that we need to operate the site and
                respond to your requests. Specifically:
              </p>
              <h3 className="text-lg mt-6 mb-2 text-foreground" style={{ fontWeight: 600 }}>
                Partner Application
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>First and last name</li>
                <li>Business name and business type (customer or vendor)</li>
                <li>Cell phone and business phone number</li>
                <li>Business street address, city, state, and ZIP code</li>
                <li>How you found us</li>
              </ul>
              <h3 className="text-lg mt-6 mb-2 text-foreground" style={{ fontWeight: 600 }}>
                Credit Application
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Business legal name, DBA, Employer Identification Number (EIN), and business type</li>
                <li>Years in business and estimated monthly purchase volume</li>
                <li>Bank name and the last four digits of your business bank account</li>
                <li>Two trade references (company name and phone)</li>
                <li>Authorized signer&rsquo;s name and title</li>
              </ul>
              <h3 className="text-lg mt-6 mb-2 text-foreground" style={{ fontWeight: 600 }}>
                Careers &amp; general inquiries
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Any information you include when you email us, call us, or apply for a role</li>
              </ul>
              <h3 className="text-lg mt-6 mb-2 text-foreground" style={{ fontWeight: 600 }}>
                Automatically collected
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Standard web logs (IP address, browser type, pages visited, date and time)</li>
                <li>
                  Cookies and similar technologies used by our hosting and analytics providers to keep the site
                  working and to understand aggregate usage
                </li>
              </ul>
              <p className="mt-4 text-sm text-foreground/60 italic">
                [Business to verify: list any analytics or marketing tools in use — e.g., Google Analytics, Meta
                Pixel, HubSpot — and confirm cookie categories.]
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                2. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>Review partner and credit applications and set up your account</li>
                <li>Verify business identity, bank references, and trade references</li>
                <li>Route your application to the correct regional branch</li>
                <li>Communicate with you about orders, deliveries, account status, and support</li>
                <li>Comply with tax, accounting, and other legal obligations</li>
                <li>Detect and prevent fraud or misuse of our systems</li>
                <li>Improve the website and our services</li>
              </ul>
              <p className="mt-4">
                We do <strong>not</strong> use your information to make automated decisions that produce legal or
                similarly significant effects about you.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                3. How We Share Information
              </h2>
              <p>
                We do not sell your personal information, and we do not share it for cross-context behavioral
                advertising. We disclose information only in these situations:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>
                  <strong>Service providers</strong> acting on our behalf — for example, our hosting provider,
                  email platform, payment processor, credit verification services, and IT support. They are bound
                  by contract to use your information only for the services they provide to us.
                </li>
                <li>
                  <strong>Trade and bank references</strong> you list on a credit application, so we can verify
                  the information you provided.
                </li>
                <li>
                  <strong>Legal requirements</strong> — when we&rsquo;re required to respond to subpoenas, court
                  orders, or lawful requests, or to protect our rights, property, or safety.
                </li>
                <li>
                  <strong>Business transfers</strong> — if L&amp;C is involved in a merger, acquisition, or sale
                  of assets, your information may transfer as part of that transaction.
                </li>
              </ul>
              <p className="mt-4 text-sm text-foreground/60 italic">
                [Business to verify: list the specific categories of service providers used (e.g., Next.js hosting
                on Vercel, HubSpot CRM, QuickBooks, Experian Business Credit) before publishing.]
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                4. Data Retention
              </h2>
              <p>
                We keep application and account records for as long as you remain a customer or vendor, and
                afterwards for the period required to comply with tax, accounting, and contract-enforcement
                obligations &mdash; generally <em>[Business to verify: typically 7 years for financial records]</em>.
                Applications that do not result in an account are retained for <em>[Business to verify: e.g., 24
                months]</em> and then deleted or anonymized.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                5. How We Protect Your Information
              </h2>
              <p>
                We use reasonable administrative, technical, and physical safeguards to protect the information
                you submit, including encrypted connections (HTTPS/TLS) on our website, access controls on our
                internal systems, and restricted handling of sensitive credit-application data. No method of
                transmission over the internet is 100% secure, so we cannot guarantee absolute security.
              </p>
              <p className="mt-4">
                Only the last four digits of a bank account number are collected through the credit application.
                We do not request full account numbers, Social Security numbers, or passwords through our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                6. Your California Privacy Rights (CCPA/CPRA)
              </h2>
              <p>
                If you are a California resident, you have the following rights with respect to your personal
                information:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>
                  <strong>Right to know</strong> what personal information we collect, use, disclose, and (if
                  applicable) sell or share
                </li>
                <li><strong>Right to access</strong> a copy of the personal information we hold about you</li>
                <li><strong>Right to correct</strong> inaccurate personal information</li>
                <li><strong>Right to delete</strong> personal information, subject to legal exceptions</li>
                <li>
                  <strong>Right to limit</strong> use and disclosure of sensitive personal information to what is
                  necessary to provide our services
                </li>
                <li>
                  <strong>Right to opt out</strong> of the sale or sharing of personal information &mdash; L&amp;C
                  does not sell or share personal information, so there is nothing to opt out of
                </li>
                <li><strong>Right to non-discrimination</strong> for exercising any of these rights</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, email <a className="text-primary hover:underline" href="mailto:privacy@lncfood.com">privacy@lncfood.com</a> or
                call <a className="text-primary hover:underline" href="tel:6264657855">(626) 465-7855</a>.
                We will verify your request by matching the information you provide against the records we hold.
                You may use an authorized agent; written permission will be required.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                7. Do Not Sell or Share My Personal Information
              </h2>
              <p>
                L&amp;C Food Distribution does not sell personal information and does not share personal
                information for cross-context behavioral advertising, as those terms are defined under
                California law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                8. Cookies &amp; Tracking
              </h2>
              <p>
                The website uses cookies that are necessary for the site to function and, where enabled, analytics
                cookies that help us understand how visitors use the site. You can control cookies through your
                browser settings; blocking some cookies may affect how parts of the site work.
              </p>
              <p className="mt-4">
                We honor the Global Privacy Control (GPC) signal as an opt-out of sale/sharing of personal
                information for California residents.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                9. Children&rsquo;s Privacy
              </h2>
              <p>
                Our services are directed to businesses. We do not knowingly collect personal information from
                children under 16. If you believe a child has provided us with personal information, please
                contact us and we will delete it.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                10. Changes to This Policy
              </h2>
              <p>
                We may update this policy from time to time. When we do, we will change the &ldquo;Last
                updated&rdquo; date at the top of the page. Material changes will be highlighted on the site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                11. Contact Us
              </h2>
              <p>
                Questions or requests about this policy? Reach us at:
              </p>
              <div className="mt-4 rounded-2xl bg-secondary p-6">
                <p><strong>L&amp;C Food Distribution</strong></p>
                <p className="text-sm text-foreground/60 italic">
                  [Business to verify: add registered mailing address]
                </p>
                <p className="mt-3">
                  Email: <a className="text-primary hover:underline" href="mailto:privacy@lncfood.com">privacy@lncfood.com</a>
                </p>
                <p>
                  Phone: <a className="text-primary hover:underline" href="tel:6264657855">(626) 465-7855</a>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-foreground/60">
                See also our <Link className="text-primary hover:underline" href="/terms">Terms of Service</Link>
                {" "}and <Link className="text-primary hover:underline" href="/accessibility">Accessibility Statement</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
