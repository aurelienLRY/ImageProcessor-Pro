import React, { useEffect, useState } from "react";
import "./style.scss";
import PropTypes from "prop-types";
/*
components modal qui prend en paramètre un titre et un contenu
 le titre est un string
 le contenu est un children (donc n'importe quel type de contenu)
elle se déclenche avec isOpen qui est un boolean
*/

function Modal({ isOpen, setIsOpen,title, children  }) {

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className=" modal-header">
              <h2>{title}</h2>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-btnClosed">
              <button onClick={() => setIsOpen(false)} className="btn ">Fermer</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

Modal.defaultProps = {
  isOpened: false,
  title: "",
  children: null,
};

export default Modal;
