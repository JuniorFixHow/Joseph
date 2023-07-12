import React, { useContext, useState } from 'react';
import './header.css';
import {AiOutlineSearch} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { SearchContext } from '../../context/SearchContext';

const Header = () => {
  const [hideUser, setHideUser] = useState(false);
  const {dispatch, user} = useContext(AuthContext)
  const {setSearchQuery} = useContext(SearchContext)
  const navigate = useNavigate();

  return (
    <header className='header' >
      <div className="left">
        <div className="inner">
          <AiOutlineSearch className='searchicon' />
          <input onChange={(e)=>setSearchQuery(e.target.value)} placeholder='search product, supplier, order ' type="search"  />
        </div>
      </div>
      <div className="right">
        <img onClick={()=>setHideUser(e=>!e)} src={user?.details.pic} alt="user" />
        {
          hideUser &&
          <div className="menu">
            <span onClick={()=>navigate('/profile')} >{user?.details.fullname?.split(' ')[0]}</span>
            <span onClick={()=>dispatch({type:'LOGOUT'})} >Logout</span>
          </div>
        }
      </div>
    </header>
  )
}

export default Header