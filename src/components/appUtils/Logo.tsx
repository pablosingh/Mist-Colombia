import React from 'react';
import { Link } from 'react-router-dom';
import LogoMist from '../../assets/vectors/logo.svg';

const Logo = (): JSX.Element => {
  return (
    <div className='logoDiv'>
      <div className='logo'>
        <Link to='/'>
          <img src={LogoMist} alt='Logo Mist' />
        </Link>
      </div>
    </div>
  );
};

export default Logo;
