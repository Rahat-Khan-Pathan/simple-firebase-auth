import React, { useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";
import Modal from "../Modal/Modal";
import {
  ref,
  uploadBytes,
  getStorage,
  getDownloadURL,
} from "@firebase/storage";
import initializeAuthentication from "../../Firebase/firebase.initialize";
import { NavLink } from "react-router-dom";
import User from "../User/User";

initializeAuthentication();

// Start
const Registration = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const auth = getAuth();

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

  // Sign Up Function
  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        sendEmail();
        const user = result.user;
        uploadPhoto(user.uid);
        setMessage("Registration Successful. Email sent for verification");
        openModal();
        clear();
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/weak-password")
          setMessage("Password should be at least 6 characters");
        else if (errorCode === "auth/email-already-in-use")
          setMessage("This email is already registered. Please Log In");
        else if(errorCode === 'auth/network-request-failed')
          setMessage("Network error! Please try again later")
        else if(errorCode === 'auth/invalid-email') setMessage("Invalid Email");
        else setMessage('Something went wrong. Please try again later');
        openModal();
      });
  };

  // Clear Input Fields 
  const clear = ()=> {
    document.getElementById('input-name').value="";
    document.getElementById('input-email').value="";
    document.getElementById('input-pass').value="";
    document.getElementById('input-photo').value="";
  }
  // Send Email
  const sendEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
    });
  };

  // Update Name
  const updateName = (url) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: url,
    })
      .then(() => {
        // Profile updated!
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

  // Handle Registration
  const handleRegistration = (e) => {
    e.preventDefault();
    signUp();
    setMessage("");
  };

  // Handle Email
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handle Password
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Handle Name
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Handle Photo
  const handlePhoto = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Upload Photo
  const uploadPhoto = (id) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${id}/${image.name}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(ref(storage, `images/${id}/${image.name}`))
        .then((url) => {
          updateName(url);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  // End

  return (
    <>
      {
        (user)? <User user={user} setUser={setUser}></User> :
        <div className="limiter">
          <Modal message={message}></Modal>
          <div className="container-login100">
            <div className="wrap-login100">
              <form
                className="login100-form validate-form"
                onSubmit={handleRegistration}
              >
                <span className="login100-form-title">Sign Up</span>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Name is reauired"
                >
                  <span className="label-input100">Name</span>
                  <input
                    required
                    onChange={handleName}
                    className="input100"
                    type="text"
                    placeholder="Type your name"
                    id="input-name"
                  />
                  <span
                    className="focus-input100 fa"
                    data-symbol="&#xf2c2;"
                  ></span>
                </div>

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
                    placeholder="Type your email"
                    id="input-email"
                  />
                  <span
                    className="focus-input100 fa"
                    data-symbol="&#xf1d8;"
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
                    id="input-pass"
                  />
                  <span
                    className="focus-input100 fa"
                    data-symbol="&#xf023;"
                  ></span>
                </div>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Photo is required"
                >
                  <span className="label-input100">Choose Photo</span>
                  <input
                    required
                    onChange={handlePhoto}
                    className="pb-2 pt-3 ps-5"
                    type="file"
                    name="file"
                    placeholder="Choose your profile picture"
                    id="input-photo"
                  />
                  <span
                    className="focus-input100 fa"
                    data-symbol="&#xf1c5;"
                  ></span>
                </div>

                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    <input
                      type="submit"
                      value="Sign Up"
                      className="login100-form-btn"
                    />
                  </div>
                </div>
              </form>

              <div className="text-center pt-5">
                <span className="txt1 p-b-17">Already have an account? </span>
                <NavLink to="/login" className="txt2">
                  Log In
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Registration;
