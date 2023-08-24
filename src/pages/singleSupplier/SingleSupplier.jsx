import React, { useContext, useEffect, useRef, useState } from 'react';
import './singleSupplier.css';
import { useLocation } from 'react-router-dom';
import { OrderTable } from '../../miscellaneous/ordersTable/OrderTable';
import axios from 'axios';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import { baseURL } from '../../utils/functions/funtions';

export const SingleSupplier = () => {
    const {user} = useContext(AuthContext);
    const {searchItem} = useContext(SearchContext);
    const {state} = useLocation();

    const [status, setStatus] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const formRef = useRef(null)

    const [name, setName] = useState('');
    const [sup, setSup] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [desc, setDesc] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(state){
            setStatus(true);
        }
        else{
            setStatus(false)
        }
    },[state])

    useEffect(()=>{
        const fetchSuppliers = async()=>{
            const sups = await axios.get(baseURL+'/suppliers');
            setSuppliers(sups.data);
        }
        fetchSuppliers();
    },[])
    useEffect(()=>{
        const fetchOrders = async()=>{
            const ords = await axios.get(baseURL+'/orders');
            if(state){
                // console.log(ords.data.filter(order=>order.sup._id === state.id))
                setFiltered(ords.data.filter(order=>order.sup._id === state.id).sort((a, b)=>a.createdAt < b.createdAt ? 1 : -1));
            }
            else{
                setOrders(ords.data.sort((a, b)=>a.createdAt < b.createdAt ? 1 : -1));
            }
        }
        fetchOrders();
        
    },[orders, state])
    // console.log(filtered[0].sup._id === state.id)
    // console.log(orders.filter(order=>order.sup._id === state?.id).sort((a, b)=>a.createdAt < b.createdAt ? 1 : -1))
    const handleOrders = async()=>{
        setLoading(true);
        setError('');
        setSuccess('');
        if(name ==='' || desc ===''){
            setLoading(false);
            setError('Please complete the form');
            setSuccess('');            
        }
        else if(!state && sup ===''){
            setLoading(false);
            setError('Choose a supplier');
            setSuccess('');
        }
        else{
            try {
                const data = {
                    name, sup: state?.id || sup, quantity, desc
                }
                const res = await axios.post(`${baseURL}/orders/create`, data);
                setLoading(false);
                setError('');
                setSuccess(res.data);
                formRef.current.reset();
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError('Error occured ordering for products');
                setSuccess('');
            }
        }
    }
    // console.log(filtered)
  return (
    <div className='singleSupplier' >
        {
            user.isAdmin ?
            <>
            {
                status &&
                <div className="top">
                    <div className="topleft">
                        <img src={state?.img} alt="" />
                    </div>
                    <div className="topright">
                        <span className="name">{state?.name}</span>
                        <span className="cat">{state?.cat}</span>
                        <span className="others">{state?.loc}</span>
                        <span className="others">{state?.phone}</span>
                        <span className="others">{state?.email}</span>
                        <button onClick={()=>setShowNew(true)} className="order">Make an order</button>
                    </div>
                </div>
            }

            {
                showNew &&
                <div className="middle">
                    <span className="title">Order for products</span>
                    <form ref={formRef} className="inputs">
                        {
                            !status &&
                            <div className="oneinput">
                                <span className="lab">Supplier</span>
                                <select onChange={(e)=>setSup(e.target.value)} className='put' >
                                    {
                                        suppliers &&
                                        suppliers.map(item=>(
                                            suppliers.length >0 ? 
                                            <option key={item._id} value={item._id}>{item.name}</option>:
                                            <option value=''>No supplier</option>

                                            // <option key={item._id} value={item._id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                                    {/* {
                                        !suppliers.length > 0 && <option>loading sppliers...</option>
                                    } */}
                            </div>
                        }
                        <div className="oneinput">
                            <span className="lab">Product</span>
                            <input onChange={(e)=>setName(e.target.value)} className='put' type="text" placeholder='eg. Sneakers' />
                        </div>
                        <div className="oneinput">
                            <span className="lab">Units / Packets</span>
                            <input onChange={(e)=>setQuantity(e.target.value)} className='put' type="number" min={1} placeholder='eg. 15 pairs' />
                        </div>
                        <div className="oneinput">
                            <span className="lab">Message</span>
                            <textarea onChange={(e)=>setDesc(e.target.value)} className='put' min={1} placeholder='notify the supplier' />
                        </div>
                    </form>
                    {
                        (error || success) && <span className={error? 'error':'succ'} >{error? error : success}</span>
                    }
                    <div className="butts">
                        <button onClick={handleOrders} disabled={loading} className="proceed">{loading ? 'Wait...' : 'Proceed'}</button>
                        <button disabled={loading} onClick={()=>setShowNew(false)} className="close">Close</button>
                    </div>
                </div>
            }
            <div className="middle">
                <div className="wrap">
                    <span className="ord">Orders</span>
                    <button onClick={()=>setShowNew(true)} className="new">New order</button>
                </div>
                <OrderTable OrderData={searchItem(orders)} filtered = {searchItem(filtered)} />
            </div>
            </>
            :
            <span className='deny' >Access Denied!</span>
        }
    </div>
  )
}
