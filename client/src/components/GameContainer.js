import React, { useState } from 'react';
import Navbar from './Navbar';
import LogIn from './pages/LogIn';
import Rules from './pages/Rules';
import Stats from './pages/Stats';
import Donate from './pages/Donate';
import Welcome from './pages/Welcome';

export default function GameContainer() {
  const [currentPage, setCurrentPage] = useState('Rules');

  // TODO: Add a comment describing the functionality of this method
  const renderPage = () => {
    if (currentPage === 'Welcome') {
      return <Welcome />;
    }
    if (currentPage === 'Rules') {
      return <Rules />;
    }
    if (currentPage === 'Stats') {
      return <Stats />;
    }
    if (currentPage === 'Donate') {
      return <Donate />;
    }
    return <LogIn />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className='GameContainer'>
      <div>
        <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
        {renderPage()}
      </div>
    </div>
  );
}
