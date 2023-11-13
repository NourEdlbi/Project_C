import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import menuImage from '../../assets/Anteslogo.png';
import "../../headeroverlay.css";

export default function UserSidebar() {
    const navigate = useNavigate();

    const handleManageProfile = () => {
    // Navigate to the "Profile" route
    navigate('profile');
    };

    const handleManageLogout = () => {
        // Navigate to the "Profile" route
        navigate('logout');
    };

    const handleManageHome = () => {
        // Navigate to the "Profile" route
        navigate('Home');
    };

  const handleManageAgenda = () => {
    // Navigate to the "Agenda" route
    navigate('Agenda');
  };

  const handleManageForum = () => {
    // Navigate to the "Profile" route
    navigate('userForum');
    };
    const handleManageSettings = () => {
        // Navigate to the "Profile" route
        navigate('inst');
    };
    const handleManageInfo = () => {
        // Navigate to the "Profile" route
        navigate('Informatie');
    };

  return (
   <div>
          <div className="sidebar">
              <img src={menuImage} alt="Menu" style={{ width: '100px', height: 'auto' }} />
              
              <div className="sidebarbox">
                  <a onClick={handleManageLogout}>Logout</a>
              </div>
              <div className="sidebarbox">
                  <a onClick={handleManageHome}>Home</a>                  
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
                  <a onClick={handleManageInfo}>Informatie</a>

                  <div className="dropdown-content">
                      <a className= "border">Protocollen en Richtlijnen</a> <br />
                      <a className= "border">cursussen</a> <br />
                      <a className="border">test</a>
                  </div>
              </div>

              <div className="sidebarbox">
                  <a onClick={handleManageSettings}>Instellingen</a>
              </div>
          </div>

          <div id="detail">
              <Outlet />
          </div>
   </div>
      
   
  );
}
