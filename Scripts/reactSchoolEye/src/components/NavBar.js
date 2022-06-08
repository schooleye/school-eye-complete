import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useGlobalContext } from '../context/appContext';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout, isMinistry } = useGlobalContext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      {user && (
        <div className='nav-center' id='top'>
          <img src={logo} alt='school-eye' className='home-logo' />
          {/* <div className='links'>
            <Link
              activeClass='active'
              to='target'
              spy={true}
              smooth={true}
              hashSpy={true}
              offset={50}
            >
              Your name
            </Link>
            <Link
              activeClass='active'
              to='target'
              spy={true}
              smooth={true}
              hashSpy={true}
              offset={50}
            >
              Your name
            </Link>
          </div> */}
          <div className='btn-container'>
            <button className='btn' onClick={() => setShowLogout(!showLogout)}>
              <FaUserCircle />
              {user.institution || user.email}
              <FaCaretDown />
            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
              {!isMinistry && (
                <Link to='/dashboard/tests' className='dropdown-btn'>
                  tests
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  return navigate('/register');
                }}
                className='dropdown-btn'
              >
                logout
              </button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .nav-center {
    width: var(--fluid-width);
    max-width: var(--max-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--white);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    transition: var(--transition);
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
`;

export default Navbar;
