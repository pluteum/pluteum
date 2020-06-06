import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BookCover from './BookCover';

const StyledContainer = styled.div`
  width: 164px;
`;

const StyledTitle = styled.p`
  margin: 15px 0 5px;

  color: ${props => props.theme.colors.black};

  font-family: ${props => props.theme.type.text_serif};

  font-size: 22px;
  line-height: 25px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledAuthor = styled.p`
  margin: 0;

  color: ${props => props.theme.colors.darkGrey};

  font-family: ${props => props.theme.type.mono};

  font-size: 14px;
  line-height: 16px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default function BookThumbnail({ title, author, image }) {
  return (
    <StyledContainer>
      <BookCover title={title} author={author} image={image} />
      <StyledTitle title={title}>{title}</StyledTitle>
      <StyledAuthor title={author}>{author}</StyledAuthor>
    </StyledContainer>
  );
}

BookThumbnail.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
};
