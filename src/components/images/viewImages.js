import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getUserInfo from '../../utilities/decodeJwt'

export default function ViewImages() {
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
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  if (!user) return (<div><h3>You are not authorized to view this page, Please Login in <Link to={'/login'}><a href='#'>here</a></Link></h3></div>);

  return (
    <div>
      <h1>Uploaded Images</h1>

      <div>
        {images.map((image, index) => (
          <div key={index}>
            <h5>{image.name}</h5>
            <p>{image.desc}</p>
            <img src={`data:${image.img.contentType};base64,${image.img.data.toString('base64')}`} alt={image.name} />
          
            <div>
          <img
            src="data:image/<%=image.img.contentType%>;base64,
                    <%=image.img.data.toString('base64')%>"
          />
        </div>
          
          </div>
        ))}
      </div>

      <hr />
    </div>
  );
}
