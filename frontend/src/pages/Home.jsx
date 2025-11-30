import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"; // IMPORTANT: file must exist

export default function Home() {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <div className="home-root">

      {/* HEADER */}
      <header className="home-header">
  <div 
    className="brand" 
    onClick={() => scrollTo("top")} 
    style={{ cursor: "pointer" }}
  >
    TimeCapsule
  </div>

  <nav className="nav">
    <button onClick={() => scrollTo("about")}>About</button>
    <button onClick={() => scrollTo("capsuleInfo")}>Time Capsule?</button>
    <button onClick={() => scrollTo("journalInfo")}>Journal</button>

    <div className="auth">
      {/* CHECK LOGIN STATUS */}
      {localStorage.getItem("token") ? (
        <>
          <span className="greet">
            Hello, {localStorage.getItem("name") || "User"}
          </span>

          <button
            className="ghost"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("name");
              window.location.href = "/"; // reload to homepage
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            className="ghost"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          {/* Signup stays disabled/commented as you wanted */}
        </>
      )}
    </div>
  </nav>
</header>


      {/* HERO SECTION */}
      <section id="top" className="block hero-block reveal">
        <div className="hero-text">
          <h1>Preserve moments. Surprise future you.</h1>

          <p>
            TimeCapsule helps you freeze your happiest moments — birthdays, 
            trips, childhood memories, friendships, milestones — and reopen 
            them years later as the most emotional surprise of your life.
          </p>
        </div>

        <div className="collage collage-hero">
          <img src="/src/assets/images/collage1.jpeg" />
          <img src="/src/assets/images/collage2.jpeg" />
          <img src="/src/assets/images/collage3.jpeg" />
          <img src="/src/assets/images/collage4.jpeg" />
          <img src="/src/assets/images/collage5.jpeg" />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="block block-alt reveal">

        <div className="collage collage-left">
          <img src="/src/assets/images/collage6.jpeg" />
          <img src="/src/assets/images/collage7.jpeg" />
          <img src="/src/assets/images/collage8.jpeg" />
        </div>
        
        <div className="content">
          <h2>About</h2>

          <p>
            TimeCapsule is a gentle, memory-preserving space. 
            It captures your emotions, photos, videos, and little life snapshots, 
            storing them safely until the unlock date you choose. 
          </p>

          <p>
            It's more than an app — it’s a gift from your past self. 
            A future moment of joy waiting to be unwrapped.
          </p>
        </div>

        {/* <div className="collage collage-left">
          <img src="/src/assets/images/collage3.jpeg" />
          <img src="/src/assets/images/collage5.jpeg" />
          <img src="/src/assets/images/collage1.jpeg" />
        </div> */}
      </section>

      {/* WHAT IS A TIME CAPSULE */}
      <section id="capsuleInfo" className="block reveal">
        <div className="content">
          <h2>What is a Time Capsule?</h2>

          <p>
            A digital capsule is a sealed package of your stories, media, 
            letters, and files — locked until a date you choose. 
            Unlike normal albums, capsules preserve feelings with purpose.
          </p>

          <p>
            When the date arrives, everything unlocks together, giving 
            you a moment powerful enough to bring you to tears.
          </p>
          <h2>Create your first capsule</h2>
        <p>Seal today’s moments for a future version of yourself.</p>

        <button className="primary big" onClick={() => navigate("/create-capsule")}>
          Create Capsule
        </button>

        </div>

        <div className="collage collage-right">
          <img src="/src/assets/images/collage9.jpeg" />
          <img src="/src/assets/images/collage10.jpeg" />
          <img src="/src/assets/images/collage11.jpeg" />
        </div>
      </section>

      {/* CREATE CAPSULE CTA
      <section className="cta-block reveal">
        <h2>Create your first capsule</h2>
        <p>Seal today’s moments for a future version of yourself.</p>

        <button className="primary big" onClick={() => navigate("/create-capsule")}>
          Create Capsule
        </button>
      </section> */}

      {/* JOURNAL SECTION */}
      <section id="journalInfo" className="block block-alt reveal">

        <div className="collage collage-left">
          <img src="/src/assets/images/collage1.jpeg" />
          <img src="/src/assets/images/collage2.jpeg" />
          <img src="/src/assets/images/collage3.jpeg" />

        </div>

        <div className="content">
          <h2>Journaling</h2>

          <p>
            Your journal is your emotional timeline — a safe space to write 
            honestly, privately, and freely. Each entry becomes a snapshot 
            of who you were in that moment.
          </p>

          <p>
            And someday, you’ll read it again... and remember how far you've come.
          </p>

          <button className="primary big" onClick={() => navigate("/journal")}>
            Start Journaling
          </button>
        </div>

        {/* <div className="collage collage-left">
          <img src="/src/assets/images/collage5.jpeg" />
          <img src="/src/assets/images/collage2.jpeg" />
          <img src="/src/assets/images/collage5.jpeg" />

        </div> */}
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} TimeCapsule — Made with love.
      </footer>
    </div>
  );
}
