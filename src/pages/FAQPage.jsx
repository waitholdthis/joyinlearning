import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'How do I know if my child needs educational therapy?',
        a: 'If your child struggles with reading, writing, math, focus, or memory despite effort and traditional tutoring — or if teachers have raised concerns — educational therapy may be the right step. Signs include avoiding homework, low confidence around academics, significant gaps between ability and performance, or a suspected or confirmed learning disability.',
      },
      {
        q: 'What is the first step to getting started?',
        a: 'The easiest first step is a free 20-minute consultation call. We\'ll talk through your concerns, answer your questions, and help you figure out whether our services are the right fit — no pressure, no obligation.',
      },
      {
        q: 'Do you accept referrals from schools or pediatricians?',
        a: 'Yes. We work closely with families referred by teachers, school counselors, pediatricians, and child psychologists. We can also collaborate with your child\'s school team once services begin.',
      },
    ],
  },
  {
    category: 'NILD Educational Therapy',
    items: [
      {
        q: 'What exactly is NILD Educational Therapy?',
        a: 'NILD (National Institute for Learning Development) Educational Therapy is a research-based, 1-on-1 intervention that targets the underlying cognitive processes behind learning — memory, attention, reasoning, processing speed, and language. Unlike tutoring, which re-teaches content, NILD therapy strengthens the cognitive tools a child uses to learn anything.',
      },
      {
        q: 'How is NILD different from regular tutoring?',
        a: 'Tutoring fills knowledge gaps. NILD therapy rebuilds the mental architecture that makes learning stick. A tutor might re-explain long division; an NILD therapist works on the working memory and sequential reasoning that make math — and all subjects — easier to process.',
      },
      {
        q: 'How long does NILD therapy take to show results?',
        a: 'Many families notice meaningful changes — increased confidence, better focus, improved reading — within 3 to 6 months. Full cognitive remediation typically unfolds over 1 to 3 years, depending on the child\'s profile and how consistently they attend.',
      },
      {
        q: 'How often are sessions, and how long are they?',
        a: 'Sessions are typically held twice a week and run 50–60 minutes each. Consistency is important — the cognitive work builds on itself from session to session.',
      },
    ],
  },
  {
    category: 'Testing & Assessments',
    items: [
      {
        q: 'What is included in a dyslexia evaluation?',
        a: 'Our dyslexia evaluation is a comprehensive, full-day assessment conducted by a certified IDA Dyslexia Specialist. It covers phonological awareness, rapid naming, reading fluency, decoding, spelling, and language processing. You receive a detailed written report with diagnostic conclusions, intervention recommendations, and documentation suitable for IEP or 504 accommodations.',
      },
      {
        q: 'What is the Woodcock-Johnson V (WJ-V)?',
        a: 'The WJ-V is the gold-standard psychoeducational battery used to measure academic achievement (reading, writing, math), cognitive abilities (working memory, processing speed, fluid reasoning), and oral language. It provides a complete, norm-referenced picture of your child\'s strengths and needs — far more detailed than school assessments.',
      },
      {
        q: 'Will your test results be accepted by my child\'s school?',
        a: 'Yes. Our evaluations are conducted by credentialed specialists using nationally recognized instruments. Results are accepted by public and private schools, colleges, and universities to support IEP, 504, and accommodations requests.',
      },
      {
        q: 'Can adults be tested for dyslexia or learning disabilities?',
        a: 'Absolutely. We evaluate adolescents and adults who suspect they have undiagnosed learning differences. Many adults seek evaluation to better understand their own learning profile or to qualify for accommodations in higher education or the workplace.',
      },
    ],
  },
  {
    category: 'Logistics & Practical Details',
    items: [
      {
        q: 'Where are you located?',
        a: 'Our office is at 108 Hay Street, Suite 213, Fayetteville, NC 28301 — in the heart of downtown Fayetteville. We also offer all services online via secure video sessions, serving families nationwide.',
      },
      {
        q: 'Do you offer online sessions?',
        a: 'Yes. All of our services — NILD therapy, Cognitive Coaching, and Search & Teach — are available online. Assessments (Dyslexia Testing, WJ-V) are conducted in-person at our Fayetteville office.',
      },
      {
        q: 'Do you accept insurance?',
        a: 'Educational therapy is not typically covered by health insurance, as it is an educational (not medical) service. However, some families use HSA/FSA funds. We are happy to provide documentation to support any reimbursement requests.',
      },
      {
        q: 'What ages do you work with?',
        a: 'We work with learners of all ages. Search & Teach is designed for children ages 4–8. NILD therapy is most effective for school-age children and adolescents (ages 6–18). Cognitive Coaching is available to students, adults, and professionals of all ages.',
      },
    ],
  },
];

function BackArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-item__q" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{q}</span>
        <svg className="faq-item__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="faq-item__a">{a}</div>}
    </div>
  );
}

export default function FAQPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="faq-page">
      {/* Hero */}
      <div className="faq-page__hero">
        <div className="container">
          <Link to="/" className="svc-page__back">
            <BackArrow /> Back to Home
          </Link>
          <span className="faq-page__label">Got Questions?</span>
          <h1 className="faq-page__title">Frequently Asked <em>Questions</em></h1>
          <p className="faq-page__sub">
            Everything you need to know about our services, our approach, and how to get started.
            Don't see your question? <a href="tel:8627545296">Give us a call</a> — we're happy to talk.
          </p>
        </div>
      </div>

      {/* FAQ sections */}
      <div className="faq-page__body">
        <div className="container container-sm">
          {FAQS.map((section) => (
            <div key={section.category} className="faq-section">
              <h2 className="faq-section__title">{section.category}</h2>
              <div className="faq-section__items">
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="svc-page__cta-block" style={{ marginTop: '3rem' }}>
            <h2 className="svc-page__cta-title">Still Have Questions?</h2>
            <p className="svc-page__cta-text">
              The best way to get answers is a quick conversation. Our free 20-minute consultation
              is no-pressure and designed to help you figure out exactly what your child needs.
            </p>
            <div className="svc-page__cta-actions">
              <a href="tel:8627545296" className="btn btn-dark"><span>Schedule a Free Call</span></a>
              <a href="mailto:joyinlearning2@gmail.com" className="btn btn-ghost"><span>Send a Message</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
