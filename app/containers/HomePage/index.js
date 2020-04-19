/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import styled from 'styled-components';

import Breadcrumb from 'components/layout/breadcrumbs/Breadcrumbs';
import BookIndex from '../BookIndex';

const Layout = styled.div``;

export default function HomePage() {
  return (
    <Layout>
      <Breadcrumb />
      <BookIndex />
    </Layout>
  );
}
