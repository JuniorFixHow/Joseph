import React, { useState } from 'react';
import './forgot.css';
import {MdAlternateEmail} from 'react-icons/md';
import axios from 'axios';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const sendRequest = async(e)=>{
    e.preventDefault();
    setLoading(true);
    setError('')
    setSuccess('')
    if(email !==''){
      try {
        const data = {email};
        const req = await axios.post('/reset/create', data);
        setLoading(false);
        setError('')
        setSuccess(req.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error.response.data.message);
        setSuccess('')
      }
    }
    else{
      setLoading(false);
      setError('Plese enter email associated with your account')
      setSuccess('')
    }
  }

  return (
    <div className='forgot' >
        <h1 className="title">Forgot Password</h1>
        <div className="center">
          <div className="top">
            <span className="text">Recover your password</span>
            <div className="inputbox">
              <span className="email">Email</span>
              <div className="box">
                <MdAlternateEmail className='icon' />
                <input onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email' type="email"  />
              </div>
              {
                (error || success) && <span className={error?'error':'succ'} >{error?error:success}</span>
              }
            </div>
          </div>
          <button disabled={loading} onClick={sendRequest} >{loading ? 'processing...':'Submit'}</button>
        </div>
    </div>
  )
}

export default Forgot