import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal');

export default function ModalPortal({ children }) {
  return ReactDOM.createPortal(children, modalRoot);
}

ModalPortal.propTypes = {
  children: PropTypes.node,
};
