import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [file, setFile] = useState('');
  const [fileList, setFileList] = useState([]);
  const [message, setMessage] = useState('');
  const [searchFile,setSearchFile] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [fileSrc, setFileSrc] = useState('');
  const fileInputRef = useRef(null);

  const handleFile = async (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('uploadedFile', file);

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
    setFile('');
    setFileList([]);
    setMessage('');
    setSearchFile('');
    setImageSrc('');
    setFileSrc('');
    fileInputRef.current.value = '';
  };

  const handleInput = async (e) => {
    setSearchFile(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const url = 'https://image-advanced-functionality-services.onrender.com/file?file_name_with_extension=' + searchFile;
      const response = await fetch(url);
      // const data = await response;
      // return data;
      const fileArray = searchFile.split('.');
      const ext = fileArray[fileArray.length - 1];
      if(ext == 'txt') {
        const data = await response.text();
        setFileSrc(data);
      } else {
        const blob = await response.blob();
        const imageURL = URL.createObjectURL(blob);
        setImageSrc(imageURL);
      }
    } catch (error) {
      console.error('Get images error:', error);
    }
  };

  useEffect(() => {
    clearAll();
  }, []);

  return (
    <div>
      <input type="file" ref={fileInputRef} onChange={handleFile} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleGetAllList}>Get All File List</button>
      <button onClick={clearAll}>Clear</button>
      <input type='text' value={searchFile}  placeholder='search file' onChange={handleInput}/>
      <button onClick={handleSearch}>Search</button>
      {message ? <p>{message}</p> : null}
      {imageSrc && <img src={imageSrc} alt="Image" />}
      {fileSrc ? <div style={{ whiteSpace: 'pre-line' }}>{fileSrc}</div> : null}
      {fileList.length > 0 ? fileList.map((file) => (
        <p>{file}</p>
      )) : null}
    </div>
  );
}

export default App;
