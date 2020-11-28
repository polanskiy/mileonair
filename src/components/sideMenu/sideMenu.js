import React from 'react';
import Navigation from './navigation';
import ProfileInfo from './profileInfo';
import './sideMenu.css';

const SideMenu = () => (
  <div className="sideMenu">
    <ProfileInfo />
    <Navigation />
  </div>
);

export default SideMenu;
