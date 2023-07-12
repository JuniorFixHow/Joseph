import React, { useContext, useState } from 'react';
import './suppliers.css';
import { SuppliersTable } from '../../miscellaneous/suppliersTable/SuppliersTable';
import NewSupplier from '../../components/newSupplier/NewSupplier';
import { AuthContext } from '../../context/AuthContext';

const Suppliers = () => {
  const {user} = useContext(AuthContext);
  const [showNew, setShowNew] = useState(false);
  const [photos, setPhotos] = useState(null);
  const showForm = ()=>{
    setShowNew(true);
    setPhotos(null);
  }
  return (
    <div className='suppliers' >
      {
        user.isAdmin ?
        <>
        <NewSupplier showNew={showNew} setShowNew={setShowNew} photos={photos} setPhotos={setPhotos} />
        <div className="container">
          <div className="top">
            <span className="title">Suppliers</span>
            <button onClick={showForm} className='addSupp' >Add new supplier</button>
          </div>
          <SuppliersTable />
        </div>
        </>
        :
        <span className='deny' >Access Denied!</span>
      }
    </div>
  )
}

export default Suppliers