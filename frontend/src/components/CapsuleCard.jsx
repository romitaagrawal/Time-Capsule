// // frontend/src/components/CapsuleCard.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import formatDate from "../utils/formatDate";

// export default function CapsuleCard({ capsule }) {
//   // determine unlocked by comparing current UTC-ish date to open_date
//   const unlocked = new Date() >= new Date(capsule.open_date);

//   return (
//     <div style={{
//       border: "1px solid #e6e6e6",
//       padding: 14,
//       borderRadius: 10,
//       background: "#fff",
//       boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
//     }}>
//       <h4 style={{ margin: "0 0 8px 0" }}>{capsule.title}</h4>

//       <div style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>
//         <div>Opens: {formatDate(capsule.open_date)}</div>
//         <div>Created: {formatDate(capsule.created_at)}</div>
//       </div>

//       <div style={{ marginBottom: 10 }}>
//         <strong style={{ color: unlocked ? "#1a7f37" : "#b02a2a" }}>
//           {unlocked ? "Unlocked 🔓" : "Locked 🔒"}
//         </strong>
//       </div>

//       <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//         {unlocked ? (
//           <Link to={`/capsule/${capsule._id}`}>
//             <button>View Capsule</button>
//           </Link>
//         ) : (
//           <button disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
//             Locked
//           </button>
//         )}

//         <div style={{ marginLeft: "auto", fontSize: 12, color: "#888" }}>
//           { (capsule.attachments && capsule.attachments.length) || 0 } files
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";

export default function CapsuleCard({ capsule }) {
  // Safe unlocked check: parse ISO date and compare to local now
  const openTime = new Date(capsule.open_date).getTime();
  const unlocked = Date.now() >= openTime;

  const attachmentsCount = (capsule.attachments && capsule.attachments.length) || 0;

  return (
    <div style={{ border: "1px solid #e6e6e6", padding: 14, borderRadius: 10 }}>
      <h4>{capsule.title}</h4>
      <div style={{ fontSize:13, color:"#666" }}>
        <div>Opens: {formatDate(capsule.open_date)}</div>
        <div>Created: {formatDate(capsule.created_at)}</div>
      </div>

      <div style={{marginTop:8}}>
        <strong style={{color: unlocked ? "#138000" : "#c22"}}>{unlocked ? "Unlocked 🔓" : "Locked 🔒"}</strong>
      </div>

      <div style={{display:"flex", alignItems:"center", marginTop:10}}>
        {unlocked ? (
          <Link to={`/capsule/${capsule._id}`}><button>View Capsule</button></Link>
        ) : (
          <button disabled style={{opacity:0.6}}>Locked</button>
        )}
        <div style={{marginLeft:"auto", color:"#888"}}>{attachmentsCount} files</div>
      </div>
    </div>
  );
}
