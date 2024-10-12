import React, { useState } from 'react';
import axios from 'axios';
import './SubmitForm.css';

const SubmitForm = () => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('handle', handle);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      await axios.post('http://localhost:5000/api/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Submission Successful');
    } catch (err) {
      console.error(err);
      alert('Submission Failed');
    }
  };

  return (
    <div className="submit-form">
      <h2>Submit Your Social Media Info</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Social Media Handle</label>
          <input
            type="text"
            placeholder="Enter your handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Images</label>
          <input type="file" multiple onChange={handleImageChange} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitForm;
