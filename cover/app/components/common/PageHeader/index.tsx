import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Typography from 'components/common/Type/Typography';

const Layout = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 50px;

  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`;

const Actions = styled.div`
  > button {
    margin-left: 8px;
  }
`;

export default function PageHeader({ title, actions }) {
  return (
    <Layout>
      <Typography type="SectionTitle">{title}</Typography>
      <Actions>{actions}</Actions>
    </Layout>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.node,
};
