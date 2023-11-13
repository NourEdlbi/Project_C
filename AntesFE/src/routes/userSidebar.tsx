import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import menuImage from '../assets/Anteslogo.png';
import "../headeroverlay.css";

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
            <a href={`/Logout`}>Logout</a>
        </div>
        <div className="sidebarbox">
            <a onClick={handleManageProfile}>Profile</a>
        </div>
        <div className="sidebarbox">
            <a onClick={handleManageAgenda}>Agenda</a>
        </div>
        <div className="sidebarbox">
            <a onClick={handleManageForum}>Forum</a>
        </div>
        <div className="sidebarbox">
            <a href={`/Informatie`}>Informatie</a>
        </div>
        <div className="sidebarbox">
            <a href={`/inst`}>Instellingen</a>
        </div>
      </div>

      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
