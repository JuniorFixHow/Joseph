import React from 'react'
import './footer.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer>
      <div className='foot' >
        <div className="one">
          <span className="title">Products</span>
          <div className="down">
            <span onClick={()=>navigate('/inventory')} className="item">Inventories</span>
            <span onClick={()=>navigate('/suppliers')} className="item">Suppliers</span>
            <span onClick={()=>navigate('/orders')} className="item">Orders</span>
            <span onClick={()=>navigate('/trans')} className="item">Transactions</span>
          </div>
        </div>
        <div className="one">
          <span className="title">Statistics</span>
            <div className="down">
              <span onClick={()=>navigate('/')} className="item">Dashboard</span>
              <span onClick={()=>navigate('/report')} className="item">Reports</span>
              <span onClick={()=>navigate('/users')} className="item">Users</span>
            </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer