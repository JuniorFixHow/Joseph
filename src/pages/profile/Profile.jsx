import React, { useContext, useRef, useState } from 'react';
import './profile.css';
import {BsPencil} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';

const Profile = () => {
    const {user} = useContext(AuthContext);

    const [photo, setPhoto] = useState(null);
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState('');
    const formRef = useRef(null);

    const navigate = useNavigate();

    const updateProfile =async(e)=>{
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            const fileData = new FormData();
            fileData.append('file', photo);
            fileData.append('upload_preset', 'Joseph');
            let url;
            if(photo){
                const uploadFile = await axios.post('https://api.cloudinary.com/v1_1/juniorfixhow/image/upload', fileData)
                url = uploadFile.data.url;
            }
            const data = {
                fullname: fullname !==''? fullname : user.details.fullname,
                phone: phone !==''? phone : user.details.phone,
                pic:url || 'https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png'
            }

            const update = await axios.put(`/users/update/${user.details._id}`, data);
            setError('');
            setSuccess(update.data);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setError('Error occured during update');
            setSuccess('');
            setLoading(false);
        }
    }

  return (
    <div className='profile' >
        <div className="top">
            <img src= { photo ? URL.createObjectURL(photo) : user?.details.pic}  alt="me" />
            <label htmlFor="file"><BsPencil className='editIcon' /></label>
        </div>
        <input id='file' type="file" hidden onChange={(e)=>setPhoto(e.target.files[0])} />
        <div className="down">
            <form ref={formRef} className="inputs">
                <div className="oneinput">
                    <span className="name">Full name</span>
                    <input onChange={(e)=>setFullname(e.target.value)} type="text" placeholder={user.details?.fullname} />
                </div>
                {/* <div className="oneinput">
                    <span className="name">Email</span>
                    <input type="email" placeholder='Edit email' />
                </div> */}
                <div className="oneinput">
                    <span className="name">Contact</span>
                    <input onChange={(e)=>setPhone(e.target.value)} type="text" placeholder={user.details?.phone} />
                </div>
                <button onClick={updateProfile} disabled={loading} className="save">{loading? 'Please wait...' : 'Update'}</button>
            </form>
            {
                (error || success) && <span className={error ? 'error':'succ'} >{error ? error : success}</span>
            }
            <button disabled={loading} onClick={()=>navigate('/profile/reset', {state:{email: user?.details.email, id:user.details._id}})} className="change">Change Password</button>
        </div>
    </div>
  )
}

export default Profile