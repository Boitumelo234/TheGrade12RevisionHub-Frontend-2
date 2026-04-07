// import React, { useState, useMemo } from "react";
// import formulas from "./formulas";
//
// export default function DataSheet({ open, onClose }) {
//     const [query, setQuery] = useState("");
//     const [openSections, setOpenSections] = useState({});
//
//     const sections = formulas.sections || [];
//
//     // filter function (simple case-insensitive substring)
//     const filteredSections = useMemo(() => {
//         if (!query.trim()) return sections;
//         const q = query.trim().toLowerCase();
//         return sections
//             .map(section => {
//                 const matchedItems = section.items.filter(it => it.toLowerCase().includes(q));
//                 if (section.titleEN.toLowerCase().includes(q) || matchedItems.length > 0) {
//                     return { ...section, items: matchedItems.length ? matchedItems : section.items };
//                 }
//                 return null;
//             })
//             .filter(Boolean);
//     }, [query, sections]);
//
//     if (!open) return null;
//
//     return (
//         <div
//             style={{
//                 position: "fixed",
//                 right: 0,
//                 top: 0,
//                 height: "100vh",
//                 width: 420,
//                 maxWidth: "90vw",
//                 background: "#fff",
//                 boxShadow: "-6px 0 24px rgba(0,0,0,0.15)",
//                 zIndex: 1200,
//                 padding: 18,
//                 overflowY: "auto"
//             }}
//         >
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
//                 <div>
//                     <strong style={{ fontSize: 16 }}>{formulas.title}</strong>
//                     <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
//                         TABLES & FORMULAE (plain text)
//                     </div>
//                 </div>
//
//                 <div style={{ display: "flex", gap: 8 }}>
//                     <button
//                         onClick={() => { setQuery(""); }}
//                         style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #ddd", background: "#fafafa" }}
//                         title="Clear search"
//                     >
//                         Clear
//                     </button>
//
//                     <button
//                         onClick={onClose}
//                         style={{
//                             padding: "6px 10px",
//                             borderRadius: 6,
//                             background: "#222",
//                             color: "white",
//                             border: "none",
//                             cursor: "pointer"
//                         }}
//                         title="Close data sheet"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </div>
//
//             <div style={{ marginTop: 12 }}>
//                 <input
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     placeholder="Search formulas (e.g. 'v =', 'Coulomb', 'P =')"
//                     style={{
//                         width: "100%",
//                         padding: "10px 12px",
//                         borderRadius: 8,
//                         border: "1px solid #ddd",
//                         fontSize: 14,
//                         marginBottom: 12
//                     }}
//                 />
//             </div>
//
//             {/* Constants Table */}
//             <div style={{ marginBottom: 14 }}>
//                 <strong>TABLE 1 — PHYSICAL CONSTANTS</strong>
//                 <div style={{ fontSize: 13, color: "#555", marginTop: 8 }}>
//                     {formulas.constantsTable.rows.map((r, i) => (
//                         <div key={i} style={{ padding: "6px 4px", borderBottom: "1px dashed #eee" }}>
//                             <div style={{ fontWeight: 600 }}>{r.nameEN} / {r.nameAF}</div>
//                             <div style={{ fontSize: 13, color: "#333" }}>
//                                 {r.symbol} — {r.value}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//
//             <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "12px 0" }} />
//
//             {/* Sections */}
//             {filteredSections.map((section, idx) => (
//                 <div key={section.id} style={{ marginBottom: 12 }}>
//                     <div
//                         role="button"
//                         onClick={() =>
//                             setOpenSections(s => ({ ...s, [section.id]: !s[section.id] }))
//                         }
//                         style={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             cursor: "pointer",
//                             padding: "8px 6px",
//                             background: "#fafafa",
//                             borderRadius: 6,
//                             border: "1px solid #eee"
//                         }}
//                     >
//                         <div>
//                             <strong>{section.titleEN}</strong>
//                             <div style={{ fontSize: 12, color: "#666" }}>{section.id}</div>
//                         </div>
//                         <div style={{ fontSize: 14 }}>{openSections[section.id] ? "▾" : "▸"}</div>
//                     </div>
//
//                     {openSections[section.id] && (
//                         <div style={{ padding: "10px 6px" }}>
//                             {section.items.map((it, i) => (
//                                 <div key={i} style={{ padding: "6px 0", borderBottom: i < section.items.length - 1 ? "1px dashed #f0f0f0" : "none" }}>
//                                     <div style={{ fontFamily: "monospace", whiteSpace: "pre-wrap", fontSize: 14 }}>{it}</div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             ))}
//
//             <div style={{ marginTop: 18, fontSize: 12, color: "#666" }}>
//                 Tip: use the search to quickly find formulae. Sections are collapsible.
//             </div>
//         </div>
//     );
// }
//
//
