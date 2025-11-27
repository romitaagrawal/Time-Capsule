import api from "./apiClient";

function authHeader() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

export async function createEntry(payload) {
  const res = await api.post("/journal/", payload, { headers: authHeader() });
  return res.data;
}

export async function listEntries() {
  const res = await api.get("/journal/", { headers: authHeader() });
  return res.data;
}

export async function deleteEntry(id) {
  const token = localStorage.getItem("token");
  const res = await api.delete(`/journal/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
