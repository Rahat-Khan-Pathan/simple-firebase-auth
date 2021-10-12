import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Modal from "../Modal/Modal";
import { NavLink } from "react-router-dom";

const ResetPassword = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const auth = getAuth();

  const handleResetPass = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("Password reset email sent");
        openModal();
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setMessage("No user found for this email. Please Sign Up first");
          openModal();
        } else {
          setMessage("Something went wrong. Please try again later");
          openModal();
        }
      });
  };
  const openModal = () => {
    document.getElementById("modal-btn").click();
    setTimeout(() => {
      document.getElementById("modal-close").click();
    }, 2000);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="limiter">
      <Modal message={message}></Modal>
      <div className="container-login100">
        <div className="wrap-login100">
          <form
            className="login100-form validate-form"
            onSubmit={handleResetPass}
          >
            <span className="login100-form-title">Reset Password</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Username is reauired"
            >
              <span className="label-input100">Email</span>
              <input
                required
                onBlur={handleEmail}
                className="input100"
                type="email"
                placeholder="Type your email"
              />
              <span className="focus-input100 fa" data-symbol="&#xf1d8;"></span>
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <input
                  type="submit"
                  value="Reset"
                  className="login100-form-btn"
                />
              </div>
            </div>
          </form>
          <div className="text-center pt-5">
            <span className="txt1 p-b-17">Or, </span>
            <NavLink to="/login" className="txt2">
              Log In
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
