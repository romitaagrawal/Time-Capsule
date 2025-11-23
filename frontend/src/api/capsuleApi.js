import api from "./apiClient";

export async function getMyCapsules() {
  const token = localStorage.getItem("token");

  const res = await api.get("/capsules", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.capsules;
}

export async function createCapsuleApi(title, creator_name, open_date, files) {
  const token = localStorage.getItem("token");

  let attachmentList = [];

  if (files && files.length > 0) {
    const formData = new FormData();
    for (let f of files) formData.append("files", f);

    const uploadRes = await api.post("/upload/files", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    attachmentList = uploadRes.data.files;
  }

  const res = await api.post(
    "/capsules",
    { title, creator_name, open_date, attachments: attachmentList },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
}
