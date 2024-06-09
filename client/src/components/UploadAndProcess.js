import React, { useState } from 'react';
import axios from 'axios';

function UploadAndProcess() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('audio', file);
    formData.append('text', text);

    try {
      const response = await axios.post('http://localhost:5000/cloneVoice', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAudioUrl(response.data.audioUrl);  // Assuming the server responds with the URL to the processed audio
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <input type="text" value={text} onChange={handleTextChange} placeholder="Enter lyrics" />
      <button type="submit">Clone Voice</button>
      {audioUrl && <audio controls src={audioLogUrl} />}
    </form>
  );
}

export default UploadAndProcess;
