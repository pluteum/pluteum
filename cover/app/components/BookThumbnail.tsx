import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BookCover from './BookCover';
import { Link } from 'react-router-dom';

const StyledContainer = styled.div`
  width: 164px;
  text-decoration: none;
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
  text-decoration: none;
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
  text-decoration: none;
`;

export default function BookThumbnail({ id, title, author, image }) {
  return (
    <StyledContainer as={Link} to={`/book/${id}`}>
      <BookCover title={title} author={author} image={image} />
      <StyledTitle title={title}>{title}</StyledTitle>
      <StyledAuthor title={author}>{author}</StyledAuthor>
    </StyledContainer>
  );
}

BookThumbnail.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
};
