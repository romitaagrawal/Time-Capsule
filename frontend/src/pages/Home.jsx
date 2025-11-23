import React from "react";
import { useNavigate } from "react-router-dom";
import scrollToSection from "../utils/scrollToSection";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const goToCapsule = () => {
    if (token) navigate("/create-capsule");
    else navigate("/login");
  };

  const goToJournal = () => {
    if (token) navigate("/journal");
    else navigate("/login");
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Welcome to TimeCapsule</h1>

      {/* ABOUT SECTION */}
      <section id="about" style={{ marginTop: "3rem" }}>
        <h2>About</h2>
        <p>
          Create digital time capsules and private journals. Upload photos,
          videos and files, lock them until a future date, and open them when
          time arrives.
        </p>
        <button onClick={goToCapsule} style={{ marginTop: "1rem" }}>
          Create Your Capsule
        </button>
      </section>

      {/* WHAT IS CAPSULE SECTION */}
      <section id="what" style={{ marginTop: "3rem" }}>
        <h2>What is a Time Capsule?</h2>
        <p>
          A time capsule is a collection of memories saved for future you. Lock
          it until a date you choose, and revisit when the moment arrives.
        </p>
        <button onClick={goToCapsule} style={{ marginTop: "1rem" }}>
          Build a Capsule
        </button>
      </section>

      {/* JOURNALLING */}
      <section id="journal" style={{ marginTop: "3rem", marginBottom: "4rem" }}>
        <h2>Start Journaling</h2>
        <p>
          Write private entries and attach media to keep your memories safe and
          secure.
        </p>
        <button onClick={goToJournal} style={{ marginTop: "1rem" }}>
          Start Writing
        </button>
      </section>
    </main>
  );
}
