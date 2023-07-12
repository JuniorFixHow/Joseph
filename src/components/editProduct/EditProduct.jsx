import { Modal } from '@mui/material'
import React, { useRef, useState } from 'react';
import './editProduct.css';
import axios from 'axios';

const EditProduct = ({showEdit, setShowEdit, currentProduct}) => {
    const [name, setName] = useState('');
    const [cat, setCat] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [minQuant, setMinQuant] = useState('');
    const [desc, setDesc] = useState('');
    const [cost, setCost] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [photos, setPhotos] = useState(null);
    const photoRef = useRef(null);
    const formRef = useRef(null);


    const handleDrag =(e)=>{
        e.preventDefault();
    }
    const handleDrop =(e)=>{
        e.preventDefault();
        setPhotos(e.dataTransfer.files[0]);
    }

const handleUpdateProduct = async(e)=>{
    e.preventDefault();
    setSuccess('')
    setError('')
    setLoading(true)
    
    // console.log('data is here ', data)
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
            name: name!=='' ? name : currentProduct.name,
            price: price!=='' ? price : currentProduct.price,
            cost: cost!=='' ? cost : currentProduct.cost,
            cat: cat!=='' ? cat : currentProduct.cat,
            minQuant: minQuant!=='' ? minQuant : currentProduct.minQuant,
            desc: desc!=='' ? desc : currentProduct.desc,
            quantity: quantity!=='' ? quantity : currentProduct.quantity,
            pic: url ? url : currentProduct.pic,
        }
        await axios.put(`/products/update/${currentProduct._id}`, data);
        setLoading(false)
        setSuccess('Done updating')
        setError('')
        formRef.current.reset();
    } catch (error) {
        console.log(error);
        setLoading(false)
        setSuccess('')
        setError('Error occured updating product')
    }
}
const closeForm = ()=>{
    setShowEdit(false);
    setPhotos(null);
}

// console.log(currentProduct.pic);
  return (
    <Modal
    open={showEdit}
    className='prodModal'
    onClose={()=>setShowEdit(false)}
    aria-labelledby='New Product'
    aria-describedby="Create new product"
    >
        <div className="newProd">
            <div className="top">
                <span className="title">Edit Product</span>
                <div className="box-new">
                    {
                        (photos || currentProduct.pic) ?
                        <img className='proimage' src={photos ? URL.createObjectURL(photos) : currentProduct.pic } alt="product" /> :
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
                    <span className="text">Product name</span>
                    <input onChange={(e)=>setName(e.target.value)} placeholder={currentProduct.name} type="text" />
                </div>
                <div className="oneinput">
                    <span className="text">Category</span>
                    <input onChange={(e)=>setCat(e.target.value)} placeholder={currentProduct.cat} type="text" />
                </div>
                <div className="oneinput">
                    <span className="text">Quantity</span>
                    <input onChange={(e)=>setQuantity(e.target.value)} placeholder={currentProduct.quantity} min={1} type="number" />
                </div>
                <div className="oneinput">
                    <span className="text">Unit Cost</span>
                    <input onChange={(e)=>setCost(e.target.value)} placeholder={currentProduct.cost} min={0} type="number" />
                </div>
                <div className="oneinput">
                    <span className="text">Unit Price</span>
                    <input onChange={(e)=>setPrice(e.target.value)} placeholder={currentProduct.price} min={0} type="number" />
                </div>
                <div className="oneinput">
                    <span className="text">Treshold</span>
                    <input onChange={(e)=>setMinQuant(e.target.value)} placeholder={currentProduct.minQuant} min={1} type="number" />
                </div>
                <div className="oneinput">
                    <span className="text">Description</span>
                    <textarea onChange={(e)=>setDesc(e.target.value)} placeholder={currentProduct.desc} min={1} type="number" />
                </div>
            </form>
            {
                (error || success) && <span className={error? 'error' : 'succ'} >{error? error : success}</span>
            }
            <div className="down">
                <button onClick={closeForm} className='disc' >Discard</button>
                <button disabled={loading} onClick={handleUpdateProduct} className='sub' >{loading ?'Wait...' : 'Save'}</button>
            </div>
        </div>
    </Modal>
  )
}

export default EditProduct