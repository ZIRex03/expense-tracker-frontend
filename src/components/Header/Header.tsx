import React from 'react'

import './Header.scss';

import LOGO_DARK from "@images/icons/logo-dark.png";
import { FaUserAlt } from "react-icons/fa";
import { useAppDispatch } from 'hooks/reduxHooks';
import { changeFormType, toggleForm } from 'features/user/userSlice';

type Props = {}

const Header = (props: Props) => {

  const dispatch = useAppDispatch();

  const openUserForm = (type: string) => {
    dispatch(changeFormType(type));
    dispatch(toggleForm(true));
  };

  return (
    <header className='header'>
        <div className="header__logo">
            <img src={LOGO_DARK} alt="SubTrackr" />
        </div>

        <div className="header__user">
            <button
              className='header__user-signup'
              onClick={() => openUserForm('signup')}
            >
              Зарегестрироваться
            </button>

            <button
              className='header__user-login'
              onClick={() => openUserForm('login')}
            >
              Войти
            </button>
        </div>

        <div className='header__user mobile'>
            <FaUserAlt className='user-icon'/>
        </div>
    </header>
  )
}

export default Header