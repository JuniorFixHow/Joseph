import React, { useContext, useEffect, useState } from 'react';
import './trans.css';
import NewTrans from '../../components/newTrans/NewTrans';
import { TransTable } from '../../miscellaneous/transTable/TransTable';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { baseURL } from '../../utils/functions/funtions';

const Trans = () => {
const {user} = useContext(AuthContext);
  const [currentHead, setCurrentHead] = useState('a');
  const [showNewTrans, setShowNewTrans] = useState(true);
  const [currentTransData, setCurrentTransData] = useState(null);

  const [today, setToday] = useState([]);
  const [prev, setPrev] = useState([]);
  const [all, setAll] = useState([]);

  useEffect(()=>{
    const fetchSales = async()=>{
        const sales = await axios.get(baseURL+'/sales');
        setToday(sales.data.filter(item=> new Date(item.createdAt).toLocaleDateString() === new Date().toLocaleDateString() ));
        setPrev(sales.data.filter(item=> new Date(item.createdAt).toLocaleDateString() < new Date().toLocaleDateString() ));
        setAll(sales.data);
    }
    fetchSales();
  },[today, prev, all])

  return (
    <div className='trans' >
        {
            user.isAdmin ?
            <span className='deny' >Access Denied!</span> :
            <>
            <div className="top">
                <div className="heads">
                    <span onClick={()=>setCurrentHead('a')} className={currentHead === 'a'? "onehead_":"onehead"}>Today</span>
                    <span onClick={()=>setCurrentHead('b')} className={currentHead === 'b'? "onehead_":"onehead"}>History</span>
                </div>
                <div className="cards" style={{display:'flex', flexDirection:'row', gap:'2rem'}} >

                    <div className="card">
                        <span className="ptitle">Today</span>
                        <span className="pquant">GHC {today && today.map(item=> item.price).reduce((a, b)=>a+b, 0 )}</span>
                    </div>
                    <div className="card1">
                        <span className="ptitle">Previous</span>
                        <span className="pquant">GHC {prev && prev.map(item=> item.price).reduce((a, b)=>a+b, 0 )}</span>
                    </div>
                    <div className="card2">
                        <span className="ptitle">All Time</span>
                        <span className="pquant">GHC {all && all.map(item=> item.price).reduce((a, b)=>a+b, 0 )}</span>
                    </div>
                </div>
            </div>
            {
                showNewTrans &&
                <div className="middle">
                    <NewTrans setCurrentTransData={setCurrentTransData} currentTransData={currentTransData} setShowNewTrans={setShowNewTrans} />
                </div>
            }

            <div className="down">
                <div className="addTrans">
                    <span className="sales">Transactions</span>
                    <button onClick={()=>setShowNewTrans(true)} >New Transaction</button>
                </div>
                <TransTable currentHead={currentHead} setShowNewTrans={setShowNewTrans} setCurrentTransData={setCurrentTransData} />
            </div>
            </>
        }
    </div>
  )
}

export default Trans