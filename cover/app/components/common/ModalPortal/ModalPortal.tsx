import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

let modalRoot = document.getElementById('modal');

if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal');
  document.body.appendChild(modalRoot);
}

export default function ModalPortal({ children }) {
  return ReactDOM.createPortal(children, modalRoot);
}

ModalPortal.propTypes = {
  children: PropTypes.node,
};
