/*
 * Header
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Logo from '../../common/Logo/Logo';

const HeaderBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 15px 25px;
`;

const Navigation = styled.nav`
  button {
    display: none;
    border: none;
    background: none;
    -webkit-appearance: none;
  }

  ul {
    padding: 0;
  }

  li {
    position: relative;
    display: inline-block;
    margin: 0 15px;

    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  li:hover:after {
    content: '';
    position: absolute;

    left: 0;
    top: 16px;

    width: 95%;
    height: 2px;

    background-color: #485cc7;
  }

  li:hover {
    color: #485cc7;
  }

  li a,
  li a:visited {
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 768px) {
    button {
      display: block;
    }

    ul {
      display: none;
      position: absolute;
      width: 100%;
      left: 0;
      padding: 10px;
      background-color: #222;
      text-align: center;
    }

    ul li {
      color: #fff;
      padding: 10px;
    }

    ul.open {
      display: block;
    }
  }
`;

export default function Header() {
  const [nav, navOpen] = useState(false);

  return (
    <HeaderBar>
      <Link onClick={() => navOpen(false)} to="/">
        <Logo />
      </Link>
      <Navigation>
        <button type="button" onClick={() => navOpen(!nav)}>
          menu
        </button>
        <ul className={nav ? 'open' : undefined}>
          <li>
            <Link onClick={() => navOpen(false)} to="/about">
              About
            </Link>
          </li>
          <li>
            <Link onClick={() => navOpen(false)} to="/help">
              Help
            </Link>
          </li>
          <li>
            <Link onClick={() => navOpen(false)} to="/settings">
              Settings
            </Link>
          </li>
        </ul>
      </Navigation>
    </HeaderBar>
  );
}
