import React from 'react';

import styled from 'styled-components';

import Logo from 'components/common/Logo/Logo';
import Typography from 'components/common/Type/Typography';
import Input from 'components/common/Input/Input';
import Button from 'components/common/Button/Button';

const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #f7f8fa;
`;

const Box = styled.div`
  max-width: 560px;
  padding: 70px 80px;
  background: #ffffff;
  margin: 0 auto;
  position: relative;
  top: 100px;
`;

export default function Register() {
  return (
    <Layout>
      <Box>
        <Logo />
        <Typography type="SectionTitle">Sign Up</Typography>
        <form>
          <Input label="Email" />
          <Input label="Password" type="password" />
          <Button>Sign Up</Button>
        </form>
      </Box>
    </Layout>
  );
}
