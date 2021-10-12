import React from "react";
import "./User.css";
import { getAuth, signOut } from "@firebase/auth";
import { NavLink } from "react-router-dom";

const User = (props) => {
  const { displayName, email, photoURL } = props.user;
  const auth = getAuth();
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        props.setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <div className="user-container row row-cols-1 row-cols-md-2 row-cols-lg-3 px-2 justify-content-center align-items-center">
        <div className="col">
          <h1 className="text-center fw-bold fs-2 mb-3">Welcome</h1>
          <div className="card user-card h-100">
            <img
              src={photoURL}
              className="card-img-top user-img"
              alt={displayName}
            />
            <div className="card-body user-body d-flex justify-content-center mt-4">
              <div className="my-box">
                <p className="card-title user-title">
                  <span className="bold-name">Name:</span> {displayName}
                </p>
                <p className="card-title user-title">
                  <span className="bold-name">Email:</span> {email}
                </p>

                <div className="d-flex justify-content-evenly mt-4">
                  <i className="fab icon fa-github"></i>
                  <i className="fab icon fa-linkedin"></i>
                  <i className="fab icon fa-facebook-square"></i>
                  <i className="fab icon fa-twitter-square"></i>
                  <i className="fab icon fa-google-plus-square"></i>
                </div>
                <div>
                  <NavLink to="/login" onClick={userSignOut} className="btn btn-outline-dark mt-3 d-block m-auto">Log Out</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
