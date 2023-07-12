import React, { useContext, useState } from 'react';
import './nav.css';
import {AiOutlineHome, AiOutlineStock} from 'react-icons/ai';
import {TbBabyCarriage} from 'react-icons/tb';
import {BsBagCheck} from 'react-icons/bs';
import {FiUsers} from 'react-icons/fi';
import {CgNotes} from 'react-icons/cg';
import {BiLogOut, BiGroup} from 'react-icons/bi';
import Icon from '../../assets/images/Icon.png';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';

const Nav = ({currentTab, setCurrentTab}) => {
  const navigate = useNavigate();
  const {dispatch, user} = useContext(AuthContext)
  console.log(user)

  const handleHome = ()=>{
    setCurrentTab('a');
    navigate('/');
  }
  const handleInvent = ()=>{
    setCurrentTab('b');
    navigate('/inventory');
  }
  const handleReport = ()=>{
    setCurrentTab('c');
    navigate('/report');
  }
  const handleTrans = ()=>{
    setCurrentTab('f');
    navigate('/trans');
  }
  const handleSuppliers = ()=>{
    setCurrentTab('d');
    navigate('/suppliers');
  }
  const handleOrders = ()=>{
    setCurrentTab('e');
    navigate('/orders');
  }
  const handleUsers = ()=>{
    setCurrentTab('h');
    navigate('/users');
  }

  return (
    <div className='nav' >
      <div className="btop">
        <img onClick={handleHome} src={Icon} alt="" />
        <div className="top">
          <div onClick={handleHome} className={currentTab === 'a' ?"onedasha":"onedash" }>
            <AiOutlineHome className='icon' />
            <span>Dashboard</span>
          </div>
          <div onClick={handleInvent} className={currentTab === 'b' ?"onedasha":"onedash" }>
            <BsBagCheck className='icon' />
            <span>Inventories</span>
          </div>
          <div onClick={handleReport} className={currentTab === 'c' ?"onedasha":"onedash" }>
            <AiOutlineStock className='icon' />
            <span>Reports</span>
          </div>
          <div onClick={handleSuppliers} className={currentTab === 'd' ?"onedasha":"onedash" }>
            <FiUsers className='icon' />
            <span>Suppliers</span>
          </div>
          
          <div onClick={handleOrders} className={currentTab === 'e' ?"onedasha":"onedash" }>
            <TbBabyCarriage className='icon' />
            <span>Orders</span>
          </div>
          <div onClick={handleTrans} className={currentTab === 'f' ?"onedasha":"onedash" }>
            <CgNotes className='icon' />
            <span>Transactions</span>
          </div>
          <div onClick={handleUsers} className={currentTab === 'h' ?"onedasha":"onedash" }>
            <BiGroup className='icon' />
            <span>Users</span>
          </div>
        </div>
      </div>
      <div onClick={()=>setCurrentTab('g')} className={currentTab === 'g' ?"lastdasha":"lastdash" }>
          <BiLogOut className='icon' />
          <span onClick={()=>dispatch({type:'LOGOUT'})} >Logout</span>
      </div>
    </div>
  )
}

export default Nav