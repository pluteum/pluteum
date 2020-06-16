import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledOuterContainer = styled.div`
  width: 164px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  position: relative;

  overflow: hidden;

  &:before {
    display: block;
    content: '';
    width: 100%;
    padding-top: calc((64 / 41) * 100%);
  }
`;

const StyledInnerContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
`;

const PlaceHolderCover = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  box-sizing: border-box;

  padding: 16px;

  background: ${props => props.theme.colors.black};

  h1,
  h2 {
    margin: 0;
    color: ${props => props.theme.colors.white};
  }

  h1 {
    font-family: ${props => props.theme.type.text_serif};
    font-weight: normal;
    font-size: 22px;
    line-height: 25px;
  }

  h2 {
    font-family: ${props => props.theme.type.mono};
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
  }
`;

export default function BookCover({ image, title, author }) {
  const bookImage = !!image ? (
    <img src={image} alt={`Cover of ${title} by ${author}`} />
  ) : (
    <PlaceHolderCover>
      <h1>{title}</h1>
      <h2>{author}</h2>
    </PlaceHolderCover>
  );

  return (
    <StyledOuterContainer>
      <StyledInnerContainer>{bookImage}</StyledInnerContainer>
    </StyledOuterContainer>
  );
}

BookCover.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
};
