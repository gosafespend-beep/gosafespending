import { LegalLayout } from "@/components/legal/LegalLayout";

const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="January 30, 2026">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4">
          At Safe Spend, we take your privacy seriously. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our personal finance application
          and related services.
        </p>
        <p>
          Please read this privacy policy carefully. By using Safe Spend, you consent to the practices
          described in this policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
        
        <h3 className="text-lg font-medium mb-2">Personal Information</h3>
        <p className="mb-4">
          We may collect personal information that you voluntarily provide when registering for an account,
          including:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Email address</li>
          <li>Name</li>
          <li>Password (encrypted)</li>
          <li>Profile preferences</li>
        </ul>

        <h3 className="text-lg font-medium mb-2">Financial Information</h3>
        <p className="mb-4">
          The financial data you choose to enter may include:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Transaction records</li>
          <li>Account balances</li>
          <li>Account names and types</li>
          <li>Budget categories</li>
        </ul>
        <p className="mb-4">
          <strong>Important:</strong> Safe Spend is a manual-entry app. You control what data you add, and we never access your bank accounts directly.
        </p>

        <h3 className="text-lg font-medium mb-2">Usage Data</h3>
        <p className="mb-4">
          We automatically collect certain information when you use our service, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Device information (browser type, operating system)</li>
          <li>IP address</li>
          <li>Pages visited and features used</li>
          <li>Time spent on the application</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="mb-4">We use the collected information to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide and maintain our service</li>
          <li>Personalize your experience</li>
          <li>Process and categorize your transactions</li>
          <li>Generate insights and reports about your finances</li>
          <li>Send you updates and notifications (with your consent)</li>
          <li>Improve our application and develop new features</li>
          <li>Detect and prevent fraud or unauthorized access</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Data Security</h2>
        <p className="mb-4">
          We implement industry-standard security measures to protect your data:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>256-bit AES encryption for data at rest</li>
          <li>TLS 1.3 encryption for data in transit</li>
          <li>Regular security audits and penetration testing</li>
          <li>Secure, SOC 2 compliant data centers</li>
          <li>Two-factor authentication (optional)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
        <p className="mb-4">
          We may share your information with trusted third-party service providers who assist us in:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Cloud hosting and data storage</li>
          <li>Analytics and performance monitoring</li>
          <li>Customer support services</li>
        </ul>
        <p>
          These providers are bound by confidentiality agreements and are only permitted to use your
          data as necessary to provide services to us.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
          <li><strong>Correction:</strong> Request correction of inaccurate personal data</li>
          <li><strong>Deletion:</strong> Request deletion of your personal data</li>
          <li><strong>Export:</strong> Export your data in a machine-readable format</li>
          <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
          <li><strong>Delete data:</strong> Remove your financial records at any time</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Children's Privacy</h2>
        <p>
          Safe Spend is not intended for users under 18 years of age. We do not knowingly collect
          personal information from children. If you believe we have collected information from a
          minor, please contact us immediately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new policy on this page and updating the "Last updated" date. We encourage you
          to review this policy periodically.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Email: privacy@safespend.app</li>
          <li>Visit our <a href="/contact" className="text-primary hover:underline">Contact page</a></li>
        </ul>
      </section>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
