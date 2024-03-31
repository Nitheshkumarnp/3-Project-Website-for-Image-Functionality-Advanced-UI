import React, { useState, useEffect } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [message, setMessage] = useState(null);

  const handleFile = async (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://image-advanced-functionality-services.onrender.com/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleGetAllList = async () => {
    try {
      const response = await fetch('https://image-advanced-functionality-services.onrender.com/list');
      const data = await response.json();
      setFileList(data.fileList);
    } catch (error) {
      console.error('Get images error:', error);
    }
  };

  const clearAll = async () => {
    setFile(null);
    setFileList([]);
    setMessage(null);
  };

  useEffect(() => {
    clearAll();
  }, []);

  return (
    <div>
      <input type="file" onChange={handleFile} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleGetAllList}>Get All File List</button>
      <button onClick={clearAll}>Clear</button>
      {message ? <p>{message}</p> : null}
      {fileList.length > 0 ? fileList.map((file) => (
        <p>{file}</p>
      )) : null}
    </div>
  );
}

export default App;
