import { LegalLayout } from "@/components/legal/LegalLayout";

const TermsOfService = () => {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="January 30, 2026">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using Safe Spend ("the Service"), you agree to be bound by these Terms of
          Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
        </p>
        <p>
          These Terms apply to all visitors, users, and others who access or use the Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Description of Service</h2>
        <p className="mb-4">
          Safe Spend is a personal finance management application that helps users:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Track income and expenses</li>
          <li>Create and manage budgets</li>
          <li>Set and monitor savings goals</li>
          <li>Plan debt repayment strategies</li>
          <li>View net worth and financial reports</li>
          <li>Manually track accounts and organize financial data</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">User Accounts and Registration</h2>
        <p className="mb-4">To use certain features, you must create an account. You agree to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain and update your information as needed</li>
          <li>Keep your password secure and confidential</li>
          <li>Accept responsibility for all activities under your account</li>
          <li>Notify us immediately of any unauthorized access</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">User Responsibilities</h2>
        <p className="mb-4">When using Safe Spend, you agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Violate any applicable laws or regulations</li>
          <li>Impersonate any person or entity</li>
          <li>Interfere with or disrupt the Service</li>
          <li>Attempt to gain unauthorized access to any systems</li>
          <li>Use the Service for any illegal or unauthorized purpose</li>
          <li>Transmit viruses or malicious code</li>
          <li>Collect user information without consent</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Financial Information Disclaimer</h2>
        <p className="mb-4">
          <strong>Safe Spend is not a financial advisor.</strong> The information, insights, and
          recommendations provided by the Service are for informational purposes only and should not
          be considered financial, investment, tax, or legal advice.
        </p>
        <p>
          You are solely responsible for your financial decisions. We recommend consulting with
          qualified financial professionals before making significant financial decisions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
        <p className="mb-4">
          The Service and its original content, features, and functionality are owned by Safe Spend
          and are protected by international copyright, trademark, and other intellectual property
          laws.
        </p>
        <p>
          You may not copy, modify, distribute, sell, or lease any part of the Service without our
          prior written consent.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Disclaimer of Warranties</h2>
        <p className="mb-4">
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Implied warranties of merchantability</li>
          <li>Fitness for a particular purpose</li>
          <li>Non-infringement</li>
          <li>Accuracy or completeness of information</li>
          <li>Uninterrupted or error-free operation</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
        <p className="mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, SAFE SPEND SHALL NOT BE LIABLE FOR ANY INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Loss of profits or revenue</li>
          <li>Loss of data</li>
          <li>Financial losses from decisions made using the Service</li>
          <li>Business interruption</li>
          <li>Any other damages arising from use of the Service</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Safe Spend and its officers, directors, employees,
          and agents from any claims, damages, losses, liabilities, and expenses (including legal
          fees) arising from your use of the Service or violation of these Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Termination</h2>
        <p className="mb-4">
          We may terminate or suspend your account and access to the Service immediately, without
          prior notice, for any reason, including if you breach these Terms.
        </p>
        <p>
          Upon termination, your right to use the Service will cease immediately. You may export your
          data before termination.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the United
          States, without regard to its conflict of law provisions. Any disputes arising from these
          Terms will be resolved in the courts of Delaware.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will notify users of significant
          changes via email or through the Service. Your continued use of the Service after changes
          constitutes acceptance of the new Terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Email: legal@safespend.app</li>
          <li>Visit our <a href="/contact" className="text-primary hover:underline">Contact page</a></li>
        </ul>
      </section>
    </LegalLayout>
  );
};

export default TermsOfService;
