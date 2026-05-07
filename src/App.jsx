import { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './styles/global.css';
import ServicePage from './pages/ServicePage';
import FAQPage from './pages/FAQPage';
import Logo from './components/Logo';

/* ─── Inline SVG icons ──────────────────────────────────────────────────────── */
const ChevronUp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

/* ─── Scroll reveal hook ────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Back to Top ───────────────────────────────────────────────────────────── */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <button
      className={`btt ${show ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <ChevronUp />
    </button>
  );
}

/* ─── Navigation ────────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const close = () => setMenuOpen(false);

  // On sub-pages, hash links need to navigate home first
  const homeHash = (hash) => isHome ? hash : `/${hash}`;

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav__inner">
          <a href={homeHash('#home')} className="nav__logo" onClick={close}>
            <Logo />
          </a>
          <ul className="nav__links">
            {[['#services', 'Services'], ['#team', 'Our Team'], ['#about', 'About'], ['#contact', 'Contact']].map(([hash, label]) => (
              <li key={hash}><a href={homeHash(hash)}>{label}</a></li>
            ))}
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
          <a href="tel:8627545296" className="nav__book">Free Consultation</a>
          <button
            className={`nav__hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav__mobile ${menuOpen ? 'open' : ''}`}>
        {[['#home', 'Home'], ['#services', 'Services'], ['#team', 'Our Team'], ['#about', 'About'], ['#contact', 'Contact']].map(([hash, label]) => (
          <a key={hash} href={homeHash(hash)} onClick={close}>{label}</a>
        ))}
        <Link to="/faq" onClick={close}>FAQ</Link>
        <a href="tel:8627545296" className="btn btn-dark btn-sm" onClick={close}><span>Free Consultation</span></a>
      </div>
    </>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────────── */
function Hero() {
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let raf;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (bgRef.current)      bgRef.current.style.transform = `translateY(${y * 0.22}px)`;
        if (contentRef.current) {
          const h = window.innerHeight;
          const progress = Math.min(y / (h * 0.72), 1);
          contentRef.current.style.opacity   = String(1 - progress);
          contentRef.current.style.transform = `translateY(${y * -0.09}px)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg-photo" ref={bgRef} />
      <div className="hero-grid" />
      <div className="hero-vignette" />
      <div className="hero-shimmer" />
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />

      <div className="hero-content" ref={contentRef}>
        <div className="hero-badge">Fayetteville, NC &amp; Online</div>
        <h1>
          Unlock Your Child's<br />
          <em>Learning Potential</em>
        </h1>
        <div className="hero-divider" />
        <p className="hero-sub">
          One child at a time. Because every learner deserves<br />
          undivided attention, proven methods, and genuine care.
        </p>
        <div className="hero-actions">
          <a href="tel:8627545296" className="btn btn-ghost"><span>Schedule a Free Call</span></a>
          <a href="#services" className="btn btn-dark"><span>Explore Services</span></a>
        </div>
        <div className="hero-trust">
          {['30+ Years Experience', 'NILD Certified', 'Evidence-Based', 'In-Person & Online'].map((t) => (
            <div key={t} className="hero-trust-item">
              <span className="hero-trust-dot" />{t}
            </div>
          ))}
        </div>
      </div>

      <div className="hero-scroll">
        <span className="hero-scroll-label">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}

/* ─── Marquee ────────────────────────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  { label: 'NILD Therapy',       photo: 'https://images.unsplash.com/photo-1758685733907-42e9651721f5?auto=format&fit=crop&w=400&h=320&q=80&crop=top' },
  { label: 'Dyslexia Testing',   photo: 'https://images.unsplash.com/photo-1549737221-bef65e2604a6?auto=format&fit=crop&w=400&h=320&q=80' },
  { label: 'Cognitive Coaching', photo: 'https://images.unsplash.com/photo-1546458932-22b70896a584?auto=format&fit=crop&w=400&h=320&q=80' },
  { label: 'Search & Teach',     photo: 'https://images.unsplash.com/photo-1761208662441-9ba3264ca7fd?auto=format&fit=crop&w=400&h=320&q=80' },
  { label: 'WJ-V Testing',       photo: 'https://images.unsplash.com/photo-1585432959322-4db03962b004?auto=format&fit=crop&w=400&h=320&q=80' },
  { label: '1-on-1 Sessions',    photo: 'https://images.unsplash.com/photo-1583468991267-3f068b607ae1?auto=format&fit=crop&w=400&h=320&q=80' },
];
const MARQUEE = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]; // doubled for seamless loop

function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {MARQUEE.map((item, i) => (
          <div key={i} className="marquee-item">
            <div className="marquee-item-bg" style={{ backgroundImage: `url(${item.photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="marquee-item-overlay" />
            <span className="marquee-item-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── About ──────────────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="about section">
      <div className="container container-sm">
        <div className="about__inner text-center">
          <span className="section-label reveal">Our Story</span>
          <h2 className="section-title reveal reveal-d1">
            Where Patience Meets <em>Purpose</em>
          </h2>
          <p className="about__lead reveal reveal-d2">
            Joy In Learning was founded on a single conviction: every child has the capacity to
            learn, grow, and thrive — they simply need the right guide and the right approach.
            For over thirty years, we've been that guide for families in Fayetteville, NC and across the country.
          </p>

          <blockquote className="about__quote reveal reveal-d2">
            "We don't just teach children. We show them how their minds work — and watch the
            fear of learning transform into the <em>joy</em> of discovery."
          </blockquote>

          <p className="about__body reveal reveal-d3">
            Unlike traditional tutoring, our evidence-based approach addresses the root cognitive
            processes that underlie learning challenges. Whether your child struggles with dyslexia,
            attention, processing speed, or confidence, our 1-on-1 sessions are tailored to who
            they are — not who a standardized curriculum expects them to be.
          </p>

          <div className="about__ornament reveal" />

          <div className="about__stats reveal reveal-d2">
            {[
              { num: '30+', label: 'Years of Expertise' },
              { num: '1:1', label: 'Undivided Attention' },
              { num: '3',   label: 'Certified Therapists' },
              { num: '100%', label: 'Personalized Plans' },
            ].map((s) => (
              <div key={s.label}>
                <div className="about__stat-num">{s.num}</div>
                <div className="about__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    slug:     'nild-educational-therapy',
    title:    'NILD Educational Therapy',
    desc:     'The core of our practice. NILD targets the cognitive foundations of learning — strengthening memory, attention, reasoning, and language through intensive, research-backed 1-on-1 sessions.',
    duration: 'Ongoing sessions',
    photo:    'https://images.unsplash.com/photo-1758685733907-42e9651721f5?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug:     'cognitive-coaching',
    title:    'Cognitive Coaching',
    desc:     'Sharpen focus, build mental stamina, and develop powerful learning strategies. Available to students, adults, and professionals of all ages — not just children.',
    duration: 'All ages welcome',
    isNew:    true,
    photo:    'https://images.unsplash.com/photo-1546458932-22b70896a584?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug:     'dyslexia-testing',
    title:    'Dyslexia Testing',
    desc:     'Comprehensive diagnostic evaluation identifying dyslexia and related reading challenges. Results support targeted intervention and provide documentation for school accommodations.',
    duration: 'Full-day assessment',
    photo:    'https://images.unsplash.com/photo-1549737221-bef65e2604a6?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug:     'woodcock-johnson-v',
    title:    'Woodcock-Johnson V',
    desc:     'The gold-standard psychoeducational battery measuring academic achievement, cognitive abilities, and oral language — a complete picture of your child\'s strengths and needs.',
    duration: 'Half/full day',
    photo:    'https://images.unsplash.com/photo-1585432959322-4db03962b004?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug:     'search-and-teach',
    title:    'Search & Teach',
    desc:     'A visual processing and attention program for younger learners that develops the foundational perceptual skills essential for reading readiness and early academic success.',
    duration: 'Ages 4–8',
    photo:    'https://images.unsplash.com/photo-1761208662441-9ba3264ca7fd?auto=format&fit=crop&w=800&q=80',
  },
];

function Services() {
  return (
    <section id="services" className="services section dark">
      <div className="container">
        <div className="services__header">
          <span className="section-label reveal">What We Offer</span>
          <h2 className="section-title reveal reveal-d1">
            Evidence-Based <em>Services</em>
          </h2>
          <p className="services__desc reveal reveal-d2">
            Every service is delivered 1-on-1 by certified therapists. No group classes, no cookie-cutter programs, no shortcuts.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((svc, i) => (
            <Link key={svc.title} to={`/${svc.slug}`} className={`svc-card svc-card--link reveal reveal-d${(i % 3) + 1}`}>
              <div className="svc-card__img">
                <div className="svc-card__img-bg" style={{ backgroundImage: `url(${svc.photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="svc-card__img-overlay" />
              </div>
              <div className="svc-card__body">
                <h3 className="svc-card__title">{svc.title}</h3>
                <p className="svc-card__desc">{svc.desc}</p>
                <div className="svc-card__meta">
                  <span className="svc-card__duration">{svc.duration}</span>
                  {svc.isNew && <span className="svc-card__badge-new">New</span>}
                </div>
                <span className="svc-card__learn-more">Learn more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Team ───────────────────────────────────────────────────────────────────── */
const TEAM = [
  {
    name:     'Cherene Comick',
    initials: 'CC',
    photo:    '/images/cherene.jpg',
    role:     'Founder & Lead Therapist',
    bio:      'Cherene has been a certified NILD Educational Therapist since 1994 and served as Exceptional Education Director at a private school for over 23 years. Her depth of experience and genuine compassion form the foundation of Joy In Learning.',
    quote:    '"I\'ve never met a child who didn\'t want to learn — only children who hadn\'t yet found the right door."',
    creds:    ['M.Ed — Educational Therapy', 'NILD Certified since 1994', '30+ Years Clinical Experience', 'Fayetteville Chamber of Commerce'],
    bg:       'linear-gradient(150deg, #1a3c34 0%, #2d6a4f 100%)',
  },
  {
    name:     'Alise McCain',
    initials: 'AM',
    photo:    'https://static.wixstatic.com/media/7e3a4d_b807b7f348834ffa9b8df12e7e83a115~mv2.png/v1/fill/w_467,h_426,al_c,q_85,enc_avif,quality_auto/Screenshot%202026-01-17%20at%2010_49_13.png',
    role:     'NILD Educational Therapist',
    bio:      'Alise holds a Master\'s in educational therapy and is a certified IDA Structured Literacy Dyslexia Specialist. She brings deep expertise with older students navigating dyslexia, processing challenges, and ADHD, having homeschooled her own three children for 20 years.',
    quote:    '"Dyslexia is not a barrier. It\'s a different pathway — and every pathway leads somewhere remarkable."',
    creds:    ['M.Ed — Educational Therapy', 'Licensed NILD Therapist', 'IDA Dyslexia Specialist (Certified)', 'Licensed Educator'],
    bg:       'linear-gradient(150deg, #2a2a2a 0%, #4a7c5f 100%)',
  },
  {
    name:     'Teresa Tootill',
    initials: 'TT',
    role:     'NILD Therapist',
    bio:      'Teresa brings military discipline, social work training, and the lived experience of raising a neurodiverse child to every session. She connects with families from a place of personal understanding and is currently pursuing her Master\'s in Educational Therapy.',
    quote:    '"Service taught me patience. Parenting taught me empathy. Educational therapy brought them both together."',
    creds:    ['B.S. — Social Work', 'NILD Level 1 Certified (pursuing Level 3)', '18 Years U.S. Army Service', 'M.Ed in Progress'],
    bg:       'linear-gradient(150deg, #4a3018 0%, #c9a96e 100%)',
  },
];

function Team() {
  return (
    <section id="team" className="team section">
      <div className="container">
        <div className="team__header">
          <span className="section-label reveal">The People Behind the Practice</span>
          <h2 className="section-title reveal reveal-d1">
            Meet Your <em>Therapists</em>
          </h2>
        </div>
        <div className="team__grid">
          {TEAM.map((member, i) => (
            <div key={member.name} className={`team-card reveal reveal-d${i + 1}`}>
              <div className="team-card__photo-wrap">
                <div className="team-card__photo">
                  <div
                    className="team-card__photo-inner"
                    style={member.photo ? undefined : { background: member.bg }}
                  >
                    {member.photo
                      ? <img src={member.photo} alt={member.name} className="team-card__photo-img" />
                      : <span className="team-card__initials">{member.initials}</span>
                    }
                  </div>
                </div>
                <div className="team-card__frame" />
              </div>
              <div className="team-card__name">{member.name}</div>
              <div className="team-card__role">{member.role}</div>
              <p className="team-card__bio">{member.bio}</p>
              <blockquote className="team-card__quote">{member.quote}</blockquote>
              <div className="team-card__creds">
                {member.creds.map((c) => (
                  <span key={c} className="team-card__cred">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    text:   "Joy in Learning has been an invaluable addition to our son's education. In just one month, we noticed an increased level of confidence in his overall work — and a willingness to participate that we simply hadn't seen before.",
    author: 'Satisfied Parent',
  },
  {
    text:   "Cherene has a unique ability to reach to the heart of the child. She doesn't just teach — she sees. And when a child feels truly seen, everything changes.",
    author: 'Loyal Client Family',
  },
  {
    text:   "Our daughter went from dreading school to asking when her next session is. We are so grateful. She and her work are true gifts — we cannot recommend Joy in Learning highly enough.",
    author: 'Happy Client, Fayetteville NC',
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((i) => {
    setActive(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive((v) => (v + 1) % TESTIMONIALS.length), 6000);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => setActive((v) => (v + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section className="testimonials section">
      <div className="container">
        <div className="testimonials__inner">
          <span className="section-label reveal" style={{ justifyContent: 'center', display: 'flex' }}>Client Love</span>
          <h2 className="section-title reveal reveal-d1" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            Kind <em>Words</em>
          </h2>
          <div className="testimonials__slider">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`testi-slide ${active === i ? 'active' : ''}`}>
                <span className="testi-quote-mark">"</span>
                <p className="testi-text">{t.text}</p>
                <div className="testi-author">{t.author}</div>
              </div>
            ))}
            <div className="testimonials__dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`testi-dot ${active === i ? 'active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Process ────────────────────────────────────────────────────────────────── */
function Process() {
  const steps = [
    { n: '1', title: 'Free Consultation Call', desc: 'A relaxed 20-minute conversation with one of our therapists. Tell us about your child, ask your questions — no pressure, no obligation.' },
    { n: '2', title: 'Personalized Assessment',  desc: 'We evaluate your child\'s unique cognitive profile, identifying root causes and designing a plan that speaks directly to their needs.' },
    { n: '3', title: 'Begin the Journey',        desc: 'Structured 1-on-1 sessions begin. Parents receive regular updates, and children begin rediscovering confidence in themselves.' },
  ];
  return (
    <section className="process section dark">
      <div className="container">
        <div className="process__header">
          <span className="section-label reveal">How To Get Started</span>
          <h2 className="section-title reveal reveal-d1">A Simple, <em>Caring</em> Process</h2>
        </div>
        <div className="process__steps">
          {steps.map((s, i) => (
            <div key={s.n} className={`process__step reveal reveal-d${i + 1}`}>
              <div className="process__num">{s.n}</div>
              <h3 className="process__step-title">{s.title}</h3>
              <p className="process__step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner ─────────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <div className="cta-banner">
      <div className="container">
        <div className="cta-banner__inner text-center">
          <span className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>Take the First Step</span>
          <h2 className="cta-banner__title reveal">
            Your Child's Breakthrough<br />
            Starts With a Single <em>Conversation</em>
          </h2>
          <p className="cta-banner__sub reveal reveal-d1">
            A free, no-pressure 20-minute call with one of our therapists.
            Tell us your story. Let us show you what's possible.
          </p>
          <div className="cta-banner__actions reveal reveal-d2">
            <a href="tel:8627545296" className="btn btn-dark"><span>📞 Schedule a Free Call</span></a>
            <a href="mailto:joyinlearning2@gmail.com" className="btn btn-ghost"><span>Send a Message</span></a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Contact ─────────────────────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="contact__inner">
          {/* Left */}
          <div>
            <span className="section-label reveal">Get in Touch</span>
            <h2 className="section-title reveal reveal-d1" style={{ marginBottom: '2.5rem' }}>
              Let's <em>Connect</em>
            </h2>
            <div className="reveal reveal-d2">
              <span className="contact__detail-label">Phone</span>
              <span className="contact__detail-value"><a href="tel:8627545296">862-754-5296</a></span>
              <span className="contact__detail-label">Email</span>
              <span className="contact__detail-value"><a href="mailto:joyinlearning2@gmail.com">joyinlearning2@gmail.com</a></span>
              <span className="contact__detail-label">Location</span>
              <span className="contact__detail-value">
                <a href="https://maps.google.com/?q=108+Hay+Street+Suite+213+Fayetteville+NC" target="_blank" rel="noreferrer">
                  108 Hay Street, Suite 213<br />Fayetteville, NC 28301
                </a>
              </span>
              <span className="contact__detail-label" style={{ marginTop: '0.5rem' }}>Also Available</span>
              <span className="contact__detail-value">Online — Nationwide</span>
            </div>
            <div className="contact__social reveal reveal-d3">
              <a href="https://www.facebook.com/joyinlearningdiscoverycenter" target="_blank" rel="noreferrer" className="contact__social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                Facebook
              </a>
              <a href="#" className="contact__social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                Instagram
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal reveal-d2">
            <div className="contact__form-wrap">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-name-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="fname">First Name</label>
                    <input id="fname" className="form-input" type="text" placeholder="Jane" />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="lname">Last Name</label>
                    <input id="lname" className="form-input" type="text" placeholder="Smith" />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input id="email" className="form-input" type="email" placeholder="jane@example.com" />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="child">Child's Age & Grade (Optional)</label>
                  <input id="child" className="form-input" type="text" placeholder="e.g. 9 years old, 4th grade" />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="msg">How Can We Help?</label>
                  <textarea id="msg" className="form-textarea" rows="4" placeholder="Tell us a little about your child and what you're hoping to address..." />
                </div>
                <button type="submit" className="btn btn-dark" style={{ width: '100%' }}>
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <div className="footer__logo">Joy In Learning</div>
            <div className="footer__tagline">by Cherene Comick · Fayetteville, North Carolina</div>
          </div>
          <nav className="footer__links">
            {[['#services', 'Services'], ['#team', 'Team'], ['#contact', 'Contact']].map(([href, label]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
        </div>
        <div className="footer__badges">
          <img src="/images/faychamber.png" alt="Fayetteville Chamber of Commerce Member" className="footer__badge" />
        </div>
        <p className="footer__copy">
          © {new Date().getFullYear()} Joy In Learning. All rights reserved. &nbsp;|&nbsp; Serving families in Fayetteville, NC &amp; online nationwide
        </p>
      </div>
    </footer>
  );
}

/* ─── Home page ───────────────────────────────────────────────────────────────── */
function HomePage() {
  useReveal();
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Team />
      <Testimonials />
      <Process />
      <CTABanner />
      <Contact />
    </>
  );
}

/* ─── App ─────────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <BackToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/:slug" element={<ServicePage />} />
      </Routes>
      <Footer />
    </>
  );
}
