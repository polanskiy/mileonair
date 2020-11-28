import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import profile from '../../images/profile.png';

const ProfileInfo = () => (
  <div className="profileInfo">
    <div className="profileInfo__logo">
      <Link to="/">
        <img src={logo} alt="mileonair" />
      </Link>
    </div>
    <div className="profileInfo__avatar">
      <img src={profile} alt="profile" />
    </div>
    <p className="profileInfo__name">
      Виктория Макарова
    </p>
    <p className="profileInfo__position">
      менеджер по работе с клиентами
    </p>
  </div>
);

export default ProfileInfo;
