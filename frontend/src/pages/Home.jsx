// Home.jsx

import React from 'react';
import Navbar from '../components/Navbar';
import LatestNews from '../components/LatestNews';
import Gallery from '../components/Gallery';
import InstaFeed from '../components/InstaFeed';
import Players from '../components/Players';
import PlayerOfMonth from '../components/PlayerOfMonth';
import Footer from '../components/Footer';
import MainLayout from '../components/MainLayout';

function Home() {
  return (
    <>
      <Navbar />
      <MainLayout/>
      <LatestNews />
      <Players />
      <Gallery />
      <PlayerOfMonth />
      <InstaFeed />
      <Footer />
    </>
  );
}

export default Home;
