import axios from "axios";

// Configuración base de axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api", // URL del backend en producción o local
});

// Helper para crear FormData
const createFormData = (data) => {
  const form = new FormData();
  for (let key in data) {
    form.append(key, data[key]);
  }
  return form;
};

// Solicitudes API
export const getPostsRequest = async () => {
  try {
    return await api.get("/posts");
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPostRequest = async (id) => {
  try {
    return await api.get(`/posts/${id}`);
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
};

export const deletePostRequest = (id) => api.delete(`/posts/${id}`);

export const createPostRequest = async (post) => {
  const form = createFormData(post);
  try {
    return await api.post("/posts", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePostRequest = async (id, newPostFields) => {
  const form = createFormData(newPostFields);
  try {
    return await api.put(`/posts/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error(`Error updating post ${id}:`, error);
    throw error;
  }
};
