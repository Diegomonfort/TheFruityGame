import React from 'react';
import { useSelector } from 'react-redux';
import HomeLogout from '../components/Home_Component/home_1';
import HomeSignedIn from '../components/Home_Component/home_2';

const Home = () => {
  const userId = useSelector((state) => state.user.userId);

  return (
    <div>
      {!userId ? (
        <HomeLogout/>
      ) : (
       <HomeSignedIn/>
      )}
    </div>
  );
};

export default Home;
