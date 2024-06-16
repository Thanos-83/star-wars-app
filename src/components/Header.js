import React from 'react';
// import logo from './logo.svg';
// import logo from '../public/star-wars-logo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className=' py-6 bg-white sticky top-0 shadow'>
      <header className='container flex items-center justify-between'>
        <Link to='/'>
          <img
            src='/star-wars-logo.png'
            // src={logo}
            className='w-16 h-8'
            alt='logo'
          />
        </Link>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Header;
