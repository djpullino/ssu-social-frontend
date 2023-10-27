import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getUserInfo from '../../utilities/decodeJwt'
import {useDarkMode } from '../DarkModeContext';
export default function ViewImages() {
  const { darkMode } = useDarkMode();
  const [user, setUser] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    setUser(getUserInfo());
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/images/getAll`);
      const data = await response.json();
      setImages(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  const handleRemoveImage = async (imageId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (!confirmDelete) {
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/images/${imageId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Update the images state after successful deletion
        setImages(images.filter((image) => image._id !== imageId));
      } else {
        const data = await response.json();
        console.error('Error removing image:', data.message);
      }
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  if (!user) return (
    <div>
      <h3>You are not authorized to view this page, Please Login in <Link to={'/login'}>here</Link></h3>
    </div>
  );

  return (
    <div style={{ textAlign: 'center', padding: '20px', background: darkMode ? 'black' : 'white', minHeight: '100vh', }}>
      <h1 style={{ fontSize: '28px', color: '#333', color: darkMode ? 'white': '' }}>View Images</h1>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <div key={index} style={{ border: '1px solid #ccc', borderRadius: '8px', margin: '10px', padding: '15px', width: '300px', background: darkMode ? "#181818" : "#f6f8fa", }}>
            <h5 style={{ fontSize: '18px', color: '#444', color: darkMode ? 'white': '' }}>Image Title: {image.name}</h5>
            <p style={{ fontSize: '14px', color: '#666', color: darkMode ? 'white': '' }}>Image Description: {image.desc}</p>
            <img
              src={`data:${image.img.contentType};base64,${image.base64Data}`}
              alt={image.name}
              style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
            />
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'red',
                transition: 'color 0.3s ease',
              }}
              onClick={() => handleRemoveImage(image._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <hr style={{ border: '1px solid #ccc', margin: '20px 0' }} />
    </div>
  );
}
