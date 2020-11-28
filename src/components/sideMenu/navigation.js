import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ReactComponent as Register } from '../../images/register.svg';
import { ReactComponent as UserInfo } from '../../images/userInfo.svg';

const Navigation = ({ match }) => (
  <div className="navigation">
    <Link
      to="/register"
      className={match.path === '/register' ? 'navigation__link_active navigation__link' : 'navigation__link'}
    >
      <Register />
      {' '}
      Добавить клиента
    </Link>
    <Link
      to="/user-info"
      className={match.path === '/user-info' ? 'navigation__link_active navigation__link' : 'navigation__link'}
    >
      <UserInfo />
      {' '}
      Данные пользователей
    </Link>
  </div>
);

export default withRouter(Navigation);
