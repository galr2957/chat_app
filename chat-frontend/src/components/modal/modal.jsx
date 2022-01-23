import React from "react";

import './modal.scss';



const Modal = ({ children , click}) => {

    const findByKey = (componentName) => {
        return children.filter(child => child.key === componentName);
        }

        const closeModal = (e) => {
            e.stopPropagation()
            if (e.target.classList.contains('modal-close')) {
                return click()
            }
        }

    return (
        <div className="modal-mask modal-close" onClick={closeModal}> 
            <div className="modal-wrapper">
                <div className="modal-container">

                    <div className="modal-header">
                        {findByKey('header')}
                    </div>

                    <div className="modal-body">
                         {findByKey('body')}
                    </div>

                    <div className="modal-footer">
                    <button id="button" className="modal-close" onClick={closeModal}> CLOSE </button>
                          {findByKey('footer')}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal