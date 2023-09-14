import React, { useEffect, useState } from 'react';
import Nav from '../components/Navbar';
import { fetchProfilePicture } from '../utils/api';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import retrowavebg from '../images/retrowave_background.svg';
// import "./profile.css";

const Profile = ({ user, onLogout }) => {
  const [profilePicture, setProfilePicture] = useState();
  const [funFactInput, setFunFactInput] = useState(''); // Input for the fun fact
  const [funFact, setFunFact] = useState(''); // Displayed fun fact
  const [passwordInput, setPasswordInput] = useState('')
  const [password, setPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')

  useEffect(() => {
    if (user) {
      const fetchPosts = async (username) => {
        const photo = await fetchProfilePicture(username);
        setProfilePicture(photo);
      };
      fetchPosts(user.username);
  
      // Fetch the user's fun fact from Firestore when the component mounts
      const fetchFunFact = async () => {
        try {
          const userRef = doc(db, 'users', user.id);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setFunFact(userSnap.data().funFact || '');
          }
        } catch (error) {
          console.error(error); // Log the error, and optionally show an error message to the user
        }
      };
      
      fetchFunFact();
  
      const fetchPassword = async () => {
        try{
          const userRef = doc(db, 'users', user.id)
          const userSnap = await getDoc(userRef)
          if (userSnap.exists()) {
            setPassword(userSnap.data().password)
          }
        } catch(error) {
          console.error(error)
        }
      };
      fetchPassword();
    } // Closing the 'if' block
  }, [user]); // Closing the useEffect hook
  

  // Function to add the fun fact to Firestore
  const addFunFact = async () => {
    if (funFactInput) {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, { funFact: funFactInput }, { merge: true });
      setFunFact(funFactInput); // Update the displayed fun fact
      setFunFactInput(''); // Clear the input field after submitting
    }
  };

  
  const changePassword = async () => {
    if (passwordInput){
      if (currentPassword === password){
        const userRef = doc(db, 'users', user.id);
        await updateDoc(userRef, { password: passwordInput }, { merge: true });
        setPassword(passwordInput); // Update the displayed fun fact
        setPasswordInput(''); // Clear the input field after submitting
        setCurrentPassword(''); // Clear the input field after submitting
      }
    }
  }

  return (
    <div className='profile relative min-h-screen max-h-screen overflow-hidden bg-black z-0'>
      <Nav onLogout={onLogout} />
      <div className='flex justify-center min-w-full min-h-full'>
        <img src={retrowavebg} alt='background' className='absolute top-10 object-cover max-w-4xl sm:max-w-6xl lg:max-w-full lg:-top-10 overflow-hidden z-1'/>
      </div>
      
      <div className='wrapper absolute top-0 overflow-hidden z-0'>
        <div className='landscape overflow-hidden'></div>
      </div>
      <div className='absolute top-0 min-w-full min-h-full flex justify-center items-center z-10'>
        <div className='absolute sm:top-32 top-24 flex-wrap flex justify-center items-start w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 pt-16 mx-1 text-center border-double border-8 border-white z-30'>
          <div className='absolute min-w-full h-1/2 bg-black bottom-0 z-0'></div>
          <div className='absolute min-w-full h-1/2 gradientBackground bottom-0 z-0'></div>
          {user && (
            <>
              <div className='absolute h-3/5 w-11/12 grid grid-cols-1 grid-rows-4 top-0'>
                <h1 className='col-span-1 self-center justify-self-center profileName text-5xl sm:text-6xl font-bold z-50'>{user.username}</h1>
                {profilePicture?.picture?.fields?.file?.url && (
                  <img 
                    className='col-span-1 row-span-2 self-start justify-self-center rounded-lg h-4/5 object-cover border-solid border-4 border-white glow shadow-lg z-50' 
                    src={profilePicture.picture.fields.file.url} 
                    alt={user.username} 
                  />
                )}
                <p className="col-span-1 self-auto justify-self-center font-bold text-white z-40 flex justify-center">{funFact}</p>
              </div>
              <div className='absolute min-w-full h-2/5 flex justify-center bottom-3'>
                <div className='grid grid-cols-3 grid-rows-5 gap-2.5 w-11/12 sm:w-4/5 lg:w-3/5'> 
                  <input 
                    type="text"
                    className="rounded border-gray-300 col-span-3 z-50"
                    value={funFactInput}
                    onChange={e => setFunFactInput(e.target.value)}
                    placeholder="Enter a fun fact"
                  />
                  <button
                    className="btn text-white font-bold bg-black rounded col-span-3 z-50"
                    onClick={addFunFact}
                  >
                    Submit Fun Fact
                  </button>
                  <input 
                    type="text"
                    className="rounded border-gray-300 col-span-3"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    placeholder="Current password"
                  />
                  <input 
                    type="text"
                    className="rounded border-gray-300 col-span-3"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    placeholder="New Password"
                  />
                  <button
                    className="btn text-white font-bold bg-black rounded col-span-3"
                    onClick={changePassword}
                  >
                    Change password
                  </button>
                </div>
              </div>
            </>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
