import React, { useEffect } from "react";
import { useState } from "react";
import "../../Styles/Main.css";
import "../../Styles/Expert.css";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import Modal from "../Modal/Modal";
import { NavLink } from "react-router-dom";
import User from "../User/User";

// Start
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);


  const auth = getAuth();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // Check Log In
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setUser(user);
      } else {
        // User is signed out
      }
    });
  }, []);
  // Login Function
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        if (!user.emailVerified) {
          setMessage("Email not verified. Please verify your email first");
          openModal();
        }
        else {
          setUser(user);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/weak-password")
          setMessage("Password should be at least 6 characters");
        else if (errorCode === "auth/user-not-found")
          setMessage("User not found for this email. Please register");
        else if (errorCode === "auth/wrong-password")
          setMessage("Wrong Password");
        else setMessage("Invalid email or password");
        openModal();
      });
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    login();
  };

  // Handle Email
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handle Password
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Handle Google Sign In
  const googleSignInHandle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        user.emailVerified = true;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle Github Sign In
  const githubSignInHandle = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        user.emailVerified = true;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle Facebook Sign In
  const facebookSignInHandle = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        user.emailVerified = true;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Open Modal
  const openModal = () => {
    document.getElementById("modal-btn").click();
    setTimeout(() => {
      document.getElementById("modal-close").click();
    }, 2000);
  };

  // End

  return (
    <>
      {user ? (
        <User user={user} setUser={setUser}>
          {" "}
        </User>
      ) : (
        <div className="limiter">
          <Modal message={message}></Modal>
          <div className="container-login100">
            <div className="wrap-login100">
              <form
                className="login100-form validate-form"
                onSubmit={handleLogin}
              >
                <span className="login100-form-title">Login</span>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Email is required"
                >
                  <span className="label-input100">Email</span>
                  <input
                    required
                    onChange={handleEmail}
                    className="input100"
                    type="email"
                    name="username"
                    placeholder="Type your email  "
                  />
                  <span
                    className="focus-input100 fa"
                    data-symbol="&#xf2c2;"
                  ></span>
                </div>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <span className="label-input100">Password</span>
                  <input
                    required
                    onChange={handlePassword}
                    className="input100"
                    type="password"
                    name="pass"
                    placeholder="Type your password"
                  />
                  <span
                    className="focus-input100 fa"
                    data-symbol="&#xf023;"
                  ></span>
                </div>

                <div className="text-end">
                  <NavLink to="/reset-password" className="txt1">
                    Forgot password?
                  </NavLink>
                </div>

                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    <input
                      type="submit"
                      value="Log In"
                      className="login100-form-btn"
                    />
                  </div>
                </div>
              </form>
              <div className="txt1 text-center">
                <span>Or, Log In Using</span>
              </div>

              <div className="d-flex justify-content-center">
                <div className="d-flex">
                  <button
                    onClick={facebookSignInHandle}
                    className="login100-social-item bg1"
                  >
                    <i className="fa fa-facebook"></i>
                  </button>

                  <button
                    onClick={githubSignInHandle}
                    className="login100-social-item bg2"
                  >
                    <i className="fab fa-github"></i>
                  </button>

                  <button
                    onClick={googleSignInHandle}
                    className="login100-social-item bg3"
                  >
                    <i className="fa fa-google"></i>
                  </button>
                </div>
              </div>

              <div className="text-center pt-5">
                <span className="txt1 p-b-17">Don't have an account? </span>
                <NavLink to="/sign-up" className="txt2">
                  Sign Up
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
