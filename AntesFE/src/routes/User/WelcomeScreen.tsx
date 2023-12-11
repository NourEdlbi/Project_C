import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeRedirect: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('Guest');

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('Userinfo');
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    
    if (userInfo && userInfo.name) {
      setUserName(userInfo.name);
    }

    const timer = setTimeout(() => {
      navigate('/userSidebar/Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h2>Hallo, {userName}! Welkom bij de antes onboarding app!</h2>
      {/* You can add additional content or styling here */}
    </div>
  );
};

export default WelcomeRedirect;
