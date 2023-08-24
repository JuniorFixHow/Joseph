import React, { useContext, useEffect, useState } from 'react';
import './newTrans.css';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import { baseURL } from '../../utils/functions/funtions';

const NewTrans = ({setShowNewTrans, currentTransData, setCurrentTransData}) => {
    const {user} = useContext(AuthContext)
    const [phone, setPhone]  = useState('');
    const [customer, setCustomer]  = useState('');
    const [address, setAddress]  = useState('');
    const [product, setProduct]  = useState('');
    const [quantity, setQuantity]  = useState(1);
    const [error, setError]  = useState('');
    const [success, setSuccess]  = useState('');
    const [loading, setLoading]  = useState(false);
    const [products, setProducts]  = useState([]);

    useEffect(()=>{
        const getProducts = async()=>{
            const data = await axios.get(baseURL+'/products');
            setProducts(data.data);
        }
        getProducts();
    },[products])

    const handleSubmitTrans = async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        if(customer !=='' && quantity !=='' && product !==''){
            try {
                const data = {phone, customer, address, product, quantity, seller: user.details._id}
                const res =  await axios.post(baseURL+'/sales/create', data);
                setLoading(false);
                setError('');
                setSuccess(res.data);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error.response.data.message);
                setSuccess('');
            }
        }
        else{
            setLoading(false);
            setError('Customer name, product name and quantity are required');
            setSuccess('');
        }

    }

    const handleUpdateTrans = async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const data = {
                phone: phone !=='' ? phone : currentTransData.phone,
                customer: customer !=='' ? customer : currentTransData.customer,
                address: address !=='' ? address : currentTransData.address,
                product: product !=='' ? product : currentTransData.product,
                quantity: quantity !=='' ? quantity : currentTransData.quantity,
            }
            const update = await axios.put(`${baseURL}/sales/update/${currentTransData._id}`, data);
            setLoading(false);
            setError('');
            setSuccess(update.data);
            setCurrentTransData(null);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error.response.data.message);
            setSuccess('');
        }
    }

    const handleClose = ()=>{
        setShowNewTrans(false);
        setCurrentTransData(null)
    }
    // console.log(user)
  return (
    <div className='newtrans' >
        <span className="title">New Transaction</span>
        <div className="container">
            <div className="first">
                <span className="name">Customer</span>
                <div className="texts">
                    <input className='inp'  onChange={(e)=>setCustomer(e.target.value)} type="text" placeholder={currentTransData ? currentTransData.customer:'Name'} />
                    <input className='inp' onChange={(e)=>setPhone(e.target.value)} type="text" placeholder={currentTransData ? currentTransData?.phone:'Phone number'} />
                    <input className='inp' onChange={(e)=>setAddress(e.target.value)} type="text" placeholder={currentTransData ? currentTransData?.address:'Address'} />
                </div>
            </div>
            <div className="first">
                <span className="name">Product</span>
                <div className="texts">
                    {/* <input className='inp' onChange={(e)=>setProduct(e.target.value)} type="text" placeholder={currentTransData ? currentTransData.product:'Product name'} /> */}
                    <select onChange={(e)=>setProduct(e.target.value)} className='inp' defaultValue={currentTransData ? currentTransData.product:null} >
                        {
                            products &&
                            products.map(item=>(
                                products.length >0 ? 
                                <option key={item._id} value={item.name}
                                 selected={currentTransData?.product === item.name }
                                >{item.name}</option>:
                                <option value=''>No product</option>
                            ))
                        }
                    </select>
                                {/* {
                                    !products.length > 0 && <span>No product</span>
                                } */}
                        
                    <input className='inp' onChange={(e)=>setQuantity(e.target.value)} min={1} type="number" placeholder={currentTransData ? currentTransData.quantity:'Quantity'} />
                    {
                        currentTransData &&
                        <input className='inp' value={currentTransData.price} min={0} type="number" placeholder='Price' />
                    }
                </div>
            </div>
            {
                (error || success) && <span className={error? 'error':'succ'} >{error? error : success}</span>
            }
            <div className="butts">
                <button disabled={loading} onClick={handleClose} className="disc">Close</button>
                {
                    currentTransData ?
                    <button disabled={loading} onClick={handleUpdateTrans} className="sub">{loading ? 'Please wait...':'Update'}</button>
                    :
                    <button disabled={loading} onClick={handleSubmitTrans} className="sub">{loading ? 'Please wait...':'Save'}</button>
                }
            </div>
        </div>
    </div>
  )
}

export default NewTrans