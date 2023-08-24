import { Box, Modal } from '@mui/material'
import React, { useRef, useState } from 'react';
import {LuBoxSelect} from 'react-icons/lu';
import './newProduct.css';
import axios from 'axios';
import { baseURL } from '../../utils/functions/funtions';

const NewProduct = ({showNew, setShowNew, photos, setPhotos}) => {
    // const [photos, setPhotos] = useState(null);
    const photoRef = useRef(null);
    const [name, setName] =useState('');
    const [cat, setCat] =useState('');
    const [price, setPrice] =useState(0);
    const [quantity, setQuantity] =useState(1);
    const [minQuant, setMinQuant] =useState(0);
    const [cost, setCost] =useState(0);
    const [desc, setDesc] =useState('');
    const [error, setError] =useState('');
    const [success, setSuccess] =useState('');
    const [loading, setLoading] =useState(false);

    const handleDrag =(e)=>{
        e.preventDefault();
    }
    const handleDrop =(e)=>{
        e.preventDefault();
        setPhotos(e.dataTransfer.files[0]);
    }

    const formRef = useRef(null);

    const addNewProduct = async(e)=>{
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if(name !== '' && cat !=='' && price !==0 && desc !=='' && cost !==''){
           
            try {

                const data = new FormData();
                data.append('file', photos);
                data.append('upload_preset', 'Joseph');
                let url;
                if(photos){
                    const uploadFile = await axios.post('https://api.cloudinary.com/v1_1/juniorfixhow/image/upload', data)
                    url = uploadFile.data.url;
                }
                const prodData = {
                    name,
                    cat,
                    minQuant,
                    price,
                    quantity,
                    desc,
                    cost,
                    pic:url || 'https://cdn3d.iconscout.com/3d/premium/thumb/product-5806313-4863042.png'
                }
                const product = await axios.post(`${baseURL}/products/create`, prodData);
                console.log(product.data);
                setLoading(false);
                setError('');
                setSuccess(product.data);
                formRef.current.reset();
            } catch (error) {
                console.log(error);
                setError('Error Occured adding new product !');
                setSuccess('');
                setLoading(false);
            }
        }
        else{
            setLoading(false);
            setError('Complete the form!');
            setSuccess('');
        }
    }

  return (
    <Modal
    open={showNew}
    className='prodModal'
    onClose={()=>setShowNew(false)}
    aria-labelledby='New Product'
    aria-describedby="Create new product"
    >
        <div className="newProd">
            <div className="top">
                <span className="title">New Product</span>
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
                    <span className="text">Product name</span>
                    <input  onChange={(e)=>setName(e.target.value)} placeholder='Enter product name' type="text" />
                </div>
                <div className="oneinput">
                    <span className="text">Category</span>
                    <input onChange={(e)=>setCat(e.target.value)} placeholder='Enter product category' type="text" />
                </div>
                <div className="oneinput">
                    <span className="text">Quantity</span>
                    <input onChange={(e)=>setQuantity(e.target.value)} placeholder='Enter product unit' min={1} type="number" />
                </div>
                <div className="oneinput">
                    <span className="text">Unit Cost</span>
                    <input onChange={(e)=>setCost(e.target.value)} placeholder='Enter unit cost' min={0} type="number" />
                </div>
                <div className="oneinput">
                    <span className="text">Unit Price</span>
                    <input onChange={(e)=>setPrice(e.target.value)} placeholder='Enter unit price' min={0} type="number" />
                </div>
                <div className="oneinput">
                    <span className="text">Treshold</span>
                    <input onChange={(e)=>setMinQuant(e.target.value)} placeholder="Enter treshold value" min={0} type="number" />
                </div>
                <div className="oneinput">
                    <span className="text">Description</span>
                    <textarea  onChange={(e)=>setDesc(e.target.value)} className='txt' placeholder="Enter product's decription"  ></textarea>
                </div>
            </form>
             {(error|| success ) && <span className={error ? 'error': 'succ'}>{error ? error : success}</span>}
            <div className="down">
                <button onClick={()=>setShowNew(false)} className='disc' >Discard</button>
                <button onClick={addNewProduct} className='sub' >{loading ? 'loading...':'Save'}</button>
            </div>
        </div>
    </Modal>
  )
}

export default NewProduct