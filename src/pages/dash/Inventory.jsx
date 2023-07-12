import React, { useContext, useState } from 'react'

import './inventory.css'
import { InventoryTable } from '../../miscellaneous/inventoryData/InventoryData';
import { useNavigate } from 'react-router-dom';
import NewProduct from '../../components/newProduct/NewProduct';
import EditProduct from '../../components/editProduct/EditProduct';
import { AuthContext } from '../../context/AuthContext';

const Inventory = () => {
    const {user} = useContext(AuthContext);

    const [showNew, setShowNew] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [photos, setPhotos] = useState(null);
    const [currentProduct, setCurrentProduct] = useState({});
    // console.log(currentProduct)
    const showForm = ()=>{
        setShowNew(true);
        setPhotos(null);
    }
  return (
    <div className='invent' >
        <span className="title">In stock</span>
        <div className="prod">
            <NewProduct showNew={showNew} setShowNew={setShowNew} photos={photos} setPhotos={setPhotos} />
            <EditProduct currentProduct={currentProduct} showEdit={showEdit} setShowEdit={setShowEdit} />
            <div className="prodtop">
                <span className="prodtitle">Products</span>
                {
                    user.isAdmin &&
                    <div onClick={showForm} className="prodadd">
                        <span className="add">Add Product</span>
                    </div>
                }
            </div>
            <InventoryTable setCurrentProduct={setCurrentProduct}  setShowEdit={setShowEdit} />
        </div>
    </div>
  )
}

export default Inventory