// src/api.js

import axios from "axios";

/**
 * Create a reusable axios instance
 * - baseURL points to your FastAPI backend
 * - withCredentials allows cookies if needed (safe to keep)
 */
export const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});

/**
 * Upload PDF to backend
 * Endpoint: POST /upload/
 * Backend expects: file (multipart/form-data)
 */
export const uploadPDF = async (file) => {
  try {
    const formData = new FormData();

    // IMPORTANT: key must be "file" (matches FastAPI UploadFile parameter)
    formData.append("file", file);

    const response = await API.post("/upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Upload error:", error);
    return { error: "File upload failed" };
  }
};

/**
 * Query RAG system
 * Endpoint: GET /query/?q=your_question
 * Backend expects query param 'q'
 */
export const askQuestion = async (query) => {
  try {
    const response = await API.get("/query/", {
      params: { q: query }, // attaches ?q=your_question
    });

    return response.data;
  } catch (error) {
    console.error("Query error:", error);
    return { error: "Query failed" };
  }
};