import { DataGrid } from '@mui/x-data-grid';
import './inventoryData.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import { baseURL } from '../../utils/functions/funtions';

export const InventoryTable = ({setShowEdit, setCurrentProduct}) => {
    const {user} = useContext(AuthContext);
    const [rows, setRows] = useState([]);
    const [currentDelete, setCurrentDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const {searchItem} = useContext(SearchContext);
    const deleteProduct = async(id)=>{
      setDeleteLoading(true);
      setCurrentDelete(id);
      try {
        await axios.delete(`${baseURL}/products/delete/${id}`)
        rows.filter(row=> row._id !== id);
        setDeleteLoading(false);
        setCurrentDelete(null);
        
      } catch (error) {
        console.log(error)
        setDeleteLoading(false);
        setCurrentDelete(null);
      }
    }
    const editProduct = async(item)=>{
        setShowEdit(true);
        setCurrentProduct(item)
    }
    useEffect(()=>{
      const fetchProducts = async ()=>{
        const prod = await axios.get(baseURL+'/products');
        setRows(prod.data);
      }
      fetchProducts();
    },[rows])

    // console.log(rows[0])
      const columns = [
        {
            field:'pic',
            headerName: 'Picture',
            width: 70,
            renderCell: (params)=>{
                return(
                    <div className="cellWithImg">
                        <img height={'2.5rem'} width={'2.5rem'} src={params.row.pic} alt='pic' className="cellImg" />
                    </div>
                )
            }
        },
        { field: 'name', headerName: 'Product', width: 130 },
        { field: 'cat', headerName: 'Category', width: 100 },
        {
          field: 'quantity',
          headerName: 'Quantity',
          type: 'number',
          width: 90,
        },
        {
          field: 'price',
          headerName: 'Unit Price',
          type: 'number',
          width: 90,
        },
        {
          field: 'cost',
          headerName: 'Unit Cost',
          type: 'number',
          width: 90,
        },
        {
          field: 'minQuant',
          headerName: 'Treshold',
          type: 'number',
          width: 90,
        },
        {
          field:'id',
          headerName: '',
          width: user.isAdmin ? 220: 0,
          renderCell: (params)=>{
            return(
                  user.isAdmin &&
                    <div  className="actions">
                        <div onClick={()=>editProduct(params.row)} className="edit">
                            <span >Edit</span>
                        </div>
                        <div onClick={()=>deleteProduct(params.row._id)} className="delete">
                            <span >{ deleteLoading && currentDelete === params.row._id ? 'Wait..' : 'Delete'}</span>
                        </div>
                    </div>
                )
            }
        },
        
      ];

      // console.log(searchQuery)
    //   filter(item=>{
    //     return query === ''? item : Object.values(item)
    //     .join(' ')
    //     .toLowerCase() 
    //     .includes(query.toLowerCase())})
    // }
      

      // console.log(searchItem(rows));
    return(
        <div className='inventTable'>
        <DataGrid
          getRowId={(row)=>row._id}
            rows={searchItem(rows)}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 5 },
            },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
        />
    </div>
    )


}