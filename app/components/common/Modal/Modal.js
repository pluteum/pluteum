import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.8;
  z-index: 10;
`;

const ModalContainer = styled.section`
  position: fixed;
  width: 1000px;
  height: 680px;

  top: 15%;
  left: 50%;

  background: #ffffff;
  box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  transform: translateX(-50%);

  z-index: 11;
`;

export default function Modal({ onExit, children }) {
  return (
    <React.Fragment>
      <Backdrop onClick={onExit} />
      <ModalContainer>{children}</ModalContainer>
    </React.Fragment>
  );
}

Modal.propTypes = {
  onExit: PropTypes.func,
  children: PropTypes.node,
};
