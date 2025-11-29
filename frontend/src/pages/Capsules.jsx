// import React, { useEffect, useState } from "react";
// import { getMyCapsules } from "../api/capsuleApi";
// import CapsuleCard from "../components/CapsuleCard";

// export default function Capsules() {
//   const [capsules, setCapsules] = useState([]);

//   useEffect(() => {
//     async function load() {
//       try {
//         const data = await getMyCapsules();
//         setCapsules(data);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     load();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>My Capsules</h2>

//       {capsules.length === 0 && <p>No capsules created yet.</p>}

//       <div style={{ 
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//         gap: "16px",
//         marginTop: "20px"
//       }}>
//         {capsules.map(cap => (
//           <CapsuleCard key={cap._id} capsule={cap} />
//         ))}
//       </div>
//     </div>
//   );
// }
// src/pages/Capsules.jsx
import React, { useEffect, useState } from "react";
import { getMyCapsules } from "../api/capsuleApi";
import CapsuleCard from "../components/CapsuleCard";
import { useNavigate } from "react-router-dom";

export default function Capsules() {
  const navigate = useNavigate();
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

  function Header() {
    const token = localStorage.getItem("token");
    const go = (p) => {
      if (!token && (p === "/create-capsule" || p === "/journal")) return navigate("/login");
      navigate(p);
    };
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      navigate("/");
    };
    return (
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div style={{fontWeight:700,fontSize:20,cursor:"pointer"}} onClick={()=>navigate("/")}>TimeCapsule</div>
        <div style={{display:"flex",gap:10}}>
          <button className="tc-btn primary" onClick={()=>go("/create-capsule")}>Create Capsule</button>
          <button className="tc-btn soft" onClick={()=>go("/journal")}>Journal</button>
          <button className="tc-btn ghost" onClick={()=>logout()}>Logout</button>
        </div>
      </header>
    );
  }

  return (
    <>
      <style>{`
        :root{ --bg: linear-gradient(135deg,#fef3ff 0%, #f0f8ff 40%, #fffaf0 100%); }
        .root{ min-height:100vh; background:var(--bg); padding:28px 40px; font-family:Inter,system-ui,Arial;}
        .container{ max-width:1100px; margin:0 auto;}
        .grid{ display:grid; gap:16px; grid-template-columns: repeat(auto-fill,minmax(250px,1fr)); }
      `}</style>

      <div className="root">
        <div className="container">
          <Header />
          <h2 style={{ marginTop: 6 }}>My Capsules</h2>
          {capsules.length === 0 && <p>No capsules created yet.</p>}
          <div className="grid" style={{ marginTop: 12 }}>
            {capsules.map(cap => <CapsuleCard key={cap._id} capsule={cap} />)}
          </div>
        </div>
      </div>
    </>
  );
}
