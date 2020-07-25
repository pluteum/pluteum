import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UploadZone from 'components/common/UploadZone';
import Button from './Button';

const StyledButton = styled(Button)`
  position: absolute;
  transition: transform 0.5s ease;
  transform: translateX(-50%);
  left: 50%;
  bottom: -50px;

  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.red};
  border-color: ${props => props.theme.colors.red};

  &:hover {
    background-color: ${props => props.theme.colors.red};
  }
`;

const StyledUploadZone: any = styled(UploadZone)`
  position: absolute;
  border: 0;

  button {
    position: absolute;
    left: 50%;
    bottom: -50px;
    transition: transform 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    transform: translateX(-50%);
  }

  &:hover button {
    transform: translate(-50%, -75px);
  }
`;

const StyledOuterContainer = styled.div`
  border-radius: 8px;
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

  &:hover ${StyledButton} {
    transform: translate(-50%, -65px);
  }
`;

export default function BookCoverInput({ onSubmit, image }) {
  const [localImage, setLocalImage] = useState(image);

  useEffect(() => {
    setLocalImage(image);
  }, [image]);

  if (!localImage) {
    return (
      <StyledOuterContainer>
        <StyledInnerContainer>
          <UploadZone
            header="Drag an image here"
            subHeader="You can upload .png or .jpg files"
            vertical
          />
        </StyledInnerContainer>
      </StyledOuterContainer>
    );
  }

  return (
    <StyledOuterContainer>
      <StyledInnerContainer>
        <StyledUploadZone btnLabel="Replace Image" vertical />
        <img src={localImage} />
      </StyledInnerContainer>
    </StyledOuterContainer>
  );
}

BookCoverInput.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
};
