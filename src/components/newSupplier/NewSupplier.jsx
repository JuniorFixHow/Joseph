import { Modal } from '@mui/material'
import React, { useRef, useState } from 'react';
import './newSupplier.css';
import axios from 'axios';

const NewSupplier = ({showNew, setShowNew, photos, setPhotos}) => {

    const [name, setName] = useState('')
    const [cat, setCat] = useState('')
    const [location, setLocation] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    // const [photos, setPhotos] = useState(null);
    const photoRef = useRef(null);
    const formRef = useRef(null);

    const handleDrag =(e)=>{
        e.preventDefault();
    }
    const handleDrop =(e)=>{
        e.preventDefault();
        setPhotos(e.dataTransfer.files[0]);
    }

    const handleAddNew = async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError('')
        setSuccess('')
        if(name !=='' && cat !=='' && location !=='' && phone !==''){

            try {
                const fileData = new FormData();
                fileData.append('file', photos);
                fileData.append('upload_preset', 'Joseph');
                let url;
                if(photos){
                    const uploadFile = await axios.post('https://api.cloudinary.com/v1_1/juniorfixhow/image/upload', fileData)
                    url = uploadFile.data.url;
                }
                const data = {
                    name,
                    cat, 
                    phone,
                    email,
                    location,
                    pic:url || 'https://icon-library.com/images/supplier-icon-png/supplier-icon-png-9.jpg'
                }
               
                await axios.post('/suppliers/create', data);
                setLoading(false);
                setError('')
                setSuccess('Done!');
                formRef.current.reset();
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError('Error occured adding a supplier')
                setSuccess('')
            }
        }
        else{
            setLoading(false);
            setError('Please complete the form')
            setSuccess('')
        }
    }

  return (
    <Modal
    open={showNew}
    className='supModal'
    onClose={()=>setShowNew(false)}
    aria-labelledby='New Supplier'
    aria-describedby="Create new supplier"
    >
        <div className="newProd">
            <div className="top">
                <span className="title">New Supplier</span>
                <div className="box-new">
                    {
                        photos ?
                        <img className='proimage' src={URL.createObjectURL(photos)} alt="product" /> :
                        <div className='icon' />
                    }
                    <div onDrop={handleDrop} onDragOver={handleDrag} className="boxtop">
                        <span className="drop">Drag image here</span>
                        <span className="drop">Or</span>
                        <span onClick={()=>photoRef.current.click()} className="drag">Select image here</span>
                        <input onChange={(e)=>setPhotos(e.target.files[0])} type='file' hidden ref={photoRef} />
                    </div>
                </div>
            </div>
            <form ref={formRef} className="middle">
                <div className="oneinput">
                    <span className="text">Supplier name</span>
                    <input onChange={(e)=>setName(e.target.value)} placeholder='eg. Coca-Cola' type="text" />
                </div>
                <div className="oneinput">
                    <span className="text">Category</span>
                    <input onChange={(e)=>setCat(e.target.value)} placeholder='eg. Minerals' type="text" />
                </div>
                <div className="oneinput">
                    <span className="text">Location</span>
                    <input onChange={(e)=>setLocation(e.target.value)} placeholder='eg. Accra'  type="text" />
                </div>
                <div className="oneinput">
                    <span className="text">Contact</span>
                    <input onChange={(e)=>setPhone(e.target.value)} placeholder='eg. +2331234567' type="text" />
                </div>
                <div className="oneinput">
                    <span className="text">Email</span>
                    <input onChange={(e)=>setEmail(e.target.value)} placeholder='eg. supplier@email.com' type="email" />
                </div>
                
            </form>
            {
                (error || success) && <span className={error? 'error' : 'succ'} >{error? error : success}</span>
            }
            <div className="down">
                <button onClick={()=>setShowNew(false)} className='disc' >Discard</button>
                <button onClick={handleAddNew} disabled={loading} className='sub' >{loading ? 'Wait...' : 'Save'}</button>
            </div>
        </div>
    </Modal>
  )
}

export default NewSupplier