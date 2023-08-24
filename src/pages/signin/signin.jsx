import React, { useContext, useState } from 'react';
import './signin.css';
import Back from '../../assets/images/Background.jpg';
import Icon from '../../assets/images/Icon.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { baseURL } from '../../utils/functions/funtions';

const Signin = () => {
  const {dispatch, loading, error} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  const handleLogin = async(e)=>{
    e.preventDefault();
    dispatch({type:'LOGIN_START'});
    if(email !=='' && password !== ''){
      const data ={email, password};
      try {
        const res = await axios.post(baseURL+'/auths/login', data, {
          headers: {"Content-Type":"application/json"},
          withCredentials:true,
        });
        // console.log(res)
        dispatch({type:'LOGIN_SUCCESS', payload: res.data});
        navigate('/')
        // if(res.status !== 200){
        //   dispatch({type:'LOGIN_FAILED', payload: {message: 'Access denied'}})
        // }
        // else{
        //   dispatch({type:'LOGIN_SUCCESS', payload: res.data});
        //   navigate('/')
        // }
      } catch (error) {
        dispatch({type:'LOGIN_FAILED', payload: error.response.data.message})
        console.log(error)
      }
    }
    else{
      dispatch({type:'LOGIN_FAILED', payload: 'Complete the form'})
    }
  }

  return (
    <div className='signin' >
      {/* <div className="left">
        <img src={Back} alt="bacground" />
      </div> */}
      <div className="right">
        <div className="righttop">
          <img src={Icon} alt="" />
          <h2>Login to your account</h2>
          <h5>Welcome back! Please enter your details</h5>
        </div>
        <div className="lefttop">
          <div className="onetext">
            <span className="title">Email</span>
            <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter email' />
          </div>
          <div className="onetext">
            <span className="title">Password</span>
            <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter password' />
          </div>
          <div className="onebox">
            <div className="checkleft">
              <input type='checkbox' className='check' />
              <small className='smallone' >Remember me</small>
            </div>
            <small className='smalltwo' onClick={()=>navigate('/forgot')} >Forgot Password</small>
          </div>
          {error && <span className="error">{error}</span>}
          
          <button onClick={handleLogin} >{ loading ? 'Please wait ...' : 'Sign in'}</button>
        </div>
      </div>
    </div>
  )
}

export default Signin