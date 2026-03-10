import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

export const registerConsent = async (file, policy, notes) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("policy", policy);
  if (notes) formData.append("notes", notes);

  const response = await api.post(
    "/register-consent",
    formData,
    // ❌ DO NOT set Content-Type manually
  );
  return response.data;
};

export const verifyImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/verify-image", formData);
  return response.data;
};

export const getRegistry = async () => {
  const response = await api.get("/registry");
  return response.data;
};

export default api;
