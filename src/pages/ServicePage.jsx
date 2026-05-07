import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';

const SERVICE_DATA = {
  'nild-educational-therapy': {
    title: 'NILD Educational Therapy',
    tagline: 'Strengthening the foundations of learning — one mind at a time.',
    bg: 'radial-gradient(ellipse at 35% 65%, #2d6a4f 0%, #1a3c34 55%, #060c08 100%)',
    duration: 'Ongoing sessions',
    who: 'Children and adolescents with learning disabilities, attention challenges, or processing difficulties',
    what: [
      'Weekly 1-on-1 sessions with a certified NILD therapist',
      'Targets memory, attention, reasoning, and language processing',
      'Research-backed mediated learning approach developed by Dr. Gerald Feuerstein',
      'Progress monitored and shared with parents regularly',
    ],
    why: 'Unlike traditional tutoring that patches over symptoms, NILD therapy addresses the underlying cognitive processes that cause learning difficulties. Students don\'t just catch up — they build a stronger, more capable mind.',
    faqs: [
      { q: 'How long does NILD therapy take?', a: 'Most students attend sessions for 1–3 years, though some show significant gains sooner. Progress depends on the child\'s profile and consistency of attendance.' },
      { q: 'What ages does NILD therapy serve?', a: 'NILD is most effective for school-age children (6–18), though elements are adapted for younger children and adults.' },
      { q: 'Will my child\'s school be involved?', a: 'We can collaborate with teachers and special education staff and help parents advocate for appropriate accommodations.' },
    ],
  },
  'cognitive-coaching': {
    title: 'Cognitive Coaching',
    tagline: 'Sharpen focus, build mental stamina, and develop powerful learning strategies — at any age.',
    bg: 'radial-gradient(ellipse at 65% 35%, #c9a96e 0%, #6b4c20 45%, #1a1410 100%)',
    duration: 'All ages welcome',
    who: 'Students, adults, and professionals who want to maximize cognitive performance and develop effective learning strategies',
    what: [
      'Personalized 1-on-1 coaching sessions',
      'Focus and attention training',
      'Executive function and organizational strategy building',
      'Study skills, memory techniques, and mental stamina development',
      'Available in-person and online',
    ],
    why: 'Learning doesn\'t stop at childhood. Cognitive Coaching empowers anyone — from a college student to a working professional — to understand how their mind works and use it more effectively.',
    faqs: [
      { q: 'Is this only for people with learning disabilities?', a: 'Not at all. Cognitive Coaching benefits anyone who wants to improve focus, organization, or mental performance — with or without a diagnosis.' },
      { q: 'Can adults benefit from Cognitive Coaching?', a: 'Absolutely. Many of our adult clients are professionals seeking sharper focus, better memory, or strategies to manage ADHD in the workplace.' },
    ],
  },
  'dyslexia-testing': {
    title: 'Dyslexia Testing',
    tagline: 'Clarity, answers, and a path forward — for your child and your family.',
    bg: 'radial-gradient(ellipse at 50% 50%, #4a7c5f 0%, #1a3c34 50%, #060c08 100%)',
    duration: 'Full-day assessment',
    who: 'Children and adolescents suspected of having dyslexia or related reading and language processing challenges',
    what: [
      'Comprehensive diagnostic evaluation by a certified IDA Dyslexia Specialist',
      'Assesses phonological processing, reading fluency, spelling, and language skills',
      'Detailed written report with findings and diagnosis',
      'Specific intervention recommendations',
      'Documentation suitable for requesting school accommodations (IEP/504)',
    ],
    why: 'Dyslexia often goes undiagnosed for years, leaving children feeling defeated and misunderstood. A clear diagnosis gives families the language, documentation, and direction they need to get their child the support they deserve.',
    faqs: [
      { q: 'How long does the testing take?', a: 'The assessment is typically a full day (5–6 hours) and includes breaks to keep your child comfortable and focused.' },
      { q: 'What happens after the evaluation?', a: 'We provide a full written report and meet with parents to discuss results, answer questions, and outline next steps — including therapy options and school advocacy.' },
      { q: 'Can you test adults for dyslexia?', a: 'Yes. We evaluate adolescents and adults who suspect they have undiagnosed dyslexia.' },
    ],
  },
  'woodcock-johnson-v': {
    title: 'Woodcock-Johnson V',
    tagline: 'The gold-standard psychoeducational battery — a complete picture of your child\'s mind.',
    bg: 'radial-gradient(ellipse at 20% 80%, #c9a96e 0%, #4a3018 50%, #1a1410 100%)',
    duration: 'Half or full day',
    who: 'Children, adolescents, and adults needing a comprehensive academic and cognitive evaluation',
    what: [
      'Measures academic achievement across reading, math, and written language',
      'Assesses cognitive abilities including processing speed, working memory, and fluid reasoning',
      'Evaluates oral language skills',
      'Full written report with norm-referenced scores and interpretation',
      'Recommendations for intervention, accommodations, and placement',
    ],
    why: 'The WJ-V reveals the complete landscape of a learner\'s strengths and challenges — far beyond what grades or classroom observations can show. It\'s the foundation for evidence-based intervention planning.',
    faqs: [
      { q: 'What is the difference between a half-day and full-day WJ-V?', a: 'A half-day assessment covers the core battery. A full-day includes extended batteries for a more comprehensive cognitive and achievement profile.' },
      { q: 'Will the report be accepted by schools?', a: 'Yes. WJ-V results are widely accepted by public schools, private schools, and colleges to support IEP, 504, and accommodation requests.' },
    ],
  },
  'search-and-teach': {
    title: 'Search & Teach',
    tagline: 'Building the visual and perceptual foundations every young learner needs.',
    bg: 'radial-gradient(ellipse at 80% 20%, #d0e8d4 0%, #4a7c5f 45%, #0f1e12 100%)',
    duration: 'Ages 4–8',
    who: 'Young children (ages 4–8) showing signs of reading readiness challenges, visual processing difficulties, or early learning delays',
    what: [
      'Structured visual-perceptual training program',
      'Develops visual discrimination, tracking, and figure-ground perception',
      'Builds foundational attention skills for reading readiness',
      '1-on-1 sessions adapted to each child\'s developmental level',
      'Fun, game-based activities designed for young learners',
    ],
    why: 'Strong readers begin with strong visual processing. Search & Teach targets the perceptual skills that underlie reading before formal instruction begins, giving young children a powerful head start.',
    faqs: [
      { q: 'My child hasn\'t started kindergarten yet — is it too early?', a: 'No. Search & Teach is designed for children as young as 4. Early intervention produces the best outcomes for at-risk learners.' },
      { q: 'How is this different from preschool or tutoring?', a: 'Search & Teach specifically trains the visual processing system — not just academic content. It prepares the brain for reading in a way that general early learning programs do not.' },
    ],
  },
};

function BackArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export default function ServicePage() {
  const { slug } = useParams();
  const svc = SERVICE_DATA[slug];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!svc) return <Navigate to="/" replace />;

  return (
    <div className="svc-page">
      {/* Hero */}
      <div className="svc-page__hero" style={{ background: svc.bg }}>
        <div className="container">
          <Link to="/#services" className="svc-page__back">
            <BackArrow /> All Services
          </Link>
          <div className="svc-page__hero-duration">{svc.duration}</div>
          <h1 className="svc-page__hero-title">{svc.title}</h1>
          <p className="svc-page__hero-tagline">{svc.tagline}</p>
          <a href="tel:8627545296" className="btn btn-ghost svc-page__cta"><span>Book a Free Consultation</span></a>
        </div>
      </div>

      {/* Body */}
      <div className="svc-page__body">
        <div className="container container-sm">

          {/* Who it's for */}
          <div className="svc-page__section">
            <h2 className="svc-page__section-title">Who It's For</h2>
            <p className="svc-page__section-text">{svc.who}</p>
          </div>

          {/* What's included */}
          <div className="svc-page__section">
            <h2 className="svc-page__section-title">What's Included</h2>
            <ul className="svc-page__list">
              {svc.what.map((item) => (
                <li key={item} className="svc-page__list-item">
                  <span className="svc-page__list-dot" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Why it works */}
          <div className="svc-page__section svc-page__why">
            <h2 className="svc-page__section-title">Why It Works</h2>
            <p className="svc-page__section-text">{svc.why}</p>
          </div>

          {/* FAQs */}
          <div className="svc-page__section">
            <h2 className="svc-page__section-title">Frequently Asked Questions</h2>
            <div className="svc-page__faqs">
              {svc.faqs.map((faq) => (
                <div key={faq.q} className="svc-page__faq">
                  <div className="svc-page__faq-q">{faq.q}</div>
                  <div className="svc-page__faq-a">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="svc-page__cta-block">
            <h2 className="svc-page__cta-title">Ready to Get Started?</h2>
            <p className="svc-page__cta-text">
              Schedule a free, no-pressure 20-minute call with one of our therapists.
              Tell us about your child — we'll help you figure out the best path forward.
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
