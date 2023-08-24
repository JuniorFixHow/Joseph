import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import { BarGraph } from '../../components/chart/Chart';
import { DashProduct, DashTresh } from '../../miscellaneous/productTable/ProductData';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { baseURL } from '../../utils/functions/funtions';

const Home = () => {
  const {user} = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
    const getProducts = async()=>{
      const prods = await axios.get(baseURL+'/products');
      setProducts(prods.data);
    }
    const getSales = async()=>{
      const prods = await axios.get(baseURL+'/sales');
      setSales(prods.data);
    }
    getProducts();
    getSales();
  },[sales, products])




  return (
    <div className='home' >
      {
        user.isAdmin &&
        <div className="top">
          <div className="left">
            <span className="ptitle">Products</span>
            <span className="pquant">{products && products.map(item=>item.quantity).reduce((a, b)=>a + b, 0)}</span>
          </div>
          <div className="right">
            <span className="ptitle">Sales</span>
            <span className="pquant">{sales && sales.map(item=>item.quantity).reduce((a, b)=>a + b, 0)}</span>
          </div>
          <div className="res">
            <span className="ptitle">Stock</span>
            <span className="pquant">{(products && sales) && (products.map(item=>item.quantity).reduce((a, b)=>a + b, 0) - sales.map(item=>item.quantity).reduce((a, b)=>a + b, 0))}</span>
          </div>
        </div>
      }
      {
        user.isAdmin &&
        <div className="middle">
          <span className="quant">Sales and Purchases</span>
          <BarGraph />
        </div>
      }
      <div className="down">
        <div className="tleft">
          <div className="prod">
            <span className="quants">Products</span>
            <span onClick={()=>navigate('inventory')} className="prodlink">See All</span>
          </div>
          <DashProduct />
        </div>
        <div className="tright">
          <div className="prod">
            <span className="quants">Low Quantity Stock</span>
            <span onClick={()=>navigate('inventory')} className="prodlink">See All</span>
          </div>
          <DashTresh />
        </div>
      </div>
    </div>
  )
}

export default Home