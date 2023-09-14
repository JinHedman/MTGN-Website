import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import retrowavebg from '../images/retrowave_background.svg';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getUserDataFromUsername = async (username) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const querySnapshot = await getDocs(q);
    let userData;

    querySnapshot.forEach((doc) => {
      // Add the document ID to the userData object
      userData = { id: doc.id, ...doc.data() };
    });

    if (!userData) {
      throw new Error('User not found');
    }

    return userData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await getUserDataFromUsername(username);
      const isMatch = password === userData.password;

      if (!isMatch) {
        setError('Invalid username or password');
      } else {
        onLogin(userData);  // userData includes the user's ID
        navigate('/');
      }
    } catch (err) {
      setError('Wrong');
      console.log(err);
    }
  };

  return (
    <div className='profile relative min-h-screen max-h-screen overflow-hidden bg-black z-0'>
      <div className='flex justify-center min-w-full min-h-full'>
        <img src={retrowavebg} alt='background' className='absolute top-10 object-cover max-w-4xl sm:max-w-6xl lg:max-w-full lg:-top-10 overflow-hidden z-1'/>
      </div>
      <div className='wrapper absolute top-0 overflow-hidden z-30'>
        <div className='landscape overflow-hidden'></div>
      </div>
      <div className='absolute top-0 min-w-full min-h-full flex justify-center items-center'>
        <div className='absolute flex-wrap flex justify-center place-items-between w-3/4 h-3/4 mx-1 gradientBackground text-center border-double border-8 border-white z-40'>
          <h1 className='absolute justify-self-center self-center w-full profileName uppercase text-5xl sm:text-6xl font-bold z-30'>MTGN</h1>
          <div className='relative w-11/12 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-1/5'>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-4 p-3 border rounded z-50"b
                placeholder="Name"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 p-3 border rounded z-50"
                placeholder="Password"
                required
              />
              <button className="w-full py-2 bg-transparent text-white font-semibold text-3xl glow rounded" type="submit">
                Login
              </button>
            </form>
            {error && <p className="text-red-600 mb-4">{error}</p>}
          </div>
        </div>  
      </div>
    </div>
  );
};

export default LoginPage;
