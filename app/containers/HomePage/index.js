/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import styled from 'styled-components';

import BookIndex from '../BookIndex';

const Layout = styled.div`
  padding: 30px;
`;

export default function HomePage() {
  return (
    <Layout>
      <BookIndex />
    </Layout>
  );
}
