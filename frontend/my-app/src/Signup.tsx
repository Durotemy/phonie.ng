import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import axios from 'axios';


import './Signup.css';

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  function refreshPage() {
    window.location.reload();
  }
  const [profile, setProfile] = useState({
    email: '',
    fullname: '',
    mobile: '',
    password: '',
  });

  const handleProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignin = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let response: any = await axios.post(
        'http://localhost:3001/auth/register',
        {
          email: profile.email,
          fullname: profile.fullname,
          mobile: profile.mobile,
          password: profile.password,
        }
      );

      console.log(response.data);
      setSuccessMessage(response.data.msg);

      setErrorMessage('');
    } catch (e: any) {
      let error = e.response.data;

      setErrorMessage(e.response.data);
      setSuccessMessage('');
      console.log(error);
    }
  };

  //password toggle function
  const [state, setState] = useState(true);

  const toggleBtn = () => {
    setState((prevState) => !prevState);
  };
  console.log(errorMessage);

  return (
    <>
      <div className="container2">
        <div className="heading">
          <h2>Sign Up</h2>
        </div>
        <div className="form">
          <form onSubmit={onSubmit}>
            {/* name */}
            <div className="form-group">
              <div id="name-label">
                <label className="label">Full Name</label>
              </div>
              <input
                type="text"
                className="form-control"
                id="name"
                name="fullname"
                value={profile.fullname}
                placeholder="Full Name"
                onChange={handleProfile}
              />
              
            </div>

            {/* email */}
            <div className="form-group">
              <div id="email-label">
                <label className="label">Email Address</label>
              </div>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={profile.email}
                placeholder="Email Address"
                onChange={handleProfile}
              />
              
            </div>

            {/* phone */}
            <div className="form-group">
              <div id="phone-label">
                <label className="label">Mobile Number</label>
              </div>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="mobile"
                value={profile.mobile}
                placeholder="Mobile"
                onChange={handleProfile}
              />
              
            </div>

            {/* password */}
            <div className="form-group">
              <div id="password-label">
                <label className="label">Password</label>
              </div>
              <div id="password-toggle">
                <input
                  type={state ? 'password' : 'text'}
                  className="form-control password-control"
                  id="password"
                  name="password"
                  value={profile.password}
                  placeholder="Password"
                  onChange={handleProfile}
                />
                
              </div>
              
            </div>

            {/* submit */}
            <div className="form-group">
              <button type="submit" className="btn-signup">
                Sign Up
              </button>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn-signin"
                onClick={handleSignin}
              >
                Sign In
              </button>

              
              <p className="policy">
                By signing up, you agree to our{' '}
                <a href="http://">Terms & Conditions</a> and our{' '}
                <a href="http://">Privacy Policy</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
