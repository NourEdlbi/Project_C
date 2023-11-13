import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import menuImage from '../assets/Anteslogo.png';

export default function UserSidebar() {
  const navigate = useNavigate();

  const handleManageProfile = () => {
    // Navigate to the "Profile" route
    navigate('profile');
  };

  const handleManageAgenda = () => {
    // Navigate to the "Agenda" route
    navigate('Agenda');
  };

  const handleManageForum = () => {
    // Navigate to the "Profile" route
    navigate('userForum');
  };

  return (
    <>
      <div className="header">
        <img src={menuImage} alt="Menu" style={{ width: '100px', height: 'auto' }} />
        <div className="sidebarbox">
          <a onClick={handleManageProfile}>Profile</a>
          <a onClick={handleManageAgenda}>Agenda</a>
          <a onClick={handleManageForum}>Forum</a>
        </div>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
