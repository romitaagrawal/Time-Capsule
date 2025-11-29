// import React from "react";
// import { Link } from "react-router-dom";
// import formatDate from "../utils/formatDate";

// export default function CapsuleCard({ capsule }) {
//   // Safe unlocked check: parse ISO date and compare to local now
//   const openTime = new Date(capsule.open_date).getTime();
//   const unlocked = Date.now() >= openTime;

//   const attachmentsCount = (capsule.attachments && capsule.attachments.length) || 0;

//   return (
//     <div style={{ border: "1px solid #e6e6e6", padding: 14, borderRadius: 10 }}>
//       <h4>{capsule.title}</h4>
//       <div style={{ fontSize:13, color:"#666" }}>
//         <div>Opens: {formatDate(capsule.open_date)}</div>
//         <div>Created: {formatDate(capsule.created_at)}</div>
//       </div>

//       <div style={{marginTop:8}}>
//         <strong style={{color: unlocked ? "#138000" : "#c22"}}>{unlocked ? "Unlocked 🔓" : "Locked 🔒"}</strong>
//       </div>

//       <div style={{display:"flex", alignItems:"center", marginTop:10}}>
//         {unlocked ? (
//           <Link to={`/capsule/${capsule._id}`}><button>View Capsule</button></Link>
//         ) : (
//           <button disabled style={{opacity:0.6}}>Locked</button>
//         )}
//         <div style={{marginLeft:"auto", color:"#888"}}>{attachmentsCount} files</div>
//       </div>
//     </div>
//   );
// }
// src/components/CapsuleCard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import formatDate from "../utils/formatDate";

export default function CapsuleCard({ capsule }) {
  const navigate = useNavigate();
  const openTime = new Date(capsule.open_date).getTime();
  const unlocked = Date.now() >= openTime;
  const attachmentsCount = (capsule.attachments && capsule.attachments.length) || 0;

  const goTo = (path) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    navigate(path);
  };

  return (
    <div style={{
      background: "white",
      borderRadius: 12,
      padding: 14,
      border: "1px solid rgba(0,0,0,0.04)",
      boxShadow: "0 8px 24px rgba(16,24,40,0.04)"
    }}>
      <h4 style={{ margin: 0 }}>{capsule.title}</h4>
      <div style={{ fontSize: 13, color: "#6b7280", marginTop: 8 }}>
        <div>Opens: {formatDate(capsule.open_date)}</div>
        <div>Created: {formatDate(capsule.created_at)}</div>
      </div>

      <div style={{ marginTop: 10, display: "flex", alignItems: "center" }}>
        {unlocked ? (
          <button
            onClick={() => goTo(`/capsule/${capsule._id}`)}
            style={{ background: "linear-gradient(90deg,#7aa2ff,#8ec2ff)", color: "white", borderRadius: 8, padding: "8px 12px", border: "none", cursor: "pointer" }}
          >View Capsule</button>
        ) : (
          <button disabled style={{ opacity: 0.6, padding: "8px 12px", borderRadius: 8 }}>Locked</button>
        )}

        <div style={{ marginLeft: "auto", color: "#888" }}>{attachmentsCount} files</div>
      </div>
    </div>
  );
}
