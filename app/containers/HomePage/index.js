/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import styled from 'styled-components';

import BookIndex from '../BookIndex';
import FeaturedBook from '../../components/FeaturedBook/FeaturedBook';
import Typography from '../../components/common/Type/Typography';

const Layout = styled.div`
  padding: 30px;
`;

export default function HomePage() {
  return (
    <Layout>
      <Typography type="SectionTitle">Suggestion from Your Library</Typography>
      <FeaturedBook />
      <BookIndex />
    </Layout>
  );
}
