// src/components/UploadPanel.js

import React, { useState } from "react";
import { uploadPDF } from "../api"; // use your API helper (cleaner abstraction)

function UploadPanel() {
  const [file, setFile] = useState(null);      // stores selected file
  const [loading, setLoading] = useState(false); // upload state

  // Handle file upload
  const handleUpload = async () => {
    // ❗ Validation: no file selected
    if (!file) {
      alert("Please select a file first");
      return;
    }

    try {
      setLoading(true);

      // Call backend API
      const res = await uploadPDF(file);

      console.log("Upload response:", res);

      // Handle backend error
      if (res.error) {
        alert("Upload failed: " + res.error);
      } else {
        alert("File uploaded successfully ✅");
      }

    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong during upload ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "15px", borderRight: "1px solid #ccc", width: "250px" }}>
      
      <h3>Upload Logs</h3>

      {/* File Input */}
      <input
        type="file"
        accept=".pdf" // restrict to PDF only
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      {/* Upload Button */}
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* Optional: show selected file */}
      {file && (
        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          Selected: {file.name}
        </p>
      )}
    </div>
  );
}

export default UploadPanel;