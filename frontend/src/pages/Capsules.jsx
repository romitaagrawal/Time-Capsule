import React, { useEffect, useState } from "react";
import { getMyCapsules } from "../api/capsuleApi";
import CapsuleCard from "../components/CapsuleCard";

export default function Capsules() {
  const [capsules, setCapsules] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getMyCapsules();
        setCapsules(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Capsules</h2>

      {capsules.length === 0 && <p>No capsules created yet.</p>}

      <div style={{ 
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "16px",
        marginTop: "20px"
      }}>
        {capsules.map(cap => (
          <CapsuleCard key={cap._id} capsule={cap} />
        ))}
      </div>
    </div>
  );
}
