/*
 *  Breadcrumb
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';

import Logo from 'components/common/Logo/Logo';
import TextInput from 'components/form/input/Text';
import { Link, NavLink } from 'react-router-dom';

import {
  BookOpen,
  Bell,
  HelpCircle,
  Settings,
  Menu,
  Search,
  X,
  Upload,
} from 'react-feather';
import NavIcon from './NavIcon';
import UploadIcon from './UploadIcon';
import { media } from 'theme';
import IconButton from 'components/common/IconButton';

const MenuIcon = styled(IconButton)`
  display: none;

  ${media.tablet`
    display: flex;
  `}
`;

const Layout = styled.div`
  display: flex;
  height: 64px;
  box-sizing: border-box;
  padding: 10px 24px;

  background: ${props => props.theme.colors.white};

  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: space-between;

  ${media.phone`
    padding: 10px;
  `}
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  input {
    margin: 0 25px;
  }

  ${media.tablet`
    width: 100%;
    justify-content: center;

    input {
      display: none;
    }
  `}
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;

  ${media.tablet`
    display: none;
  `}
`;

const MobileMenu: any = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  transition: transform 0.5s ease;

  position: absolute;
  top: 0;
  left: 0;

  box-sizing: border-box;

  height: 100%;
  width: 200px;

  background: ${props => props.theme.colors.white};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

  z-index: 100;

  > div:nth-child(2) {
    flex-grow: 1;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;

  padding: 20px 10px 20px 20px;

  > ${IconButton} {
    margin: 0;
  }
`;

const MobileMenuFooter = styled.div``;

const MobileMenuLink = styled(NavLink)`
  display: flex;
  align-items: center;

  height: 50px;
  width: 190px;

  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  margin: 10px 0;
  padding-left: 20px;

  box-sizing: border-box;

  color: ${props => props.theme.colors.darkGrey};
  font-family: ${props => props.theme.type.sans_serif};
  text-decoration: none;

  &.active {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }

  > svg {
    margin-right: 20px;
  }
`;

const MenuBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 99;

  background: #000000;
  opacity: 0.1;
  transition: opacity 0.5s ease;
`;

const menuTransitionStyles = {
  entering: { transform: 'translateX(-100%)' },
  entered: { transform: 'translateX(0%)' },
  exiting: { transform: 'translateX(0%)' },
  exited: { transform: 'translateX(-100%)' },
};

const backdropTransitionStyles = {
  entering: { opacity: 0, pointerEvents: 'none' },
  entered: { opacity: 0.1 },
  exiting: { opacity: 0.1 },
  exited: { opacity: 0, pointerEvents: 'none' },
};

export default function ActionBar({
  uploadProgress,
  uploadError,
  setUploadModal,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <>
        <Transition in={menuOpen} timeout={25}>
          {state => (
            <MobileMenu
              style={{
                ...menuTransitionStyles[state],
              }}
            >
              <MobileMenuHeader>
                <Logo />
                <IconButton onClick={() => setMenuOpen(false)}>
                  <X size={18} />
                </IconButton>
              </MobileMenuHeader>
              <div>
                <MobileMenuLink
                  onClick={() => setMenuOpen(false)}
                  activeClassName="active"
                  to="/"
                  exact
                >
                  <BookOpen /> Your Library
                </MobileMenuLink>
                <MobileMenuLink
                  onClick={() => setMenuOpen(false)}
                  activeClassName="active"
                  to="/upload"
                >
                  <Upload /> Upload
                </MobileMenuLink>
                <MobileMenuLink
                  onClick={() => setMenuOpen(false)}
                  activeClassName="active"
                  to="/notifications"
                >
                  <Bell /> Notifications
                </MobileMenuLink>
              </div>
              <MobileMenuFooter>
                <MobileMenuLink
                  onClick={() => setMenuOpen(false)}
                  activeClassName="active"
                  to="/help"
                >
                  <HelpCircle /> Help
                </MobileMenuLink>
                <MobileMenuLink
                  onClick={() => setMenuOpen(false)}
                  activeClassName="active"
                  to="/settings"
                >
                  <Settings /> Settings
                </MobileMenuLink>
              </MobileMenuFooter>
            </MobileMenu>
          )}
        </Transition>
        <Transition in={menuOpen} timeout={25}>
          {state => (
            <MenuBackdrop
              style={{
                ...backdropTransitionStyles[state],
              }}
              onClick={() => setMenuOpen(false)}
            />
          )}
        </Transition>
      </>
      <Layout>
        <MenuIcon onClick={() => setMenuOpen(true)}>
          <Menu size={18} />
        </MenuIcon>
        <LeftContainer>
          <Link to="/">
            <Logo icon style={{ width: 24 }} />
          </Link>
          <TextInput name="search" placeholder="Search and filter" disabled />
        </LeftContainer>
        <RightContainer>
          <NavIcon exact to="/">
            <BookOpen size={22} />
          </NavIcon>
          <UploadIcon
            uploadError={uploadError}
            uploadProgress={uploadProgress}
            onClick={() => setUploadModal(true)}
          />
          <NavIcon to="/notifications">
            <Bell />
          </NavIcon>
          <NavIcon to="/help">
            <HelpCircle size={22} />
          </NavIcon>
          <NavIcon to="/settings">
            <Settings size={22} />
          </NavIcon>
        </RightContainer>
        <MenuIcon>
          <Search size={18} />
        </MenuIcon>
      </Layout>
    </>
  );
}

ActionBar.propTypes = {
  uploadError: PropTypes.bool,
  uploadProgress: PropTypes.number,
  setUploadModal: PropTypes.func,
};
