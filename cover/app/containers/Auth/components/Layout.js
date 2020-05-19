import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #f7f8fa;
`;

const Box = styled.div`
  max-width: 560px;
  padding: 70px 80px 50px;
  background: #ffffff;
  margin: 0 auto;
  position: relative;
  top: 50px;

  form {
    margin: 80px 0 30px;

    > h1,
    > div {
      margin: 25px 0;
    }
  }

  > p {
    margin-top: 50px;
    padding: 25px 0 0;
    font-family: ${props => props.theme.type.sans_serif};
    color: ${props => props.theme.colors.darkGrey};
    border-top: ${props => props.theme.colors.lightGrey} 1px solid;
    font-size: 12px;
  }

  @media (max-width: 425px) {
    height: 100%;
    top: 0;
    padding: 40px;

    form {
      margin: 40px 0;
    }
  }
`;

export default function AuthLayout({ children }) {
  return (
    <Layout>
      <Box>{children}</Box>
    </Layout>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node,
};
