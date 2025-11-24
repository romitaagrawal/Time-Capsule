// frontend/src/api/capsuleApi.js
import api from "./apiClient";

export async function createCapsule(data) {
  const token = localStorage.getItem("token");
  const res = await api.post("/capsules/", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function uploadCapsuleFiles(capsuleId, files) {
  const token = localStorage.getItem("token");
  const form = new FormData();
  for (const file of files) form.append("files", file);

  const res = await api.post(`/upload/capsule/${capsuleId}/files`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function listCapsules() {
  const token = localStorage.getItem("token");
  const res = await api.get("/capsules/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { capsules: [...] }
}

export async function getCapsule(id) {
  const token = localStorage.getItem("token");
  const res = await api.get(`/capsules/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { locked: bool, open_date:..., capsule: {...} }
}
