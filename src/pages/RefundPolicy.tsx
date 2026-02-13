import { LegalLayout } from "@/components/legal/LegalLayout";
import { SEOHead } from "@/components/seo/SEOHead";

const RefundPolicy = () => {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="February 13, 2026">
      <SEOHead />

      <div className="bg-muted/30 border border-border rounded-lg p-4 mb-8">
        <p className="text-sm font-medium text-foreground mb-1">TL;DR</p>
        <p className="text-sm text-muted-foreground">
          We offer a 7-day free trial so you can try Safe Spend risk-free. After the trial, all payments are final. You can cancel anytime from your account settings — your access continues until the end of your billing period. If there's a billing error, contact us within 14 days and we'll make it right.
        </p>
      </div>

      <p className="text-muted-foreground mb-4">
        <strong>Website:</strong> <a href="https://gosafespend.com" className="text-primary hover:underline">https://gosafespend.com</a><br />
        <strong>Contact:</strong> <a href="mailto:info@gosafespend.com" className="text-primary hover:underline">info@gosafespend.com</a>
      </p>

      <p>
        This Refund Policy forms part of the <a href="/terms-of-service" className="text-primary hover:underline">Terms of Service</a> governing your use of Safe Spend. By subscribing, you acknowledge that you have read, understood, and agreed to this Refund Policy.
      </p>

      <h2>1. Free Trial and Informed Consent</h2>
      <p>
        Safe Spend offers a <strong>7-day free trial</strong> so you can fully evaluate the platform before any payment is due. By starting a free trial, you agree that:
      </p>
      <ul>
        <li>You are providing valid payment authorization.</li>
        <li>Your subscription will automatically convert to a paid plan at the end of the 7-day trial unless you cancel beforehand.</li>
        <li>You are responsible for canceling before the trial ends if you do not wish to be charged.</li>
        <li>We provide clear notice of trial length and billing terms at signup.</li>
      </ul>
      <p>
        <strong>How to cancel:</strong> Go to <em>Account Settings → Subscription → Cancel Plan</em>, or email us at{" "}
        <a href="mailto:info@gosafespend.com" className="text-primary hover:underline">info@gosafespend.com</a>.
      </p>

      <h2>2. Automatic Renewal and Recurring Billing</h2>
      <p>By purchasing a subscription, you authorize Safe Spend to:</p>
      <ul>
        <li>Charge your payment method on a recurring basis (monthly or annually, as selected).</li>
        <li>Continue charging at the stated interval until you cancel.</li>
        <li>Process payments through our third-party payment processors.</li>
      </ul>
      <p>
        Recurring billing continues until you cancel through your account settings or by contacting us. After cancellation, <strong>your access continues until the end of your current billing period</strong> — you won't lose access immediately.
      </p>

      <h2>3. No Refund Policy</h2>
      <p>
        Because Safe Spend is a digital service with immediate access and a free trial period, <strong>all payments are final once processed</strong>. We do not provide refunds for:
      </p>
      <ul>
        <li>Subscription fees after trial conversion</li>
        <li>Partial billing periods or unused time</li>
        <li>Failure to cancel before the trial ends</li>
        <li>Account inactivity or change of mind</li>
      </ul>
      <p>
        Cancellation stops future billing but does not reverse prior charges.
      </p>

      <h2>4. Billing Disputes and Errors</h2>
      <p>
        If you believe a charge was made in error — including duplicate charges or unauthorized transactions — please contact us at{" "}
        <a href="mailto:info@gosafespend.com" className="text-primary hover:underline">info@gosafespend.com</a>{" "}
        within <strong>14 days</strong> of the transaction date.
      </p>
      <p>
        We will investigate promptly and correct any verified billing errors.
      </p>

      <h2>5. Chargebacks and Payment Disputes</h2>
      <p>
        We kindly ask that you contact us before initiating a chargeback with your bank or payment provider. This helps us resolve issues faster and avoid unnecessary account disruption.
      </p>
      <p>If a chargeback is initiated:</p>
      <ul>
        <li>We may need to suspend your account during the dispute process.</li>
        <li>We reserve the right to dispute chargebacks by providing transaction evidence, including account registration records, login history, usage activity, and payment authorization confirmation.</li>
        <li>Fraudulent or abusive chargebacks may result in permanent account termination.</li>
      </ul>

      <h2>6. Exceptional Circumstances</h2>
      <p>
        While all sales are final, we may consider refund requests in exceptional circumstances at our sole discretion. Any refund granted is determined on a case-by-case basis and does not create an obligation or precedent for future refunds.
      </p>

      <h2>7. Consumer Rights</h2>
      <p>
        If you are located in a jurisdiction that provides mandatory consumer protection rights (such as the EU/UK 14-day cooling-off period), those statutory rights apply to the extent required by law. Please contact us if you believe your statutory rights entitle you to a refund.
      </p>

      <h2>8. Governing Law</h2>
      <p>
        This Refund Policy is governed by the laws of the State of Delaware, United States, without regard to conflict of law principles.
      </p>

      <h2>9. Policy Modifications</h2>
      <p>
        We may update this Refund Policy from time to time. Continued use of the service after changes are posted constitutes acceptance of the updated policy.
      </p>

      <h2>10. Contact Information</h2>
      <p>
        For questions about this Refund Policy, email us at{" "}
        <a href="mailto:info@gosafespend.com" className="text-primary hover:underline">info@gosafespend.com</a>.
      </p>
    </LegalLayout>
  );
};

export default RefundPolicy;
