import { LegalLayout } from "@/components/legal/LegalLayout";

const CookiesPolicy = () => {
  return (
    <LegalLayout title="Cookies Policy" lastUpdated="January 30, 2026">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">What Are Cookies</h2>
        <p className="mb-4">
          Cookies are small text files that are placed on your computer or mobile device when you
          visit a website. They are widely used to make websites work more efficiently and to provide
          information to website owners.
        </p>
        <p>
          Cookies help us remember your preferences, understand how you use Safe Spend, and improve
          your overall experience.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">How We Use Cookies</h2>
        <p className="mb-4">Safe Spend uses the following types of cookies:</p>

        <h3 className="text-lg font-medium mb-2">Essential Cookies</h3>
        <p className="mb-4">
          These cookies are necessary for the website to function properly. They enable core
          functionality such as:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>User authentication and session management</li>
          <li>Security features to protect your account</li>
          <li>Remembering your login status</li>
          <li>Loading balancing and server optimization</li>
        </ul>

        <h3 className="text-lg font-medium mb-2">Analytics Cookies</h3>
        <p className="mb-4">
          These cookies help us understand how visitors interact with our website by collecting
          anonymous information:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Pages visited and time spent on each page</li>
          <li>Features used and user flows</li>
          <li>Error occurrences and performance issues</li>
          <li>General geographic location (country/region level)</li>
        </ul>

        <h3 className="text-lg font-medium mb-2">Preference Cookies</h3>
        <p className="mb-4">
          These cookies remember your settings and preferences to personalize your experience:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Theme preference (light/dark mode)</li>
          <li>Language settings</li>
          <li>Dashboard layout preferences</li>
          <li>Currency and date format preferences</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Third-Party Cookies</h2>
        <p className="mb-4">
          Some cookies may be placed by third-party services that appear on our pages. These include:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <strong>Analytics providers</strong> (e.g., Google Analytics) to help us understand usage
            patterns
          </li>
          <li>
            <strong>Cloud infrastructure providers</strong> for secure data storage
          </li>
          <li>
            <strong>Error tracking services</strong> to help us identify and fix issues
          </li>
        </ul>
        <p>
          We do not control these third-party cookies. Please refer to the respective third party's
          privacy policy for more information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Cookie Duration</h2>
        <p className="mb-4">Cookies can be either session cookies or persistent cookies:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Session cookies:</strong> Temporary cookies that are deleted when you close your
            browser
          </li>
          <li>
            <strong>Persistent cookies:</strong> Remain on your device for a set period or until you
            delete them (typically 30 days to 1 year)
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Managing Your Cookie Preferences</h2>
        <p className="mb-4">
          You can control and manage cookies in several ways:
        </p>

        <h3 className="text-lg font-medium mb-2">Browser Settings</h3>
        <p className="mb-4">
          Most web browsers allow you to control cookies through their settings. You can:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Block all cookies</li>
          <li>Accept only first-party cookies</li>
          <li>Delete existing cookies</li>
          <li>Browse in "private" or "incognito" mode</li>
        </ul>

        <h3 className="text-lg font-medium mb-2">In-App Settings</h3>
        <p className="mb-4">
          Safe Spend provides cookie preference controls within the application settings where you can
          opt out of non-essential cookies while still using the service.
        </p>

        <p className="mb-4">
          <strong>Note:</strong> Blocking essential cookies may prevent Safe Spend from functioning
          properly. You may not be able to log in or access certain features.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
        <p>
          We may update this Cookies Policy from time to time to reflect changes in our practices or
          for legal, operational, or regulatory reasons. We will notify you of any material changes
          by updating the "Last updated" date at the top of this page.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Related Policies</h2>
        <p>
          For more details on how we handle your data, please see our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about our use of cookies, please contact us:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Email: privacy@safespend.app</li>
          <li>Visit our <a href="/contact" className="text-primary hover:underline">Contact page</a></li>
        </ul>
      </section>
    </LegalLayout>
  );
};

export default CookiesPolicy;
