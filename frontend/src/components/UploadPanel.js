// components/UploadPanel.js
import React, { useState } from "react";
import { API } from "../api";

function UploadPanel() {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await API.post("/upload/", formData);
    alert("Uploaded!");
  };

  return (
    <div style={{ padding: "10px", borderRight: "1px solid #ccc" }}>
      <h3>Upload Logs</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}

export default UploadPanel;