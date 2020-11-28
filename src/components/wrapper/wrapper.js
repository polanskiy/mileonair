import React from 'react';
import { Link } from 'react-router-dom';
import SideMenu from '../sideMenu/sideMenu';
import './wrapper.css';

const Wrapper = ({ children, match }) => {
  let currentPage = '';
  switch (match.path) {
    case '/user-info':
      currentPage = 'Данные пользователей';
      break;
    case '/transactions':
      currentPage = 'Транзакции';
      break;

    default:
      currentPage = 'Добавить пользователя';
      break;
  }

  return (
    <div className="wrapper">
      <SideMenu match={match} />
      <div className="mainContent">
        <div className="crumbs">
          <p>
            <Link to="/">Главная</Link>
            {' '}
            -
            {' '}
            {currentPage}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
