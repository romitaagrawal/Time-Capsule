// import React from "react";
// import { useNavigate } from "react-router-dom";
// import scrollToSection from "../utils/scrollToSection";
// import "../utils/Home.css";

// export default function Home() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const goToCapsule = () => {
//     if (token) navigate("/create-capsule");
//     else navigate("/login");
//   };

//   const goToJournal = () => {
//     if (token) navigate("/journal");
//     else navigate("/login");
//   };

//   return (
//     <main className="tc-root">
//       <header className="tc-header">
//         <div className="tc-brand">
//           <h1>TimeCapsule</h1>
//           <p className="tc-tag">Save memories. Unlock later.</p>
//         </div>

//         <nav className="tc-nav" aria-label="Main navigation">
//           <button
//             className="tc-nav-btn"
//             onClick={() => scrollToSection("about")}
//             aria-label="Go to About"
//             type="button"
//           >
//             About
//           </button>
//           <button
//             className="tc-nav-btn"
//             onClick={() => scrollToSection("what")}
//             aria-label="What is a capsule"
//             type="button"
//           >
//             What
//           </button>
//           <button
//             className="tc-cta"
//             onClick={goToCapsule}
//             aria-label="Build a capsule"
//             type="button"
//           >
//             Build a Capsule
//           </button>
//         </nav>
//       </header>

//       <section className="tc-hero">
//         <div className="tc-hero-card">
//           <h2 className="tc-hero-title">Preserve moments. Surprise future you.</h2>
//           <p className="tc-hero-desc">
//             Create private time capsules with photos, videos, and files. Lock them
//             until a future date and relive the memory when the time comes.
//           </p>

//           <div className="tc-hero-actions">
//             <button className="tc-primary" onClick={goToCapsule} type="button">
//               Create Capsule
//             </button>
//             <button className="tc-outline" onClick={goToJournal} type="button">
//               Start Journaling
//             </button>
//           </div>
//         </div>

//         <div className="tc-visual" aria-hidden>
//           <div className="tc-blob" />
//         </div>
//       </section>

//       <section id="about" className="tc-section">
//         <div className="tc-card">
//           <h3>About</h3>
//           <p>
//             TimeCapsule is a thoughtful, secure place to collect and preserve
//             the moments that matter. Think of it as a digital heirloom — a
//             private collection of your thoughts, photos, videos, documents, and
//             messages that you intentionally save for a future date.
//           </p>

//           <p>
//             You can use it to mark life milestones (graduations, weddings,
//             birthdays), track personal growth (letters to your future self), or
//             record simple everyday memories that might otherwise fade. Each
//             capsule can contain multiple items, metadata (titles, tags), and a
//             message explaining why the moment is important to you.
//           </p>

//           <p>
//             Security and privacy are central: capsules remain locked until the
//             unlock date you choose, and access is limited to your account. You
//             control who sees what, and when.
//           </p>

//           <p>
//             Many users create capsules as gifts, therapeutic exercises, time
//             capsules for children, or as a way to remember the small but
//             meaningful details of everyday life.
//           </p>
//         </div>
//       </section>

//       <section id="what" className="tc-section">
//         <div className="tc-card">
//           <h3>What is a Time Capsule?</h3>
//           <p>
//             A Time Capsule is a digital container for memories that you choose to
//             lock away until a specific date. Unlike a standard photo album or
//             notes app, a time capsule is purpose-built to preserve context and
//             surprise — it helps frame memories with the intent of rediscovery.
//           </p>

//           <p>
//             Capsules can store mixed media (text, images, audio, video, and
//             documents). You can add an explanatory note describing the moment,
//             tag other items for easy searching later, and select a release date
//             that turns your present into a future surprise.
//           </p>

//           <p>
//             Typical uses:
//             <ul>
//               <li>Birthday / anniversary surprises</li>
//               <li>Letters to your future self (5, 10, 20 years later)</li>
//               <li>Memory boxes for travel, relationships, and projects</li>
//               <li>Family heirloom capsules for children</li>
//             </ul>
//           </p>

//           <div className="tc-actions-row">
//             <button className="tc-primary" onClick={goToCapsule} type="button">
//               Build a Capsule
//             </button>
//             <button className="tc-outline" onClick={() => scrollToSection("about")} type="button">
//               Learn More
//             </button>
//           </div>
//         </div>
//       </section>

//       <section id="journal" className="tc-section tc-section-soft">
//         <div className="tc-card">
//           <h3>Start Journaling</h3>
//           <p>
//             Journaling inside TimeCapsule is private by design. Use it to write
//             daily reflections, log important events, or create long-form
//             narratives about your life. Each journal entry can be saved as a
//             standalone item or grouped into a capsule to be opened later.
//           </p>

//           <p>
//             Features include rich text formatting, attachments (images, files),
//             and optional locking of specific entries until a date you set. This
//             makes journaling both a reflective practice and a way to build
//             meaningful surprises for your future self.
//           </p>

//           <p>
//             Whether you're processing emotions, tracking goals, or keeping a
//             gratitude log, the journal provides a secure, private space to
//             explore your thoughts and then rediscover them when time gives you
//             new perspective.
//           </p>

//           <div className="tc-actions-row">
//             <button className="tc-primary" onClick={goToJournal} type="button">
//               Start Writing
//             </button>
//             <button
//               className="tc-outline"
//               onClick={() => navigate("/features")}
//               type="button"
//             >
//               Features
//             </button>
//           </div>
//         </div>
//       </section>

//       <footer className="tc-footer">
//         <small>© {new Date().getFullYear()} TimeCapsule — Made with care.</small>
//       </footer>
//     </main>
//   );
// }

import React, { useEffect, useRef } from "react";
import Header from "../components/Header"; // make sure Header.jsx/tsx is in the same folder or adjust the path
import { useNavigate } from "react-router-dom";
import "../utils/Home.css";

// Small, dependency-free inline SVG icons
const IconTime = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
    <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconLock = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="4" y="11" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconJournal = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 3h9a2 2 0 0 1 2 2v14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 7h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.12 }
    );

    el.querySelectorAll(".tc-reveal").forEach((child) => obs.observe(child));
    return () => obs.disconnect();
  }, []);

  const goToCapsule = () => {
    if (token) navigate("/create-capsule");
    else navigate("/login");
  };

  const goToJournal = () => {
    if (token) navigate("/journal");
    else navigate("/login");
  };

  return (
    <main className="tc-root" ref={containerRef}>
      {/* Header component (keeps the same UI/UX as your provided Header) */}
      <Header />

      <section className="tc-hero">
        <div className="tc-hero-card tc-reveal">
          <h2 className="tc-hero-title">Preserve moments. Surprise future you.</h2>
          <p className="tc-hero-desc">
            Create private time capsules with photos, videos, and files. Lock them
            until a future date and relive the memory when the time comes.
          </p>

          <div className="tc-hero-actions">
            <button className="tc-primary" onClick={goToCapsule} type="button">
              Create Capsule
            </button>
            <button className="tc-outline" onClick={goToJournal} type="button">
              Start Journaling
            </button>
          </div>
        </div>

        <div className="tc-visual tc-reveal" aria-hidden>
          <div className="tc-blob" />
        </div>
      </section>

      <section id="about" className="tc-section">
        <div className="tc-card tc-reveal">
          <h3>About</h3>
          <p>
            TimeCapsule is a thoughtful, secure place to collect and preserve the
            moments that matter. Think of it as a digital heirloom — a private
            collection of your thoughts, photos, videos, documents, and messages
            that you intentionally save for a future date.
          </p>

          <p>
            You can use it to mark life milestones (graduations, weddings,
            birthdays), track personal growth (letters to your future self), or
            record simple everyday memories that might otherwise fade. Each
            capsule can contain multiple items, metadata (titles, tags), and a
            message explaining why the moment is important to you.
          </p>

          <p>
            Security and privacy are central: capsules remain locked until the
            unlock date you choose, and access is limited to your account. You
            control who sees what, and when.
          </p>

          <p>
            Many users create capsules as gifts, therapeutic exercises, time
            capsules for children, or as a way to remember the small but
            meaningful details of everyday life.
          </p>
        </div>
      </section>

      <section id="what" className="tc-section">
        <div className="tc-card tc-reveal">
          <h3>What is a Time Capsule?</h3>
          <p>
            A Time Capsule is a digital container for memories that you choose to
            lock away until a specific date. Unlike a standard photo album or
            notes app, a time capsule is purpose-built to preserve context and
            surprise — it helps frame memories with the intent of rediscovery.
          </p>

          <p>
            Capsules can store mixed media (text, images, audio, video, and
            documents). You can add an explanatory note describing the moment,
            tag other items for easy searching later, and select a release date
            that turns your present into a future surprise.
          </p>

          <p>
            Typical uses:
            <ul>
              <li>Birthday / anniversary surprises</li>
              <li>Letters to your future self (5, 10, 20 years later)</li>
              <li>Memory boxes for travel, relationships, and projects</li>
              <li>Family heirloom capsules for children</li>
            </ul>
          </p>

          <div className="tc-actions-row tc-reveal">
            <button className="tc-primary" onClick={goToCapsule} type="button">
              Build a Capsule
            </button>
            <button className="tc-outline" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} type="button">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="tc-how tc-section tc-reveal">
        <div className="tc-card">
          <h3>How it works — 3 simple steps</h3>
          <div className="tc-steps">
            <div className="tc-step tc-reveal">
              <div className="tc-step-icon">
                <IconTime />
              </div>
              <h4>1. Create</h4>
              <p>Write an entry, upload photos/videos, or attach files to a capsule.</p>
            </div>

            <div className="tc-step tc-reveal">
              <div className="tc-step-icon">
                <IconLock />
              </div>
              <h4>2. Lock</h4>
              <p>Pick an unlock date. Your capsule stays sealed and private until then.</p>
            </div>

            <div className="tc-step tc-reveal">
              <div className="tc-step-icon">
                <IconJournal />
              </div>
              <h4>3. Reopen</h4>
              <p>When the date arrives, you’ll receive the surprise — the memories come alive.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="journal" className="tc-section tc-section-soft tc-reveal">
        <div className="tc-card">
          <h3>Start Journaling</h3>
          <p>
            Journaling inside TimeCapsule is private by design. Use it to write
            daily reflections, log important events, or create long-form
            narratives about your life. Each journal entry can be saved as a
            standalone item or grouped into a capsule to be opened later.
          </p>

          <p>
            Features include rich text formatting, attachments (images, files),
            and optional locking of specific entries until a date you set. This
            makes journaling both a reflective practice and a way to build
            meaningful surprises for your future self.
          </p>

          <p>
            Whether you're processing emotions, tracking goals, or keeping a
            gratitude log, the journal provides a secure, private space to
            explore your thoughts and then rediscover them when time gives you
            new perspective.
          </p>

          <div className="tc-actions-row">
            <button className="tc-primary" onClick={goToJournal} type="button">
              Start Writing
            </button>
            <button className="tc-outline" onClick={() => navigate("/features")} type="button">
              Features
            </button>
          </div>
        </div>
      </section>

      <footer className="tc-footer tc-reveal">
        <small>© {new Date().getFullYear()} TimeCapsule — Made with care.</small>
      </footer>
    </main>
  );
}