/*
 *  Breadcrumb
 */

import React from 'react';
import styled from 'styled-components';

import Logo from 'components/common/Logo/Logo';
import TextInput from 'components/form/input/Text';
import { Link } from 'react-router-dom';

import {
  BookOpen,
  PlusCircle,
  Bell,
  HelpCircle,
  Settings,
} from 'react-feather';
import NavIcon from '../../../components/NavIcon';

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  padding: 10px 24px;

  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
  }

  > div:first-child {
    input {
      margin: 0 25px;
    }
  }
`;

export default function ActionBar() {
  return (
    <Layout>
      <div>
        <Link to="/">
          <Logo icon style={{ width: 24 }} />
        </Link>
        {/* TODO: create custom made search input */}
        <TextInput name="search" placeholder="Search and filter" disabled />
      </div>
      <div>
        <NavIcon exact to="/">
          <BookOpen size={22} />
        </NavIcon>
        <NavIcon to="/upload">
          <PlusCircle size={22} />
        </NavIcon>
        <NavIcon to="/notifications">
          <Bell />
        </NavIcon>
        <NavIcon to="/help">
          <HelpCircle size={22} />
        </NavIcon>
        <NavIcon to="/settings">
          <Settings size={22} />
        </NavIcon>
      </div>
    </Layout>
  );
}
