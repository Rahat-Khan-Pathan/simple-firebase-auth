import React from "react";
import '../../Styles/Modal.css';

const Modal = (props) => {
  return (
    <div>
      <button
        hidden
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        id="modal-btn"
      >
      </button>
      <div
        style={{opacity:10}}
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content my-back">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {props.message}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                hidden
              ></button>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="modal-close"
                hidden
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
