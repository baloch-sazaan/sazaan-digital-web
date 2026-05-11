import React, { useEffect, useRef, useState } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { SEOMetadata, Reveal } from './primitives';

const SECTIONS = [
  { id: 'introduction', number: '01', title: 'INTRODUCTION' },
  { id: 'information-we-collect', number: '02', title: 'INFORMATION WE COLLECT' },
  { id: 'how-we-use', number: '03', title: 'HOW WE USE YOUR INFORMATION' },
  { id: 'third-party', number: '04', title: 'THIRD-PARTY SERVICES' },
  { id: 'cookies', number: '05', title: 'COOKIES' },
  { id: 'data-retention', number: '06', title: 'DATA RETENTION' },
  { id: 'data-security', number: '07', title: 'DATA SECURITY' },
  { id: 'your-rights', number: '08', title: 'YOUR RIGHTS' },
  { id: 'childrens-privacy', number: '09', title: 'CHILDREN\'S PRIVACY' },
  { id: 'international-data', number: '10', title: 'INTERNATIONAL DATA' },
  { id: 'changes', number: '11', title: 'CHANGES TO THIS POLICY' },
  { id: 'contact-us', number: '12', title: 'CONTACT US' },
];

const PrivacySection = ({ 
  id, 
  number, 
  title, 
  children 
}: { 
  id: string; 
  number: string; 
  title: string; 
  children: React.ReactNode 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id={id} ref={ref} className="relative py-12 md:py-16 first:pt-0 last:pb-0">
      <m.div 
        style={{ y }}
        className="absolute -top-6 -left-2 md:-left-8 pointer-events-none select-none"
      >
        <span className="font-barlow font-black text-[64px] md:text-[100px] text-[#111111] opacity-[0.04] leading-none">
          {number}
        </span>
      </m.div>
      <div className="relative z-10">
        <h2 className="font-barlow font-bold text-lg md:text-xl text-[#111111] uppercase tracking-tightest mb-6">
          {title}
        </h2>
        <div className="font-dmsans text-[#555555] leading-[1.6] space-y-4 text-sm md:text-[15px]">
          {children}
        </div>
      </div>
      <div className="mt-12 md:mt-16 border-b border-[#E2E2DE] opacity-50" />
    </section>
  );
};

export const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.1, 0.5], rootMargin: "-20% 0px -60% 0px" }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = isMobile ? 120 : 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const currentMonthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <m.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#F7F7F5] min-h-screen pt-32 pb-24 px-4"
    >
      <SEOMetadata 
        title="Privacy Policy | Data Security for Web & AI Services"
        description="Review the privacy policy for Sazaan Studios. Learn how we handle your data securely for our custom web design, AI automation, and lead generation services."
        keywords="Sazaan privacy policy, data protection Islamabad, website data security, AI automation privacy"
        canonical="https://sazaanstudio.space/privacy-policy"
        noindex={true}
      />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
        
        {/* Navigation Sidebar */}
        <aside className="hidden lg:block sticky top-32 max-h-[calc(100vh-160px)] overflow-y-auto pr-4 scrollbar-hide">
          <nav aria-label="Privacy policy sections">
            <ul className="space-y-4">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-start gap-3 text-left group transition-all duration-300 ${
                      activeSection === section.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    <span className="font-barlow font-bold text-sm tracking-widest text-[#111111] mt-0.5">
                      {section.number}
                    </span>
                    <span className={`font-dmsans font-medium text-[13px] uppercase tracking-wider leading-tight ${
                      activeSection === section.id ? 'text-[#111111]' : 'text-[#555555]'
                    }`}>
                      {section.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Mobile Navigation Pill Bar */}
        <div className="lg:hidden sticky top-[73px] -mx-4 px-4 w-[calc(100%+2rem)] z-40 bg-[#F7F7F5]/95 backdrop-blur-md border-b border-[#E2E2DE] overflow-x-auto scrollbar-hide py-3 flex gap-3 pointer-events-auto mb-8">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${
                activeSection === section.id 
                  ? 'bg-[#111111] text-white' 
                  : 'bg-[#E2E2DE]/50 text-[#555555]'
              }`}
            >
              {section.number} {section.id.split('-')[0]}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <Reveal>
          <div className="bg-white border border-[#E2E2DE] rounded-[16px] p-6 md:p-12 shadow-sm">
            <header className="mb-12">
              <h1 className="font-barlow font-black text-3xl md:text-[56px] text-[#111111] uppercase tracking-tightest leading-none mb-3">
                PRIVACY POLICY
              </h1>
              <p className="font-dmsans text-xs md:text-[14px] text-[#555555]">
                Last updated: {currentMonthYear}
              </p>
            </header>

            <PrivacySection id="introduction" number="01" title="INTRODUCTION">
              <p>This is the privacy policy of Sazaan Studios, a digital agency providing web design, development, local SEO, Google Business Profile optimization, business automation, and custom CRM solutions.</p>
              <p>This policy explains what data we collect, why we collect it, and how we handle it. By using our website or engaging our services, you agree to the practices described here.</p>
              <p>For any questions regarding your data, contact us at <a href="mailto:hello@sazaanstudio.space" className="text-[#111111] underline hover:opacity-70 transition-opacity">hello@sazaanstudio.space</a>.</p>
            </PrivacySection>

            <PrivacySection id="information-we-collect" number="02" title="INFORMATION WE COLLECT">
              <p>We collect information in two ways:</p>
              <h3 className="font-bold text-[#111111] mt-4 mb-2">Information you provide directly:</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>Name, email address, phone number, and business name when you fill out our contact form.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>Project details, business information, and requirements shared during discovery calls or consultations.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>Payment information processed through Payoneer (we do not store payment card details ourselves).</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>Any files, content, images, or materials you provide for website projects.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>Communication records (emails, messages).</span>
                </li>
              </ul>

              <h3 className="font-bold text-[#111111] mt-8 mb-2">Information collected automatically:</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>Browser type, device type, operating system.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>IP address and approximate location.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>Pages visited, time spent, click behavior on our website.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>Referral source (how you found us).</span>
                </li>
              </ul>
              <p className="mt-4 italic">This data is collected via Google Analytics and cookies.</p>
            </PrivacySection>

            <PrivacySection id="how-we-use" number="03" title="HOW WE USE YOUR INFORMATION">
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>To respond to your inquiries and contact form submissions.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>To provide our services: building websites, SEO optimization, automation setup, and CRM configuration.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>To send project updates, proposals, invoices, and service-related communications.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>To improve our website performance and user experience via analytics.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>To comply with legal obligations.</span>
                </li>
              </ul>
              <p className="mt-6">We do <strong>not</strong> use your information for marketing emails unless you explicitly opt in, and we do <strong>not</strong> sell, rent, or trade your personal data to any third party.</p>
            </PrivacySection>

            <PrivacySection id="third-party" number="04" title="THIRD-PARTY SERVICES">
              <p>We use the following third-party services that may process your data:</p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>Google Analytics — website traffic analysis (Google's privacy policy applies).</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>EmailJS — contact form submissions (EmailJS privacy policy applies).</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>Payoneer — payment processing (Payoneer's privacy policy applies).</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>Cloudflare — website hosting and CDN (Cloudflare's privacy policy applies).</span>
                </li>
              </ul>
              <p className="mt-6 text-sm opacity-80">We are not responsible for the privacy practices of these third-party services and encourage you to review their policies independently.</p>
            </PrivacySection>

            <PrivacySection id="cookies" number="05" title="COOKIES">
              <p>Our website uses cookies through Google Analytics to understand how visitors use the site. These are analytical cookies, not advertising cookies.</p>
              <p>You can disable cookies through your browser settings — this will not affect your ability to use our website. We do not use cookies for retargeting or advertising purposes.</p>
            </PrivacySection>

            <PrivacySection id="data-retention" number="06" title="DATA RETENTION">
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span><strong>Contact form submissions:</strong> Retained for 12 months after last communication, then deleted.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span><strong>Client project data:</strong> Retained for the duration of the project plus 12 months after completion for support and reference purposes.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span><strong>Analytics data:</strong> Retained per Google Analytics default retention settings.</span>
                </li>
              </ul>
              <p className="mt-6">You can request deletion of your data at any time by emailing us.</p>
            </PrivacySection>

            <PrivacySection id="data-security" number="07" title="DATA SECURITY">
              <p>We take reasonable measures to protect your information from unauthorized access, loss, or misuse. Client project files are stored securely and access is limited to team members working on your project.</p>
              <p>However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
            </PrivacySection>

            <PrivacySection id="your-rights" number="08" title="YOUR RIGHTS">
              <p>You have the right to:</p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>Request access to the personal data we hold about you.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>Request correction of inaccurate data.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>Request deletion of your data.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[#E2E2DE] mt-2.5 flex-shrink-0" />
                  <span>Withdraw consent for data processing at any time.</span>
                </li>
              </ul>
              <p className="mt-6">To exercise any of these rights, contact us at <a href="mailto:hello@sazaanstudio.space" className="text-[#111111] underline hover:opacity-70 transition-opacity">hello@sazaanstudio.space</a>. We will respond within 30 days.</p>
            </PrivacySection>

            <PrivacySection id="childrens-privacy" number="09" title="CHILDREN'S PRIVACY">
              <p>Our services are not directed at individuals under the age of 16. We do not knowingly collect personal information from children.</p>
              <p>If we discover we have collected data from a child under 16, we will delete it immediately.</p>
            </PrivacySection>

            <PrivacySection id="international-data" number="10" title="INTERNATIONAL DATA">
              <p>We serve clients in the United States and United Kingdom. If you are located in the EU/UK, your data may be processed in countries outside your jurisdiction. By using our services, you consent to this transfer.</p>
              <p>We take steps to ensure your data is treated securely regardless of where it is processed.</p>
            </PrivacySection>

            <PrivacySection id="changes" number="11" title="CHANGES TO THIS POLICY">
              <p>We may update this policy from time to time. Changes will be posted on this page with an updated "Last updated" date.</p>
              <p>We encourage you to review this page periodically. Continued use of our website after changes constitutes acceptance of the updated policy.</p>
            </PrivacySection>

            <PrivacySection id="contact-us" number="12" title="CONTACT US">
              <p>If you have questions about this privacy policy or how we handle your data:</p>
              <div className="mt-4 space-y-2">
                <p><strong>Email:</strong> <a href="mailto:hello@sazaanstudio.space" className="text-[#111111] underline hover:opacity-70 transition-opacity">hello@sazaanstudio.space</a></p>
                <p><strong>Website:</strong> <a href="https://sazaanstudio.space" target="_blank" rel="noopener noreferrer" className="text-[#111111] underline hover:opacity-70 transition-opacity">sazaanstudio.space</a></p>
              </div>
            </PrivacySection>
          </div>
        </Reveal>
      </div>
    </m.div>
  );
};
