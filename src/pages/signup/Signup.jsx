import React from 'react';
import './signup.css';
import Back from '../../assets/images/Background.jpg'

const Signup = () => {
  return (
    <div className='signup' >
      <div className="left">
        <img src={Back} alt="bacground" />
      </div>
      <div className="right">
        <h1>Create Account</h1>
        <div className="lefttop">
          <div className="onetext">
            <span className="title">Email</span>
            <input type="email" placeholder='Enter email' />
          </div>
          <div className="onetext">
            <span className="title">Full name</span>
            <input type="text" placeholder='Enter full name' />
          </div>
          <div className="onetext">
            <span className="title">Phone no.</span>
            <input type="text" placeholder='Enter phone number' />
          </div>
          <button>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Signup