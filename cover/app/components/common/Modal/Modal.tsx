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
  cursor: pointer;
`;

const ModalContainer = styled.section`
  position: fixed;
  width: 60%;
  max-width: 800px;
  min-width: 600px;
  min-height: 150px;
  max-height: 680px;

  top: 15%;
  left: 50%;

  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.1);
  transform: translateX(-50%);

  z-index: 11;

  overflow-y: auto;
`;

const ModalActions = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const ModalWrapper = styled.div`
  padding: 35px 50px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 32px;
`;

export default function Modal({ onExit, actions, children }) {
  return (
    <React.Fragment>
      <Backdrop onClick={onExit} />
      <ModalContainer>
        <ModalActions>{actions}</ModalActions>
        {children}
      </ModalContainer>
    </React.Fragment>
  );
}

Modal.propTypes = {
  onExit: PropTypes.func,
  children: PropTypes.node,
  actions: PropTypes.array,
};
