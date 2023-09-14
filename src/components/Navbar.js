import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@material-tailwind/react';

export default function Nav({ onLogout }) {
  const [openNav, setOpenNav] = useState(false);

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  return (
    <>
      <nav className="bg-indigo-300 sticky inset-0 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 z-50">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to="/" className="mr-4 cursor-pointer py-1.5 font-medium text-blue-gray-500">
            MTGN
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:flex lg:items-center lg:gap-6">
              <Link to="/profile" className="p-1 font-normal text-blue-gray-500">
                Profil
              </Link>
              <Link to="/photos" className="p-1 font-normal text-blue-gray-500">
                Foton
              </Link>
              <Link to="/contacts" className="p-1 font-normal text-blue-gray-500">
                nØllan
              </Link>
              <Link to="/phos" className="p-1 font-normal text-blue-gray-500">
                Phösare
              </Link>
              <Link to="/schedule" className="p-1 font-normal text-blue-gray-500">
                Schema
              </Link>
              <Button variant="text" color="blue-gray" className="p-1 font-normal" onClick={onLogout}>
                Logga ut
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <div 
          className="flex flex-col mt-2 gap-2 lg:hidden overflow-hidden transition-all ease-in-out duration-300"
          style={{ maxHeight: openNav ? "300px" : "0" }}
        >
          <Link to="/profile" className="p-1 font-normal text-blue-gray-500">
            Profil
          </Link>
          <Link to="/photos" className="p-1 font-normal text-blue-gray-500">
            Foton
          </Link>
          <Link to="/contacts" className="p-1 font-normal text-blue-gray-500">
          nØllan
          </Link>
          <Link to="/phos" className="p-1 font-normal text-blue-gray-500">
            Phösare
          </Link>
          <Link to="/schedule" className="p-1 font-normal text-blue-gray-500">
            Schema
          </Link>
          <Link variant="text" color="blue-gray" className="p-1 font-normal" onClick={onLogout}>
            Logga ut
          </Link>
        </div>
      </nav>
    </>
  );
}
