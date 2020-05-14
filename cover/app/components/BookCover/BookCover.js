import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LoadingImg = styled.div`
  width: 100%;
  height: 100%;
  background: #d8d8d8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  color: #6a6a6a;
  font-weight: 100;
`;
const LoadingBar = styled.div`
  display: block;

  width: 60%;
  height: 10px;

  margin: 15px auto;

  border-radius: 7px;

  background: #485cc7;
`;

export default function BookCover({ loading, src }) {
  if (loading) {
    return (
      <LoadingImg>
        <span>Processing...</span>
        <LoadingBar />
      </LoadingImg>
    );
  }

  return <div />;
}

BookCover.propTypes = {
  loading: PropTypes.bool,
  src: PropTypes.string,
};

BookCover.defaultProps = {
  loading: true,
};
