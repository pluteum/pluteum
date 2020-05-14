import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Typography from './Type/Typography';

const Wrapper = styled.div`
  cursor: pointer;
  position: relative;
  width: 180px;
  height: 275px;

  > button {
    ${props => props.dropdownOpen && 'display: block;'}
  }

  &:hover > button {
    display: block;
  }
`;

const DownloadButton = styled.button`
  cursor: pointer;
  display: none;
  position: absolute;
  width: 170px;
  left: 5px;
  bottom: 5px;
  height: 46px;
  background: #485cc7;
  border-radius: 4px;
  border: 0;
  padding: 0;
  text-align: ${props => (props.multipleFormats ? 'left' : 'center')};
  padding-left: ${props => (props.multipleFormats ? '16px' : '0')};

  span {
    width: 100%;
    color: #ffffff;
  }

  span > button {
  }
`;

const DropdownArrowButton = styled.button`
  width: 36px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background: #6374CF;
  color: #ffffff;
  -webkit-appearance; none;
  border: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const DropdownContent = styled.ul`
  position: absolute;
  width: 170px;
  left: 0;
  top: calc(100% + 10px);
  z-index: 10;
  background-color: #6374cf;
  margin: 0;
  padding: 0;
  border-radius: 4px;

  > li {
    cursor: pointer;
    padding: 14px 16px;
    list-style: none;
    color: #c8cef1;
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 100;
    font-size: 13px;

    &:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    &:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    &:hover {
      color: #ffffff;
      background-color: #485cc7;
    }
  }
`;

const BookImage = styled.img`
  width: 180px;
  height: 275px;
  object-fit: cover;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
`;

export default function BookThumbnail({ title, image, formats = [] }) {
  const [dropdownOpen, setDropdown] = useState(false);

  const handleBlur = e => {
    const { currentTarget } = e;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setDropdown(false);
      }
    }, 0);
  };

  return (
    <Wrapper dropdownOpen={dropdownOpen}>
      <BookImage src={image} />
      <DownloadButton
        onBlur={handleBlur}
        type="button"
        alt={`The Cover of ${title}`}
        multipleFormats={formats.length}
      >
        <Typography type="TextLink" as="span">
          Download
          {formats.length ? (
            <DropdownArrowButton
              type="button"
              onClick={() => setDropdown(!dropdownOpen)}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </DropdownArrowButton>
          ) : (
            undefined
          )}
        </Typography>
        {dropdownOpen && (
          <DropdownContent>
            {formats.map(format => (
              <li key={format}>{format}</li>
            ))}
          </DropdownContent>
        )}
      </DownloadButton>
    </Wrapper>
  );
}

BookThumbnail.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  formats: PropTypes.array,
};
