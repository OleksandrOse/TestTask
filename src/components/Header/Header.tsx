import React from 'react';
import { ButtonTypes } from '../../types/ButtonTypes';
import { Button } from '../Button/Button';
import { HeaderContent } from '../HeaderContent/HeaderContnent';
import { Logo } from '../Logo/Logo';

import './Header.scss';

type Props = {
  onGetToken: () => void;
  onGetUsers: () => void;
}

export const Header: React.FC<Props> = ({ onGetUsers, onGetToken }) => {
  const handleClick = () => {
    onGetUsers()
  }

  return (
    <header className="header">
      <div className="header__top">
        <div className="header-left">
          <Logo />
        </div>
        <div className="header-right">
          <Button type={ButtonTypes.Button} title={'Users'} handleClick={handleClick} />
          <Button type={ButtonTypes.Button} title={'Sign up'} handleClick={onGetToken} />
        </div>
      </div>

      <HeaderContent onGetToken={onGetToken} />
    </header>
  );
};
