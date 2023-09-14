import React, { useState, useEffect } from 'react';
import Nav from '../components/Navbar';
import ProfileCard from '../components/Profilecard';
import { fetchAllUsers } from '../utils/api';
import rgbfootgif from '../images/rgbfootsteps.gif';



const ContactBook = ({onLogout }) => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await fetchAllUsers();
      setUsers(allUsers);
    };

    fetchUsers();

  }, []);

  return (
    <div className="min-h-screen bg-repeat bg-peach" style={{backgroundImage: `url(${rgbfootgif})`}}>
      <Nav onLogout={onLogout} />
      <div className="pt-16 flex flex-row flex-wrap" >
        {users.map((user) => (
          <div className="pb-10 px-10">
          <ProfileCard key={user.username} username={user.username} picture={user?.picture?.fields?.file?.url} funfact={user.funFact}/>
          </div>
        ))}
              {/* <img src={rgbfootgif} alt="funny animation GIF" class="object-fill z-10 bg-repeat"/>  */}
      </div>
    </div>
  );
};

export default ContactBook;