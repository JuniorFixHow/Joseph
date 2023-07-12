import { Box, Modal } from '@mui/material'
import React, { useRef, useState } from 'react';
import {LuBoxSelect} from 'react-icons/lu';
import './newUser.css';
import axios from 'axios';

const NewUser = ({showNew, setShowNew}) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const formRef = useRef(null);

    const createUser = async(e)=>{
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        if(fullname !=='' && email!=='' && phone!==''){
            try {
                const data = {fullname, email, phone, isAdmin}
                const user = await axios.post('/auths/create', data);
                setError('');
                setSuccess(user.data);
                setLoading(false);
                formRef.current.reset();
            } catch (error) {
                setLoading(false);
                setError(error.response.data.message);
                setSuccess('');
            }
        }
        else{
            setError('Please complete the form');
            setSuccess('');
            setLoading(false);
        }
    }
  return (
    <Modal
    open={showNew}
    className='userModal'
    onClose={()=>setShowNew(false)}
    aria-labelledby='New Product'
    aria-describedby="Create new product"
    >
        <div className="newProd">
            <div className="top">
                <span className="title">Create user</span>
                
            </div>
            <form ref={formRef} className="middle">
                <div className="oneinput">
                    <span className="text">Full name</span>
                    <input onChange={(e)=>setFullname(e.target.value)} placeholder='Enter full name' type="text" />
                </div>
                <div className="oneinput">
                    <span className="text">Email</span>
                    <input onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email' type="email" />
                </div>
                <div className="oneinput">
                    <span className="text">Contact</span>
                    <input onChange={(e)=>setPhone(e.target.value)} placeholder='Enter phone number' type="text" />
                </div>
                <div className="oneinp">
                    <span className="text">Admin</span>
                    <input className='check' checked={isAdmin} onChange={(e)=>setIsAdmin(prev => !prev)} type='checkbox' />
                </div>
                
            </form>
            {
                (error || success) && <span className={error ? 'error':'succ'} >{error? error : success}</span>
            }
            <div className="down">
                <button disabled={loading} onClick={()=>setShowNew(false)} className='disc' >Discard</button>
                <button disabled={loading} onClick={createUser} className='sub' >{loading ? 'processing...':'Submit'}</button>
            </div>
        </div>
    </Modal>
  )
}

export default NewUser