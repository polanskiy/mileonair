import React from 'react';
import ReactDOM from 'react-dom';
import './modal.css';
import close from '../../images/close.svg';

const Modal = ({ isOpen, children, onClose }) => (
  <>
    {
      isOpen
      && ReactDOM.createPortal(
        <div className="modal" onClick={onClose}>
          <div className="modal__body" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <button className="modal__close" onClick={onClose}>
                <img src={close} />
              </button>
            </div>
            <div className="modal__content">
              {children}
            </div>
          </div>
        </div>,
        document.querySelector('#modal'),
      )
   }
  </>
);

export default Modal;
