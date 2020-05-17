import React from 'react';
import styled from 'styled-components';

import Typography from 'components/common/Type/Typography';
import Button from 'components/form/Button';

const Layout = styled.section`
  display: flex;
  flex-direction: column;

  height: 100%;

  justify-content: center;
  align-items: center;

  background: ${props => props.theme.colors.offWhite};
`;

export default function IndexEmptyState() {
  return (
    <Layout>
      <Typography type="SectionTitle">Your library is empty</Typography>
      <Typography type="Paragraph">
        Start filling up your library by uploading your first file.
      </Typography>
      <Button>Upload a book</Button>
    </Layout>
  );
}
