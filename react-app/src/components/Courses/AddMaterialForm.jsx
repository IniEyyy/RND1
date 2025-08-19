import React, { useState } from 'react';
import './addMaterialForm.css';

function AddMaterialForm({ courseId, onAdd }) {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const token = localStorage.getItem('token');

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert('Please select at least one file.');

    const formData = new FormData();
    formData.append('content', description);
    files.forEach((file) => formData.append('files', file));

    try {
      const res = await fetch(`http://localhost:5000/api/instructor/courses/${courseId}/materials`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert('Material(s) uploaded successfully!');
      setFiles([]);
      setDescription('');
      onAdd();
    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
  };

  return (
    <form className="add-material-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h4>Add Material</h4>
      {files.length > 0 && (
        <ul className="file-list">
          {files.map((file, index) => (
            <li key={index}>
              {file.name}
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeFile(index)}
                title="Remove"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
      <div
        className={`dropzone ${dragActive ? 'active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      > 
        <p>Drag & Drop files here or click to select</p>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          accept=".pdf,.doc,.docx,.xlsx,.ppt,.pptx,.zip,.rar,.mp4,.avi,.mov,.jpg,.jpeg,.png,.c,.cpp,.py,.ipynb"
        />
      </div>

      <textarea
        placeholder="Material Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br/>

      <button type="submit" className="submit-btn">Upload Material</button>
    </form>
  );
}

export default AddMaterialForm;
