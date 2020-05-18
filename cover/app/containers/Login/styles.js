import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #f7f8fa;
`;

export const Box = styled.div`
  max-width: 560px;
  padding: 70px 80px 50px;
  background: #ffffff;
  margin: 0 auto;
  position: relative;
  top: 50px;

  form {
    margin: 80px 0 50px;

    > h1,
    > div {
      margin: 25px 0;
    }
  }

  > p {
    margin-top: 70px;
    padding: 25px 0 0;
    font-family: ${props => props.theme.type.sans_serif};
    color: ${props => props.theme.colors.darkGrey};
    border-top: ${props => props.theme.colors.lightGrey} 1px solid;
    font-size: 12px;
  }

  .spinner {
    color: ${props => props.theme.colors.white};
    font-size: 16px;
    animation: ${spin} 2s linear infinite;
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

// does not belong in here
export const StyledError = styled.p`
  display: block;
  line-height: 22px;
  font-family: ${props => props.theme.type.sans_serif};
  color: ${props => props.theme.colors.red};
  font-size: 12px;
  line-height: 14px;
`;
