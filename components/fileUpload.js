import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("http://localhost:8020/api/data/upload", formData);
            alert("File uploaded successfully");
        } catch (error) {
            alert("Failed to upload file");
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload</button>
        </div>
    );
}

export default FileUpload;