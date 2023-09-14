import React, { useEffect, useState } from 'react';
import Nav from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { fetchPhotos } from '../utils/api';
import ReactAudioPlayer from 'react-audio-player';
import musicmtgn from '../images/pianomtgn.jpeg';
import eightiesthrowback from '../media/y2mate.is -  Back To The 80 s Marvel83 Edition Best of Synthwave And Retro Electro Music Mix-0QKQlf8r7ls-128k-1691954698.mp3'



const PhotoPage = ({ onLogout }) => {
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await fetchPhotos();
      const groupedByEvent = posts.reduce((groups, photo) => {
        const event = photo.event;
        if (!groups[event]) {
          groups[event] = [];
        }
        for (let i = 0; i < photo.picture.length; i++) {
          groups[event].push({
            id: photo.id,
            picture: photo.picture[i],
          });
        }
        return groups;
      }, {});
      setPhotos(groupedByEvent);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen" bg-repeat style={{backgroundImage: `url(${musicmtgn})`}}>
      <Nav onLogout={onLogout} />
      <Outlet /> 
      {/* <ReactAudioPlayer
            src={eightiesthrowback}
            autoPlay
            loop={true}
           className='bg-black object-center'/>    */}
      <div className="container mx-auto mt-8 pt-16 px-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">Photos</h1>
        {Object.entries(photos).map(([eventName, photos]) => (
          <div key={eventName} className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-white">{eventName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="border border-gray-300 rounded overflow-hidden shadow relative">
                  <div style={{ paddingBottom: "100%" }}></div>
                  <img 
                    className="absolute top-0 left-0 w-full h-full object-cover hover
                    transition duration-500 hover:scale-125" 
                    src={photo.picture.fields.file.url} 
                    alt={photo.picture.fields.title} 
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoPage;
