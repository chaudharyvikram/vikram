import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Simple back link instead of full header */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Home
        </Link>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-surface/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Privacy Policy
          </h1>

          <p className="text-gray-400 mb-8">
            <strong className="text-white">Last updated:</strong> January 2026
          </p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <p>
              Subvera respects your privacy. This Privacy Policy explains how information is handled when you use the Subvera
              mobile application.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information Storage</h2>
              <p className="mb-4">
                Subvera does not collect or store personal data on its own servers.
              </p>
              <p>
                All subscription-related data you enter is stored locally on your device and automatically synced using your
                private iCloud account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">iCloud Sync</h2>
              <p className="mb-4">
                Subvera uses Apple's iCloud service to sync your app data across your devices.
              </p>
              <p className="mb-4">
                This syncing is enabled by default and uses your private iCloud storage. Subvera does not have access to your
                iCloud data and cannot view, access, or process it.
              </p>
              <p>
                Data stored in iCloud is protected by Apple's security and privacy mechanisms and is associated with your Apple
                ID.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Advertising</h2>
              <p className="mb-4">
                Subvera displays advertisements provided by <strong className="text-white">Google AdMob</strong>, a third-party advertising service.
              </p>
              <p className="mb-4">
                AdMob may collect and use certain information to provide and improve advertisements, including:
              </p>
              <ul className="list-disc ml-6 space-y-2 mb-4">
                <li>Device identifiers such as the Advertising Identifier</li>
                <li>IP address (used for approximate location)</li>
                <li>Ad interaction and usage data</li>
              </ul>
              <p className="mb-4">
                This data is used by Google for advertising delivery, analytics, and fraud prevention purposes.
              </p>
              <p>
                Subvera does not access or control the data collected by AdMob.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Ad Personalization</h2>
              <p className="mb-4">
                Advertisements shown in Subvera may be personalized or non-personalized depending on your device settings and
                regional regulations.
              </p>
              <p className="mb-4">
                You can manage ad personalization through your device settings:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>iOS: Settings → Privacy & Security → Tracking</li>
                <li>Apple Advertising: Settings → Privacy & Security → Apple Advertising</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Privacy Policies</h2>
              <p className="mb-4">
                Google's data practices are governed by its own Privacy Policy:
              </p>
              <p>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary transition-colors underline"
                >
                  https://policies.google.com/privacy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Payments</h2>
              <p>
                Subvera does not process payments, subscriptions, or in-app purchases.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p>
                Your app data remains on your device and within your private iCloud storage. Advertising-related data is handled
                by Google AdMob in accordance with Google's security standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
              <p>
                Subvera does not knowingly collect personal information from children under the age of 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
              <p>
                This Privacy Policy may be updated from time to time. Any changes will be reflected on this page with an updated
                revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, you can contact us at:
              </p>
              <p>
                <strong className="text-white">Email:</strong>{' '}
                <a
                  href="mailto:support@subvera.app"
                  className="text-primary hover:text-secondary transition-colors underline"
                >
                  support@subvera.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Vikram Chaudhary.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
