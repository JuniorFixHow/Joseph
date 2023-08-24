import React, { useRef, useState } from 'react';
import './reset.css';
import {BsPencil} from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {baseURL} from '../../utils/functions/funtions'

const Reset = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);

    const changePassword = async(e)=>{
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        if(pass === '' || password===''){
            setError('Please create and confirm new password');
            setSuccess('');
            setLoading(false);
        }
        else if(pass !== '' && pass.length < 8){
            setError('Password must be at least 8 characters');
            setSuccess('');
            setLoading(false);
        }
        else if((pass !== '' && password !=='') && (pass !== password)){
            setError('Passwords mismatch');
            setSuccess('');
            setLoading(false);
        }
        else{
            try {
                const data = {email:state.email, password};
                const update = await axios.put(`${baseURL}/users/change/${state.id}`, data);
                setError('');
                setSuccess(update.data);
                setLoading(false);
                formRef.current.reset();
            } catch (error) {
                console.log(error);
                setError('Error occured during password reset');
                setSuccess('');
                setLoading(false);
            }
        }

    }
  return (
    <div className='reset' >
        <div className="top">
            <span className="header">Change Password</span>
        </div>
        <div className="down">
            <form ref={formRef} className="inputs">
                <div className="oneinput">
                    <span className="name">New password</span>
                    <input onChange={(e)=>setPass(e.target.value)} minLength={8} type="text" placeholder='Enter password' />
                </div>
                <div className="oneinput">
                    <span className="name">Comfirm passord</span>
                    <input onChange={(e)=>setPassword(e.target.value)} minLength={8} type="password" placeholder='Comfirm password' />
                </div>
            </form>
            {
                (error || success) && <span className={error? 'error':'succ'} >{error? error:success}</span>
            }
            <button onClick={changePassword} disabled={loading}  className="change">{ loading ? 'please wait...' : 'Proceed to update password'}</button>
        </div>
    </div>
  )
}

export default Reset